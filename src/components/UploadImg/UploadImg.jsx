import {useState} from "react";
import {
  getDownloadURL,
  ref as sRef,
  uploadBytesResumable,
} from "firebase/storage";
import {db, storage} from "../../firebase/firebase";
import DragAndDrop from "./DragAndDrop";
import {addDoc, collection} from "firebase/firestore";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TagsInput from "./TagsInput";
import {Link} from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";

export default function UploadImage({setCreatePostOpen}) {
  const initialValues = {
    name: "",
    image: "",
    comment: "",
    title: "",
    tags: [],
  };
  const [imgUrl, setImgUrl] = useState("");
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };
  const handleTags = (tags) => {
    setValues({...values, tags: tags});
  };
  const handleUpload = (e) => {
    toast("uploading image...", {toastId: "imageToast"});
    const storageRef = sRef(storage, `/posts/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        // alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          setValues({...values, image: downloadURL});
          toast.dismiss("imageToast");
        });
      }
    );
  };
  const SuccessToast = ({closeToast, toastProps}) => (
    <>
      Post successful! Check it out in the <Link to="/gallery">Gallery</Link>
    </>
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        addDoc(collection(db, "posts"), {
          values,
        }),
        {
          pending: "post is pending",
          success: "Post successful!",
          // error: "uh oh, something went wrong 🤯",
        }
      );
      console.log("added!");
    } catch (error) {
      console.error(error);
    }
    setCreatePostOpen();
  };

  return (
    <Box className="form-container" pt={2} pb={2} sx={{position: "relative"}}>
      <Box sx={{textAlign: "center"}}>
        <Typography p={0} m={0} variant="button" textAlign="center">
          Posts are displayed in the
        </Typography>
        <Button component={Link} p={0} m={0}>
          Gallery
        </Button>
      </Box>
      <Typography
        variant="h4"
        mb={1}
        textAlign="center"
        textTransform="uppercase"
        fontFamily="var(--font-groovy)"
      >
        Create new post
      </Typography>
      <form onSubmit={handleSubmit} style={{}}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxWidth: "600px",
            "& .MuiInputBase-root": {
              backgroundColor: "rgba(000,000,000,0.05)",
            },
          }}
          disableGutters
        >
          <Box
            sx={{
              backgroundImage: `url(${imgUrl})`,
              backgroundPosition: "center",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundColor: "rgba(255,255,255,0.5)",
              borderRadius: "5px",
              flex: "2",
            }}
          >
            <DragAndDrop handleUpload={handleUpload} />
          </Box>

          <TextField
            label="What would you like to share?"
            multiline
            rows={4}
            value={values.comment}
            name="comment"
            onChange={handleInputChange}
          />
          <TagsInput handleTags={handleTags} />
          <TextField
            label="Your Name (optional)"
            value={values.name}
            name="name"
            type="text"
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{backgroundColor: "black"}}
          >
            Submit
          </Button>
        </Container>
      </form>
      <ToastContainer pauseOnFocusLoss={false} autoClose={1500} />
    </Box>
  );
}
