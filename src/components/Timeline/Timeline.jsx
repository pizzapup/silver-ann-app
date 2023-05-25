import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Card from "../Card/Card";
export default function TimelineComp() {
  const TimelineItem = ({year, children}) => (
    <VerticalTimelineElement
      // className="vertical-timeline-element--work"
      date={year}
      iconStyle={{
        background: "rgb(33, 150, 243)",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      icon={<>{year}</>}
    >
      {children}
    </VerticalTimelineElement>
  );
  return (
    <>
      <VerticalTimeline>
        <TimelineItem year="1998">
          <Card />
        </TimelineItem>
        <TimelineItem year="1999">
          <Card />
        </TimelineItem>
        <TimelineItem year="2000">
          <Card />
        </TimelineItem>
        <TimelineItem year="2001">
          <Card />
        </TimelineItem>
        <TimelineItem year="2002">
          <Card />
        </TimelineItem>
        <TimelineItem year="2003">
          <Card />
        </TimelineItem>
      </VerticalTimeline>
    </>
  );
}

// import Fade from "react-reveal/Fade";
// import Card from "../Card/Card";
// import {
//   Timeline,
//   TimelineItem,
//   TimelineSeparator,
//   TimelineConnector,
//   TimelineDot,
//   TimelineContent,
//   TimelineOppositeContent,
//   timelineOppositeContentClasses,
// } from "@mui/lab";
// import {Slide, Zoom} from "react-reveal";
// import Example from "../Reveal/Reveal";
// import {Parallax, ParallaxProvider} from "react-scroll-parallax";

// export default function TimelineComp() {
//   const TimelineListItem = () => (
//     <TimelineItem>
//       <TimelineOppositeContent color="textSecondary">
//         1998
//       </TimelineOppositeContent>
//       <TimelineSeparator>
//         <TimelineDot />
//         <TimelineConnector />
//       </TimelineSeparator>
//       <TimelineContent>
//         <Parallax
//           translateX={[100, -200, "easeOutQuint"]}
//           // translateY={[-200, 0, "easeInQuint"]}
//           easing="easeInQuad"
//         >
//           {/* <Slide left> */}
//           <Card />
//           {/* </Slide> */}
//         </Parallax>
//       </TimelineContent>
//     </TimelineItem>
//   );
//   return (
//     <Timeline
//       sx={{
//         [`& .${timelineOppositeContentClasses.root}`]: {
//           flex: 0.2,
//         },
//       }}
//     >
//       <TimelineListItem />
//       <TimelineListItem />
//       <TimelineListItem />
//       <TimelineListItem />
//     </Timeline>
//   );
// }
