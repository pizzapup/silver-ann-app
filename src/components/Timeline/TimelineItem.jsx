import {
  TimelineConnector,
  TimelineDot,
  TimelineItem as MuiTimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import TimelineCard from "./TimelineCard";

export default function TimelineItem({data, idx}) {
  return (
    <MuiTimelineItem key={`${data.month}-${data.year}_${idx}`}>
      <TimelineSeparator>
        <TimelineDot>{data.year}</TimelineDot>
        <TimelineConnector />
        {/* <Typography variant="caption">{data.date}</Typography> */}
      </TimelineSeparator>
      <TimelineCard data={data} idx={idx} />
    </MuiTimelineItem>
  );
}
