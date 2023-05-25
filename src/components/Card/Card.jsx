import {
  Button,
  CardActionArea,
  CardActions,
  Card as CardComp,
  CardContent,
  CardMedia,
  Typography,
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
export default function Card({btn = "none", data = defaultProps}) {
  const Btn = btn;
  return (
    <CardComp sx={{maxWidth: 345}}>
      <CardActionArea>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>

        <CardMedia
          component="img"
          height="140"
          image={data.image.src}
          alt={data.image.alt}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {data.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary" onClick={() => alert("grrr")}>
          {data.button.text}
        </Button> */}
        {btn !== "none" && btn}
      </CardActions>
    </CardComp>
  );
}
