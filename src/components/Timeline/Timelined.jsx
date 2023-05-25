import React, {useEffect} from "react";
import "./Timeline.css";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Card from "../Card/Card";

const items = [
  {
    title: "Wedding",
    description: "",
    date: "1998",
    content: <Card />,
  },
  {
    title: "Title 2",
    description: "Desc 2",
    date: "DD MONTH 1999",
    content: <Card />,
  },
  {
    title: "Title 1",
    description: "Desc 1",
    date: "DD MONTH 2000",
    content: <Card />,
  },
  {
    title: "Title 2",
    description: "Desc 2",
    date: "DD MONTH 20001",
    content: <Card />,
  },
  {
    title: "Title 1",
    description: "Desc 1",
    date: "DD MONTH 2002",
    content: <Card />,
  },
  {
    title: "Title 2",
    description: "Desc 2",
    date: "DD MONTH 2003",
    content: <Card />,
  },
];

const Timeline = (props) => {
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
        <ul>
          {items.map((timelineItem, idx) => {
            return (
              <li
                key={`${timelineItem.title}_${timelineItem.date}`}
                className="content"
              >
                <div
                  //   className={`content animate ${
                  //     idx % 2 === 0 ? "slide_from_left" : "slide_from_right"
                  //   }`}
                  className={`content animate ${
                    idx % 2 === 0 ? "slide_from_left" : "slide_from_right"
                  }`}
                >
                  {timelineItem.date}
                  {timelineItem.content}
                </div>

                <div
                //   className={`time animate ${
                //     idx % 2 === 0 ? "slide_from_right" : "slide_from_left"
                //   }`}
                //   className={`time animate ${
                //     idx % 2 === 0 ? "slide_from_left" : "slide_from_right"
                //   }`}
                >
                  {/* {timelineItem.date} */}
                </div>
              </li>
            );
          })}

          <div style={{clear: "both"}}></div>
        </ul>
      </div>
    </div>
  );
};

export default Timeline;
