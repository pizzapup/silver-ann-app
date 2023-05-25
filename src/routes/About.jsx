import {H, Level, useLevel} from "react-accessible-headings";
import TimelineComp from "../components/Timeline/Timeline";
import Timeline from "../components/Timeline/Timelined";
import Heading from "../components/Heading/Heading";

export default function About() {
  const level = useLevel();
  return (
    <>
      <H>TIMELINE</H>
      <p>
        neither of these are styled right now. just trying to get the animation
        down. i want the viewer to be able to scroll down the years and have the
        images/stories pop up when they get to them
      </p>
      <Level>
        <H> Photo/Memory Timeline (1)</H>
      </Level>
      <Timeline />
      <Level>
        <H> Photo/Memory Timeline (1)</H>
      </Level>
      <p>only animates once</p>
      {/* <TimelineComp /> */}
    </>
  );
}
