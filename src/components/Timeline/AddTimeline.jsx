import {useEffect, useState} from "react";
import {
  getDownloadURL,
  ref as sRef,
  uploadBytesResumable,
} from "firebase/storage";
import {addDoc, collection} from "firebase/firestore";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Fab,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import {db, storage} from "../../firebase/firebase";
import {DateField, DatePicker} from "@mui/x-date-pickers";
import DragAndDrop from "../UploadImg/DragAndDrop";
import TagsInput from "../UploadImg/TagsInput";
import {CloseRounded, Event} from "@mui/icons-material";
import {ToastContainer, toast} from "react-toastify";
import {LoadingButton} from "@mui/lab";

const initialValues = {
  image: "",
  tags: ["ErinAndMatt"],
  month: 1,
  day: 1,
  year: 1998,
  yearOnly: false,
};

export default function AddTimeline({activeUser, setOpen}) {
  const [values, setValues] = useState(initialValues);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checked, setChecked] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [date, setDate] = useState("");
  const handleCheckbox = (e) => {
    setChecked(e.target.checked);
    setValues({...values, yearOnly: checked});
  };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };
  // const handleTags = (tags) => {
  //   setValues({...values, tags: tags});
  // };
  const handleUpload = (e) => {
    toast("uploading image...", {toastId: "imageToast"});
    const storageRef = sRef(
      storage,
      `/timelineUserUploads/${e.target.files[0].name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    setUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        alert(error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL);
          setValues({...values, image: downloadURL});
          toast.update("imageToast", "Image uploaded!");
          toast.dismiss("imageToast");
          setUploading(false);
        });
      }
    );
  };
  useEffect(() => {
    const year = date.$y;
    if (checked === true) {
      setValues({
        ...values,
        month: 0,
        day: 0,
        year: year,
      });
    } else {
      setValues({
        ...values,
        month: date.$M,
        day: date.$D,
        year: year,
      });
    }
  }, [date, checked]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addDoc(collection(db, "timeline"), values);
      setValues(initialValues);
      setSubmitting(false);
      toast.success("Timeline event created!").then(setOpen());
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <Box className="form-container" pt={0} pb={0}>
      <Box sx={{display: "flex"}}>
        <Fab
          sx={{flex: "0 0 auto"}}
          size="small"
          color="primary"
          onClick={setOpen}
        >
          <CloseRounded />
        </Fab>{" "}
        <Typography
          variant="h4"
          sx={{flex: 1}}
          mb={1}
          ml={2}
          textAlign="center"
          textTransform="uppercase"
          fontFamily="var(--font-groovy)"
        >
          New timeline event{" "}
        </Typography>
      </Box>
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
            <DragAndDrop handleUpload={handleUpload} loading={uploading} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 1,
            }}
          >
            <TextField
              label="Title/Main Caption"
              value={values.caption}
              name="caption"
              onChange={handleInputChange}
              sx={{flex: 1, maxWidth: 200}}
            />
            {checked ? (
              <DatePicker
                views={["year"]}
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                sx={{flex: 1, maxWidth: 200}}
              />
            ) : (
              <DateField
                label="Date"
                value={date}
                onChange={(newValue) => setDate(newValue)}
                sx={{flex: 1, maxWidth: 200}}
              />
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 0,
                px: 1,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleCheckbox}
                    sx={{p: 0, m: 0, maxWidth: 200}}
                    name="yearOnly"
                  />
                }
                label="Year only?"
              />
              <FormHelperText>Check to only input the year</FormHelperText>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 1,
            }}
          >
            {/* <TagsInput handleTags={handleTags} /> */}
            <TextField
              label="Sub-caption"
              multiline
              rows={1}
              sx={{flex: 1}}
              value={values.subcaption}
              name="subcaption"
              onChange={handleInputChange}
              helperText="Optional extra text that displays below the main caption"
            />
            <TextField
              label="your name"
              value={values.name}
              // size="small"
              name="name"
              sx={{maxWidth: 140}}
              onChange={handleInputChange}
              // helperText=""
            />
          </Box>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            sx={{backgroundColor: "black"}}
            disabled={uploading}
            loading={submitting}
            loadingPosition="start"
            startIcon={<Event />}
          >
            Submit
          </LoadingButton>
        </Container>
      </form>
    </Box>
  );
}
