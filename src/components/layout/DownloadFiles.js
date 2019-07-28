import React, { Component } from "react";
import { FaFileDownload, FaFile } from "react-icons/fa";
import Loader from "react-loader-spinner";
import { receiveFilesAction } from "../../actions/downloadActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class DownloadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadLink: ""
    };
  }
  componentDidMount() {
    console.log("asfasf");
    const { confirmID } = this.props.match.params;
    this.props.receiveFilesAction(confirmID, this.props.history);
    this.setState({
      downloadLink: `/api/download/files/${confirmID}`
    });
  }
  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { files, sendFrom } = this.props.receivedFiles.receivedFiles;
    return (
      <div className="form-container">
        <div className="added-items-container padding-sides" />
        <form onSubmit={this.onSubmit}>
          <div className="download-header">
            <div className="flex-center">
              <FaFileDownload color={"#fff"} size={40} />
            </div>
            <p className="sender">
              {sendFrom}
              <br /> sent you some files
            </p>
          </div>
          <div className="padding-sides">
            <div className="received-files">
              {files &&
                files.files.map((item, i) => {
                  return (
                    <div className="flex-space" key={i}>
                      <span>{item.filename}</span>
                      <button className="item-remove">
                        <FaFile color={"#353b48"} size={20} />
                      </button>
                    </div>
                  );
                })}
            </div>
            <div className="input-row" />
            <a className="form-btn" href={this.state.downloadLink}>
              DOWNLOAD ALL
            </a>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  receivedFiles: state.receivedFiles,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { receiveFilesAction }
)(withRouter(DownloadFiles));
