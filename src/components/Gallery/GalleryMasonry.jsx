import {useState, useEffect} from "react";
import {
  Backdrop,
  Box,
  Button,
  Container,
  CssBaseline,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import "react-lazy-load-image-component/src/effects/opacity.css";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import GalleryImage from "./GalleryImage";
import {ImageGroup} from "react-fullscreen-image";
import {Image} from "react-fullscreen-image";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

export const findAll = async () => {
  const docRefs = await getDocs(collection(db, "posts"));
  const res = [];
  docRefs.forEach((post) => {
    res.push({id: post.id, ...post.data()});
  });
  return res;
};

export default function GalleryMasonry() {
  const [list, setList] = useState([]);
  const [currItem, setCurrItem] = useState([]);
  const [loading, setLoading] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    const res = await findAll();
    setList([...res]);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const columnsCountBreakPoints = {350: 1, 750: 2, 900: 3};
  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    setOpen(true);
    setCurrItem(e.target.src);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
        <Masonry>
          {list.map((item) => {
            return (
              <img
                key={item.id}
                alt={item.values.title ? item.values.title : "uploaded image"}
                src={item.values.image}
                style={{
                  minHeight: "50px",
                  width: "100%",
                  display: "block",
                }}
                onClick={handleOpen}
              />
            );
          })}
        </Masonry>
      </ResponsiveMasonry>

      <Modal
        open={open}
        onClose={handleClose}
        sx={{display: "flex", justifyContent: "center", alignItems: "center"}}
      >
        <Box
          sx={{
            borderColor: "transparent",
            outline: "transparent",
            "&:hover,&:focus,&:focus-within": {
              borderColor: "transparent",
              outline: "transparent",
            },
          }}
        >
          <img
            key={currItem.id}
            alt=""
            src={currItem}
            style={{
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.9)",
            }}
          />
        </Box>
      </Modal>
    </>
  );
}
