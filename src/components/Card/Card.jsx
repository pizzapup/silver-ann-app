import {
  Button,
  CardActionArea,
  CardActions,
  Card as CardComp,
  CardContent,
  CardMedia,
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
export default function Card({data = defaultProps}) {
  return (
    <CardComp sx={{maxWidth: 345}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data.image.src}
          alt={data.image.alt}
        />
        <CardContent>{data.text}</CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" {...data.button.btnProps}>
          {data.button.text}
        </Button>
      </CardActions>
    </CardComp>
  );
}
