import {
  Celebration,
  ExitToApp,
  HourglassBottom,
  Kayaking,
  Nightlife,
  Restaurant,
} from "@mui/icons-material";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  timelineItemClasses,
  timelineOppositeContentClasses,
} from "@mui/lab";
import {Box, List, ListItem, ListItemText, Typography} from "@mui/material";

export default function EventDetails() {
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          fontFamily="var(--font-groovy)"
          // fontWeight="bolder"
          textAlign="center"
        >
          Matt & Erin's Silver Anniversary Party
        </Typography>
        <Timeline
          sx={{
            mt: 3,
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.2,
            },
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          <TimelineItem>
            <TimelineOppositeContent
              align="right"
              variant="body2"
              color="text.secondary"
            >
              3pm
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="success">
                <Celebration />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="groovy" component="span">
                Party Begins
              </Typography>
              <Typography variant="body1">
                <br />
                Appetizers <br />
                Non-alcoholic refreshers <br />
                Bags, badminton, games, & more
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              align="right"
              variant="body2"
              color="text.secondary"
            >
              4pm
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="secondary">
                <Nightlife />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="groovy" component="span">
                Booze
              </Typography>
              <Typography variant="body1">
                <br />
                Alcoholic beverages begin serving at 4pm and continue until
                close
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              align="right"
              variant="body2"
              color="text.secondary"
            >
              6pm
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="warning">
                <Restaurant />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="groovy" component="span">
                Food{" "}
              </Typography>
              <Typography variant="body1">
                <br />
                Main food served at 6pm. Catering provided by Qdoba.
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              align="right"
              variant="body2"
              color="text.secondary"
            >
              9:30pm
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="error">
                <HourglassBottom />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="groovy" component="span">
                Last Call
              </Typography>
              <Typography variant="body1">
                <br />
                30mins til closing time
              </Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineOppositeContent
              align="right"
              variant="body2"
              color="text.secondary"
            >
              10pm
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <ExitToApp />
              </TimelineDot>
              {/* <TimelineConnector /> */}
            </TimelineSeparator>
            <TimelineContent>
              <Typography variant="groovy" component="span">
                Closing Time
              </Typography>
              <Typography variant="body1">
                <br />
                You don't have to go home, but you can't stay here
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
        <Box sx={{p: 4}}>
          <Kayaking />
          <Typography variant="groovy" component="span" sx={{pl: 1}}>
            But wait, theres more..
          </Typography>
          <br />
          <Typography variant="body2" component="span" color="text.secondary">
            Sunday, June 25th
          </Typography>
          <Typography variant="body1">
            <br />
            Join us for a 7 mile canoe trip beginning at 12:30pm
          </Typography>
        </Box>
      </Box>
    </>
  );
}
// Matt & Erin’s Silver Anniversary Party❣️🥰
//                🧦Dress your best from 1998📻
// ___________Bring the party starting at 3pm____________
//              Apps•Mingle•Non-alcoholic refreshers
//                     Corn Hole•Badminton•Games

//                 🍺 Alcohol serving from 4pm-10pm🍷

//                            ~ Always better with food ~
//                                        6pm Main grub

//             Followed by:
// 🍴Silver Cake Cutting 🍰

// __🎤✨Continuing the fun into the evening ✨🪩__

//                Karaoke•Dancing•Late Night Snacks

//    ****Closing out cheers to 25 years @ 10pm 🥂****
// ————Want to celebrate more?——————->
// Join us Sunday June 25th @ 1230pm
// 🛟🛶7 mile canoe trip🛶
