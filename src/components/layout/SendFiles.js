import React, { Component } from "react";
import { FaFileUpload, FaWindowMinimize } from "react-icons/fa";
import { sendFileAction } from "../../actions/filesAction";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
class SendFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      sendTo: "",
      sendFrom: "",
      id: "",
      errors: []
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onChangeFile = e => {
    let files = Object.keys(e.target.files).map(key => {
      delete e.target.files[key].lastModified;
      return e.target.files[key];
    });
    this.setState({
      files: [...this.state.files, ...files]
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const data = {
      files: this.state.files,
      sendTo: this.state.sendTo,
      sendFrom: this.state.sendFrom
    };
    const error = this.checkErrors(data);
    if (error) return;
    const formData = new FormData();
    for (var x = 0; x < this.state.files.length; x++) {
      formData.append("files", this.state.files[x]);
    }
    formData.append("sendTo", this.state.sendTo);
    formData.append("sendFrom", this.state.sendFrom);
    this.props.sendFileAction(formData);
  };
  checkErrors = data => {
    const errors = [];
    if (data.files.length <= 0) {
      errors.push("You must attach a file");
    }
    if (
      data.sendTo.length === 0 ||
      data.sendFrom.length === 0 ||
      data.sendTo === " " ||
      data.sendFrom === " "
    ) {
      errors.push("Input fields cannot be blank");
    }
    if (errors.length > 0) {
      this.setState({
        errors: errors
      });
      return true;
    }
    return false;
  };
  removeItem = index => {
    let newFiles = [].concat(this.state.files);
    newFiles.splice(index, 1);
    this.setState({
      files: newFiles
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.files) {
      if (nextProps.files.status === true) {
        this.setState({
          files: [],
          sendTo: "",
          sendFrom: "",
          errors: [],
          id: ""
        });
      }
      this.setState({
        id: nextProps.files.id
      });
    }
  }
  render() {
    const { status, loading, id } = this.props.files;
    console.log(this.props.files);
    return (
      <div className="form-container">
        <div className="added-items-container padding-sides">
          {(this.state.errors || []).map((item, i) => {
            return (
              <div className="error-message" key={i}>
                {item}
              </div>
            );
          })}
          {(this.state.files || []).map((item, i) => {
            return (
              <div className="flex-space" key={i}>
                <span>{item.name}</span>
                <button
                  className="item-remove"
                  onClick={() => {
                    this.removeItem({ i });
                  }}
                >
                  <FaWindowMinimize color={"#ff4757"} size={20} />
                </button>
              </div>
            );
          })}
        </div>
        <form onSubmit={this.onSubmit}>
          <div className="input-file-container flex-center">
            <div className="relative">
              {status ? (
                <div className="input-file-content">
                  <FaFileUpload color={"#fff"} size={40} />
                  <span>Your files successfully send.</span>
                </div>
              ) : (
                <React.Fragment>
                  <div className="input-file-content">
                    <FaFileUpload color={"#fff"} size={40} />
                    <span>Upload Files...</span>
                  </div>
                  <input
                    type="file"
                    className="input-file"
                    onChange={this.onChangeFile}
                    multiple
                  />
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="padding-sides margin-t-xl">
            {!status && (
              <React.Fragment>
                <div className="input-row">
                  <label>
                    <p>SEND TO</p>
                    <input
                      type="email"
                      name="sendTo"
                      className="main-input"
                      onChange={this.onChange}
                      value={this.state.sendTo}
                    />
                  </label>
                </div>
                <div className="input-row">
                  <label>
                    <p>SEND FROM</p>
                    <input
                      type="email"
                      name="sendFrom"
                      className="main-input"
                      onChange={this.onChange}
                      value={this.state.sendFrom}
                    />
                  </label>
                </div>
                <button className="form-btn" disabled={loading}>
                  {loading ? (
                    <Loader type="Oval" color="#fff" height="30" width="30" />
                  ) : (
                    "SEND"
                  )}
                </button>
              </React.Fragment>
            )}
          </div>
        </form>
        {status && (
          <Link to={`/download/${id}`}>Transfer to Download page</Link>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  files: state.files
});
export default connect(
  mapStateToProps,
  { sendFileAction }
)(SendFiles);
