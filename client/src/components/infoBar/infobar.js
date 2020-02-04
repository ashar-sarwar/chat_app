import React from "react";
import closeIcon from "../../icons/closeIcon.png"
import onlineIcon from "../../icons/onlineIcon.png"

import "./infobar.css";

const infoBar = ({room}) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} />
      <h3>{room}</h3>
      <div className="rightInnerContainer">
        <a href="/">
          <img src={closeIcon} />

        </a>
      </div>
    </div>
  </div>
)

export default infoBar;
