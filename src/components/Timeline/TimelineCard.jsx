import {TimelineContent} from "@mui/lab";
import {Card, CardContent, CardMedia, Typography, Box} from "@mui/material";
function monthString(num) {
  const month = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // const d = new Date();
  let name = month[num];
  return name;
}
export default function TimelineCard({btn = "none", data, idx}) {
  return (
    <TimelineContent
      className={`content animate ${
        idx % 2 === 0 ? "slide_from_left" : "slide_from_right"
      }`}
    >
      <Card
        // elevation=""
        sx={{
          maxWidth: "600px",
          padding: "5px",
        }}
      >
        {data.image && (
          <CardMedia
            component="img"
            height="200px"
            image={data.image}
            alt={data.caption}
          />
        )}
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" p={0.1}>
              {data.caption}
            </Typography>
            <Box>
              {monthString(data.month)} {data.day}
            </Box>
          </Box>

          {data.subcaption ? (
            data.subcaption
          ) : (
            <Typography variant="body2" color="text.secondary">
              {data.text}
            </Typography>
          )}
        </CardContent>
      </Card>
    </TimelineContent>
  );
}
