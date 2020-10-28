import React from "react";

//images
import background from "../../images/background.jpg";

import "./styles.scss";

const Background: React.FC = () => {
  return (
    <div id="page-home-background">
      <img src={background} alt="background" />
      <div className="text">
        <h1> Cheffy</h1>
        <p>Rent Kitchen. Lease Kitchen.</p>
      </div>
    </div>
  );
};
export default Background;
