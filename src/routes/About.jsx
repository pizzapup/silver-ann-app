import {Typography} from "@mui/material";
import Timeline from "../components/Timeline/Timeline";

export default function About() {
  return (
    <>
      <Typography
        variant="h4"
        mb={1}
        textAlign="center"
        textTransform="uppercase"
        fontFamily="var(--font-groovy)"
      >
        Matt & Erin's Relationship Timeline
      </Typography>
      <Timeline />
    </>
  );
}
