import {useState} from "react";
import {
  getDownloadURL,
  ref as sRef,
  uploadBytesResumable,
} from "firebase/storage";
import {db, storage} from "../../firebase/firebase";
import DragAndDrop from "./DragAndDrop";
import {addDoc, collection} from "firebase/firestore";
import {Box, Button, Container, TextField} from "@mui/material";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadImage() {
  const initialValues = {
    name: "",
    image: "defaultImgUrl",
    comment: "",
  };
  const [imgUrl, setImgUrl] = useState("");
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };

  const handleUpload = (e) => {
    toast("uploading image...", {toastId: "imageToast"});
    const storageRef = sRef(storage, `/posts/${e.target.files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert(error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        addDoc(collection(db, "posts"), {
          values,
        }),
        {
          pending: "post is pending",
          success: "Post successful",
          error: "uh oh, something went wrong 🤯",
        }
      );
      console.log("added!");
    } catch (error) {
      console.error(error);
    }
    setValues(initialValues);
  };

  return (
    <Box className="form-container" pt={2} pb={2}>
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
            label="Favorite memory/Comment"
            multiline
            rows={4}
            value={values.comment}
            name="comment"
            helperText="Enter text for your post"
            onChange={handleInputChange}
          />
          <TextField
            label="Your Name"
            value={values.name}
            name="name"
            type="text"
            helperText="Display your name with your post (optional)"
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
