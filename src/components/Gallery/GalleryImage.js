import {
  ArrowBackIosRounded,
  ArrowBackRounded,
  Favorite,
} from "@mui/icons-material";
import {Box, Button, IconButton, Typography} from "@mui/material";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useState} from "react";

export default function GalleryImage({id, data, backtoGallery}) {
  const [likes, setLikes] = useState(0);
  const updateLikes = () => {
    updateDoc(doc(db, "posts", `${id}`), {
      likes: data.likes ? data.likes + 1 : 1,
    });
    setLikes(likes + 1);
  };
  return (
    <>
      <IconButton
        variant="contained"
        size="large"
        aria-label="back"
        sx={{mb: "10px"}}
        onClick={backtoGallery}
      >
        <ArrowBackRounded />
      </IconButton>
      <Box>
        <img
          alt={data.title ? data.title : "uploaded image"}
          src={data.image}
          style={{width: "100%"}}
        />
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {data.title ? data.title : "date uploaded: 2023"}
        </Typography>
        <Typography variant="h5" component="div">
          {data.title ? data.title : ""}
        </Typography>
        <Typography sx={{mb: 1.5}} color="text.secondary">
          {data.subtitle ? data.subtitle : ""}
        </Typography>
        <Typography variant="body2">
          <br />
          {data.body ? data.body : ""}
        </Typography>
        <Box>
          <Button
            startIcon={<ArrowBackIosRounded />}
            variant="contained"
            onClick={backtoGallery}
          >
            back to gallery
          </Button>
          <IconButton
            aria-label="favorite"
            // onClick={updateLikes}
            sx={{
              "&:hover > *": {
                color: "#ba000d",
              },
            }}
          >
            <Favorite />
            {/* {data.likes ? data.likes : likes} */}
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
