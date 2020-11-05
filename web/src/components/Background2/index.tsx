import React from "react";

// Images
import background2 from "../../images/background2.jpg";

import "./styles.scss";

interface Props {
  text: string;
}

const Background2: React.FC<Props> = (props) => {
  return (
    <div id="page-home-background2">
      <div className="opacity"></div>
      <img src={background2} alt="background" />
      <div className="text">
        <h1>{props.text}</h1>
      </div>
    </div>
  );
};
export default Background2;
