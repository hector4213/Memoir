import React, { useRef, useState } from "react";
import "./Header.scss";

const Header = (props) => {
  const [logoStyle, setLogoStyle] = useState();
  const logo = useRef(null);

  const followMouse = (e) => {
    setLogoStyle({
      top: `${e.clientY}px`,
      left: `${e.clientX}px`,
      transform: `scale(1)`,
      position: "fixed",
    });
  };

  const mouseOut = () => {
    setLogoStyle({
      top: "50%",
      left: "50%",
      transform: `scale(1.5)`,
      position: "absolute",
    });
  };

  return (
    <>
      <div className="header">
        <div className="title" onMouseMove={followMouse} onMouseOut={mouseOut}>
          <h1>Memoir</h1>
          <h2>
            Discover a story. <br />
            Share yours.
          </h2>
        </div>

        <div className="logo" ref={logo} style={logoStyle} />
      </div>

      {/* <div className="description">
        <p>
          Have you ever heard the Story of someone's life and been inspired ?{" "}
          <br />
          Surprised by the experiences and hardships that they've had to go
          through to get to an inspiring place in their lives ...
        </p>

        <p>
          It's these stories that inspired <b>Memoir</b>. <br />
          A visual experience where you will be able to scroll through people's
          lives and see that life's Story is full of small entries. Is there
          someone you know a lot about? a friend? a loved one? a pet? <br />
          Share that story!
        </p>

        <p>
          Memoir was made to share, learn, and empathize with your fellow human
          beings
        </p>
      </div> */}
    </>
  );
};

export default Header;
