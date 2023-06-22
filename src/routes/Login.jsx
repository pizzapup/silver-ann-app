import {
  Avatar,
  Box,
  Button,
  Radio,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  SvgIcon,
  TextField,
  RadioGroup,
} from "@mui/material";
import {signInAnonymously} from "firebase/auth";
import {useState} from "react";
import {auth} from "../firebase/firebase";
import {Face, Favorite, FavoriteBorder} from "@mui/icons-material";
import LilMonsterOne from "../assets/icons/avatar1.svg";
import IconAvatar from "../assets/icons/IconAvatar";
export default function Login() {
  const [values, setValues] = useState({
    uid: "",
    username: "",
    photoUrl: "",
    icon: "monsterOne",
  });
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
    console.log(values);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    signInAnonymously(auth)
      .then(() => {
        console.log("signed in");
        console.log("uid: ", auth.currentUser.uid);
        console.log("user: ", auth.currentUser.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <>
      <Box component="form" onSubmit={handleSubmit}>
        <FormLabel component="legend">Avatar</FormLabel>
        <RadioGroup
          value={values.icon}
          onChange={handleInputChange}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            border: "2px solid blue",
            "& >*": {border: "1px solid pink"},
          }}
        >
          <Radio
            name="icon"
            value="monsterOne"
            icon={<IconAvatar variant={1} size="medium" />}
            checkedIcon={<IconAvatar variant={1} />}
          />
          <Radio
            name="icon"
            value="monsterTwo"
            icon={<IconAvatar variant={2} />}
            checkedIcon={<IconAvatar variant={2} />}
          />
          <Radio
            name="icon"
            value="monsterThree"
            icon={<IconAvatar variant={3} />}
            checkedIcon={<IconAvatar variant={3} />}
          />{" "}
          <Radio
            name="icon"
            value="monsterFour"
            icon={<IconAvatar variant={4} />}
            checkedIcon={<IconAvatar variant={4} />}
          />
        </RadioGroup>
        <TextField
          autoComplete="off"
          name="username"
          label="username"
          variant="outlined"
          value={values.username}
          placeholder="name"
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
      </Box>
    </>
  );
}
