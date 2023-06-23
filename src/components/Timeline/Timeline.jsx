import React, {useEffect, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {
  LocalizationProvider,
  Timeline as TimeLine,
  timelineItemClasses,
} from "@mui/lab";
import {items} from "./data";
import TimelineItem from "./TimelineItem";
import {Box, Fab, Modal, Typography} from "@mui/material";
import {EditCalendar} from "@mui/icons-material";
import AddTimeline from "./AddTimeline";
import {collection, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "../../firebase/firebase";

const Timeline = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
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
  const findAll = async () => {
    const res = [];
    const dbRef = collection(db, "timeline");
    const q = query(
      dbRef,
      orderBy("year", "asc"),
      orderBy("month", "asc"),
      orderBy("day", "asc")
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((post) => {
      res.push({id: post.id, ...post.data()});
    });
    setList(res);
    console.log(res);
    return res;
  };
  useEffect(() => {
    findAll();
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "flex-end",
        }}
      >
        <Typography
          variant="h4"
          mb={1}
          textAlign="center"
          textTransform="uppercase"
          fontFamily="var(--font-groovy)"
        >
          Matt & Erin's Relationship Timeline
        </Typography>
        <Box>
          <Fab
            color="primary"
            variant="extended"
            size="medium"
            sx={{whiteSpace: "nowrap"}}
            onClick={() => setOpen(true)}
          >
            <EditCalendar />
            <Typography variant="body2" m={1}>
              Add Event
            </Typography>
          </Fab>{" "}
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="Add event to timeline"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                height: "70%",
                overflow: "scroll",
                maxWidth: 600,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <AddTimeline setOpen={() => setOpen(false)} />
            </Box>
          </Modal>
        </Box>
      </Box>
      <div className="timeline">
        <TimeLine
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {list.map((item, idx) => {
            return <TimelineItem data={item} idx={idx} key={`${idx}-keykey`} />;
          })}

          <div style={{clear: "both"}}></div>
        </TimeLine>
      </div>
    </div>
  );
};
export default Timeline;
