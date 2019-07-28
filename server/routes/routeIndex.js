const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const Files = require("../models/Files");
const Confirmed = require("../models/Confirmed");
const storageDir = path.join(__dirname, "..", "storage");
const fs = require("fs");
require("dotenv").config();
const nodemailer = require("nodemailer");
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storageDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: multerStorage });

router.post("/upload", upload.any(), async (req, res) => {
  const files = req.files;

  const newFile = new Files({
    files: files
  });

  newFile
    .save()
    .then(result => {
      const newConfirm = new Confirmed({
        files: result._id,
        sendTo: req.body.sendTo,
        sendFrom: req.body.sendFrom
      });
      newConfirm
        .save()
        .then(async (result, err) => {
          if (err || !result)
            return res
              .status(401)
              .json({ error: { message: "Something went wrong" } });

          let transporter = nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "apikey", // generated ethereal user
              pass: process.env.SEND_GRID_PASS // generated ethereal password
            },
            tls: {
              rejectUnathorized: false
            }
          });
          // send mail with defined transport object
          try {
            await transporter.sendMail({
              from: result.sendFrom, // sender address
              to: result.sendTo, // list of receivers
              subject: "You have received files from File Sharing App ✔", // Subject line
              text: `You can access recived files via Link - http://filesharing.eu-4.evennode.com/download/${
                result._id
              }`
            });
          } catch (e) {
            return res.status(401).json({ error: "Something went wrong" });
          }
          return res.status(200).json({ success: true, id: result._id });
        })
        .catch(err => res.status(401).json({ err }));
    })
    .catch(err => res.status(404).json({ err }));
});

router.get("/download/:confirmID", (req, res) => {
  const confirmID = req.params.confirmID;
  Confirmed.findById({ _id: confirmID })
    .then((confirm, err) => {
      if (err || !confirm)
        return res.status(404).json({ error: { success: false } });
      const filesID = confirm.files;
      Files.findById({ _id: filesID })
        .select("files")
        .then((files, err) => {
          if (err || !files)
            return res.status(404).json({ error: { success: false } });
          return res.status(200).json({
            files,
            sendFrom: confirm.sendFrom,
            sendTo: confirm.sendTo
          });
        })
        .catch(err => res.status(404).json({ error: false }));
    })
    .catch(err => res.status(404).json({ error: false }));
});

router.get("/download/files/:confirmID", (req, res) => {
  const confirmID = req.params.confirmID;
  Confirmed.findById({ _id: confirmID })
    .then((confirm, err) => {
      if (err || !confirm)
        return res.status(404).json({ error: { success: false } });
      const filesID = confirm.files;
      Files.findById({ _id: filesID })
        .select("files")
        .then((files, err) => {
          if (err || !files)
            return res.status(404).json({ error: { success: false } });
          // CREATE node-zip
          var zip = new require("node-zip")();
          files.files.map(item => {
            zip.file(
              `${item.filename}`,
              fs.readFileSync(
                path.join(__dirname, `../storage/${item.filename}`)
              )
            );
          });
          var data = zip.generate({ base64: false, compression: "DEFLATE" });
          fs.writeFileSync(
            path.join(storageDir, `${files._id}.zip`),
            data,
            "binary"
          );
          const filePath = path.join(storageDir, `${files._id}.zip`);
          res.download(filePath, `${files._id}.zip`, err => {
            if (err) {
              console.log(err);
            } else {
            }
          });
        })
        .catch(err => res.status(404).json({ error: false }));
    })
    .catch(err => res.status(404).json({ error: false }));
});
router.post("/email/send", async (req, res) => {
  const output = "Someone sent email";
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "apikey", // generated ethereal user
      pass: process.env.SEND_GRID_PASS // generated ethereal password
    },
    tls: {
      rejectUnathorized: false
    }
  });

  // send mail with defined transport object
  try {
    await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "khomerikibeka1@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    });
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(401).json({ error: "Something went wrong" });
  }
});
router.get("/files", (req, res) => {
  Files.find({})
    .then(result => {
      return res.status(200).json({ result });
    })
    .catch(err => res.status(404).json({ err }));
});
module.exports = router;
