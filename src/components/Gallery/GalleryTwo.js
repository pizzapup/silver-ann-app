import {useState, useEffect} from "react";
import {Box, CircularProgress, Fab, Modal} from "@mui/material";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {ref, listAll, getDownloadURL} from "firebase/storage";
import {CloseRounded} from "@mui/icons-material";
import {storage} from "../../firebase/firebase";

const fetchImages = async () => {
  const storageRef = ref(storage, "gallery");
  const result = await listAll(storageRef);
  const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
  console.log(Promise.all(urlPromises));
  return Promise.all(urlPromises);
};
export default function Gallery() {
  const [list, setList] = useState([]);
  const [currItem, setCurrItem] = useState([]);
  const [loading, setLoading] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    const res = await fetchImages();
    setList([...res]);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    fetchImages();
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
            {list.map((item) => {
              return (
                <img
                  key={item.id}
                  alt="img"
                  src={item}
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
      )}
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
          <Fab
            size="small"
            onClick={() => setOpen(false)}
            sx={{position: "fixed", top: 5, left: 5}}
          >
            <CloseRounded />
          </Fab>
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
