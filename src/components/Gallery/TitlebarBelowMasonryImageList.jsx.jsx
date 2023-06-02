import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export default function TitlebarBelowMasonryImageList() {
  return (
    <Box sx={{height: "85vh", overflowY: "scroll"}}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item, i) => (
          <ImageListItem key={`${item.img}-${i}`}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar position="below" title={item.author} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: "https://source.unsplash.com/random/248x300/?wedding",
    title: "Bed",
    author: "swabdesign",
  },
  {
    img: "https://source.unsplash.com/random/248x500/?wedding",
    title: "Books",
    author: "Pavel Nekoranec",
  },
  {
    img: "https://source.unsplash.com/random/248x600/?wedding",
    title: "Sink",
    author: "Charles Deluvio",
  },
  {
    img: "https://source.unsplash.com/random/248x500/?wedding",
    title: "Kitchen",
    author: "Christian Mackie",
  },
  {
    img: "https://source.unsplash.com/random/248x500/?wedding",
    title: "Blinds",
    author: "Darren Richardson",
  },
  {
    img: "https://source.unsplash.com/random/248x800/?wedding",
    title: "Chairs",
    author: "Taylor Simpson",
  },
  {
    img: "https://source.unsplash.com/random/248x500/?wedding",
    title: "Laptop",
    author: "Ben Kolde",
  },
  {
    img: "https://source.unsplash.com/random/248x500/?wedding",
    title: "Doors",
    author: "Philipp Berndt",
  },
  {
    img: "https://source.unsplash.com/random/248x250/?wedding",
    title: "Coffee",
    author: "Jen P.",
  },
  {
    img: "https://source.unsplash.com/random/248x500/?wedding",
    title: "Storage",
    author: "Douglas Sheppard",
  },
  {
    img: "https://source.unsplash.com/random/248x500/?wedding",
    title: "Candle",
    author: "Fi Bell",
  },
  {
    img: "https://source.unsplash.com/random/248x500/?wedding",
    title: "Coffee table",
    author: "Hutomo Abrianto",
  },
];
