import {useState} from "react";
import {
  getDownloadURL,
  ref as sRef,
  uploadBytesResumable,
} from "firebase/storage";
import {db, storage} from "../../firebase/firebase";
import DragAndDrop, {ImageUploadMobile} from "./DragAndDrop";
import {addDoc, collection} from "firebase/firestore";
import {Input, TextField} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";

export default function UploadImage() {
  const initialValues = {
    name: "",
    image: "defaultImgUrl",
    comment: "",
  };

  const [imgUrl, setImgUrl] = useState("defaultImgUrl");
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };

  const handleUpload = (e) => {
    console.log(`/recipe-imgs/${e.target.files[0].name}`);
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
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "posts"), {
        values,
      });
      console.log("added!");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="img" style={{"--backgroundImage": `url(${imgUrl})`}}>
          <DragAndDrop handleUpload={handleUpload} />
        </div>
        <Input
          label={`Upload Image ${(<PhotoCamera />)}`}
          accept="image/*"
          type="file"
          onChange={handleUpload}
          className="file-upload"
        />
        <TextField
          label="Your Name"
          value={values.name}
          name="name"
          type="text"
          onChange={handleInputChange}
        />
        <TextField
          label="Favorite memory/Comment"
          multiline
          rows={4}
          value={values.comment}
          name="comment"
          onChange={handleInputChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
