import {TimelineContent} from "@mui/lab";
import {Card, CardContent, CardMedia, Typography, Box} from "@mui/material";

export default function TimelineCard({btn = "none", data, idx}) {
  return (
    <TimelineContent
      className={`content animate ${
        idx % 2 === 0 ? "slide_from_left" : "slide_from_right"
      }`}
    >
      <Card
        elevation=""
        sx={{
          maxWidth: "600px",
          padding: "5px",
        }}
      >
        {data.image && (
          <CardMedia
            component="img"
            height="200px"
            image={data.image.src}
            alt={data.image.alt}
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
            <Typography variant="h6">{data.title}</Typography>
            <Box>{data.date}</Box>
          </Box>

          {data.content ? (
            data.content
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
