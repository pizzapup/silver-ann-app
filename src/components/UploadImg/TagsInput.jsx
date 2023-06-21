import {TextField, Autocomplete, Chip} from "@mui/material";
import {useEffect, useState} from "react";

const commonTags = [
  {title: "ErinAndMatt"},
  {title: "Family"},
  {title: "Friends"},
  {title: "daughters"},
  {title: "Travel"},
  {title: "Celebration"},
  {title: "Wedding"},
  {title: "90s"},
  {title: "Siblings"},
  {title: "Hardwick"},
  {title: "Mazanowski"},
  {title: "Kids"},
  {title: "Baby"},
];

export default function FreeSoloCreateOption({handleTags}) {
  const [values, setValues] = useState([commonTags[0].title]);
  useEffect(() => {}, [values]);
  const handleOnChange = (e, value, reason) => {
    console.log(e, value, reason);
    setValues(value);
    handleTags(value);
  };
  return (
    <>
      <Autocomplete
        multiple
        id="tags-filled"
        options={commonTags.map((option) => option.title)}
        defaultValue={[commonTags[0].title]}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="filled"
              color="primary"
              label={option}
              {...getTagProps({index})}
            />
          ))
        }
        name="tags"
        onChange={handleOnChange}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label="Tags" />
        )}
      />
    </>
  );
}
