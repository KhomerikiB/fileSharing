import React, { Component } from "react";
import { FaPaperPlane } from "react-icons/fa";
export default class MainDesc extends Component {
  render() {
    return (
      <div>
        <h2 className="logo inlineflex-center">
          <FaPaperPlane size={50} color={"#fff"} />
          <span>SHARE</span>
        </h2>
        <p className="desc-title">Share your files.</p>
        <p className="desc-subtitle">Secure. fast. free.</p>
      </div>
    );
  }
}
