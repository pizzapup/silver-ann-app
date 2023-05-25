import TimelineComp from "../components/Timeline/Timeline";
import Timeline from "../components/Timeline/Timelined";

export default function About() {
  return (
    <>
      <h1>TIMELINE</h1>
      <p>
        neither of these are styled right now. just trying to get the animation
        down. i want the viewer to be able to scroll down the years and have the
        images/stories pop up when they get to them
      </p>
      <h2> Photo/Memory Timeline (1)</h2>
      <Timeline />
      <h2>Photo/Memory Timeline (2)</h2>
      <p>only animates once</p>
      <TimelineComp />
    </>
  );
}
