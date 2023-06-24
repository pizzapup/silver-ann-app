import {useState, useEffect} from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogContent,
  Fab,
  Modal,
  Typography,
} from "@mui/material";
import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {CloseRounded} from "@mui/icons-material";
import UploadImage from "../UploadImg/UploadImg";

export const findAll = async () => {
  const docRefs = await getDocs(collection(db, "posts"));
  const res = [];
  docRefs.forEach((post) => {
    res.push({id: post.id, ...post.data()});
  });
  return res;
};

export default function GalleryPosts() {
  const [list, setList] = useState([]);
  const [currItem, setCurrItem] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const handleOpen = (data) => {
    setOpen(true);
    setCurrItem(data);
  };
  const NewPost = () => {
    return (
      <>
        <Box>
          <Fab
            color="primary"
            variant="extended"
            size="medium"
            sx={{whiteSpace: "nowrap", m: 2}}
            onClick={() => setOpen(true)}
          >
            {/* <EditCalendar /> */}
            <Typography variant="body2" m={1}>
              Add Event
            </Typography>
          </Fab>{" "}
          <Dialog
            open={createPostOpen}
            onClose={() => setCreatePostOpen(false)}
            aria-labelledby="create post"
          >
            <Box
            // sx={{
            //   position: "absolute",
            //   top: "50%",
            //   left: "50%",
            //   transform: "translate(-50%, -50%)",
            //   width: "80%",
            //   height: "70%",
            //   overflow: "scroll",
            //   maxWidth: 600,
            //   bgcolor: "background.paper",
            //   border: "2px solid #000",
            //   boxShadow: 24,
            //   p: 4,
            // }}
            >
              <UploadImage setCreatePostOpen={() => setCreatePostOpen(false)} />
            </Box>
          </Dialog>
        </Box>
      </>
    );
  };
  return (
    <>
      {loading ? (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="large" />
        </Box>
      ) : (
        <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
          <Masonry>
            {list.map((item, i) => {
              return (
                <Box key={`key-${item.id}-${i}`} m={0.25}>
                  <PostCard handleOpen={handleOpen} item={item} i={i} />
                </Box>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
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
          <Fab
            size="small"
            onClick={() => setOpen(false)}
            sx={{position: "fixed", top: 5, left: 5}}
          >
            <CloseRounded />
          </Fab>
          {console.log(currItem)}
          <PostCardEnlarged item={currItem} />
        </Box>
      </Modal>
    </>
  );
}
export function PostCardInner({item}) {
  return (
    <>
      {item.values.image !== "" && (
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            display: "block",
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
          image={item.values.image}
        />
      )}
      <CardContent
        sx={{
          background:
            "linear-gradient(135deg,rgba(219, 188, 246, 0.1) 0%,rgba(237, 215, 252, 0.1) 24%,rgba(238, 223, 225, 0.1) 51%,rgba(238, 226, 214, 0.1) 62%,rgba(211, 226, 241, 0.1) 69%,rgba(211, 226, 241, 0.1) 100%)",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {item.values.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.values.comment}
        </Typography>
        <Box component="p" sx={{mb: 0}}>
          <Typography variant="caption">
            {item.values.name !== "" && `posted by: ${item.values.name}`}
          </Typography>
        </Box>
      </CardContent>
    </>
  );
}
export function PostCard({handleOpen, item, i}) {
  return (
    <Card key={`key-${item.id}-${i}`} sx={{maxWidth: 300}}>
      <CardActionArea onClick={() => handleOpen(item)}>
        <PostCardInner item={item} />
      </CardActionArea>
    </Card>
  );
}
export function PostCardEnlarged({item}) {
  return (
    <Card
      sx={{
        minHeight: "50px",
        width: "100%",
        width: "90vw",
        display: "block",
      }}
    >
      <PostCardInner item={item} />
    </Card>
  );
}
