import React, {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Timeline as TimeLine, timelineItemClasses} from "@mui/lab";
import {items} from "./data";
import TimelineItem from "./TimelineItem";

const Timeline = () => {
  const animateFromTo = (elem, direction) => {
    const offset = 1000;
    let x = 0;
    let y = direction * offset;
    direction = direction | 1;
    if (elem.classList.contains("slide_from_left")) {
      x = -offset;
      y = 0;
    } else if (elem.classList.contains("slide_from_right")) {
      x = offset;
      y = 0;
    }

    gsap.fromTo(
      elem,
      {x: x, y: y, autoAlpha: 0},
      {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto",
      }
    );
  };

  const hide = (elem) => {
    gsap.set(elem, {autoAlpha: 0});
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".animate").forEach(function (elem) {
      hide(elem);
      ScrollTrigger.create({
        trigger: elem,
        onEnter: function () {
          animateFromTo(elem);
        },
        onEnterBack: function () {
          animateFromTo(elem, -1);
        },
        onLeave: function () {
          hide(elem);
        },
      });
    });
  }, []);

  return (
    <div>
      <div className="timeline">
        <TimeLine
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {items.map((data, idx) => {
            return <TimelineItem data={data} idx={idx} />;
          })}

          <div style={{clear: "both"}}></div>
        </TimeLine>
      </div>
    </div>
  );
};
export default Timeline;
