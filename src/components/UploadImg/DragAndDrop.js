import {PhotoCamera} from "@mui/icons-material";
import {useRef, useState} from "react";
import "./dnd.css";
import {Box, Button, Input, InputLabel, TextField} from "@mui/material";

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
    <Box
      id="form-file-upload"
      className="dragAndDrop"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <InputLabel
        id="label-file-upload"
        htmlFor="input-file-upload"
        sx={{height: "100%"}}
      >
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
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        multiple={false}
        onChange={handleChange}
        accept="/image/*"
      />
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </Box>
  );
}
