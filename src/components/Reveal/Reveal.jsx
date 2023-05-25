import React, {useRef} from "react";
import {Parallax, ParallaxProvider, useParallax} from "react-scroll-parallax";
// import imageBg from "../../image/parallax-demon-woods-bg.png";
// import imageClose from "../../image/parallax-demon-woods-close-trees.png";
// import imageMid from "../../image/parallax-demon-woods-mid-trees.png";
// import imageFar from "../../image/parallax-demon-woods-far-trees.png";
import imageBg from "../../assets/images/logo-color.png";
import imageClose from "../../assets/images/logo-color.png";
import imageMid from "../../assets/images/logo-color.png";
import imageFar from "../../assets/images/logo-color.png";

import "./Reveal.css";

export default function ParallaxExample({children}) {
  return (
    <Parallax
      translateX={[0, 100, "easeOutQuint"]}
      translateY={[-200, 0, "easeInQuint"]}
      easing="easeInQuad"
    >
      {children}
    </Parallax>
  );
}
