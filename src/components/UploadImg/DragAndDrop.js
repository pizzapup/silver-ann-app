import {PhotoCamera} from "@mui/icons-material";
import {useRef, useState} from "react";
import {Box, Button, InputLabel} from "@mui/material";

export default function DragAndDrop({handleUpload}) {
  const [dragActive, setDragActive] = useState(false);

  const inputRef = useRef(null);

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    }
  };

  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleUpload(e);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <Box onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <InputLabel htmlFor="input-file-upload" sx={{height: "100%"}}>
        <Button
          type="button"
          variant="outlined"
          size="large"
          sx={{
            minHeight: "25vh",
            height: "100%",
            width: "100%",
            "&:hover": {borderStyle: "dashed"},
            borderStyle: dragActive ? "dashed" : "solid",
          }}
          onClick={onButtonClick}
        >
          <PhotoCamera />
          Upload Image
        </Button>
      </InputLabel>
      <Box
        component="input"
        ref={inputRef}
        type="file"
        sx={{display: "none"}}
        multiple={false}
        onChange={handleChange}
        accept="/image/*"
      />
      {dragActive && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "1rem",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></Box>
      )}
    </Box>
  );
}
