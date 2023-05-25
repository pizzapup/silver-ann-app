import {TimelineContent} from "@mui/lab";
import {
  Button,
  CardActionArea,
  CardActions,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";

const defaultProps = {
  title: "card title",
  text: "card text goes here",
  button: {text: "button text", btnProps: {onClick: ""}},
  image: {
    src: "https://source.unsplash.com/random/248x500/?wedding",
    alt: "placeholder wedding image",
  },
};
export default function TimelineCard({btn = "none", data = defaultProps, idx}) {
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
          {/* {data.title && <Typography variant="h6">{data.title}</Typography>} */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="overline" display="block">
              {data.date}
            </Typography>
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
