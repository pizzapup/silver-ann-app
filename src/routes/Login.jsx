import {
  Avatar,
  Box,
  Button,
  TextField,
  SpeedDial,
  SpeedDialAction,
} from "@mui/material";
import {signInAnonymously} from "firebase/auth";
import {useState} from "react";
import {auth} from "../firebase/firebase";
import IconAvatar from "../assets/icons/IconAvatar";
export default function Login() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    uid: "",
    username: "",
    photoUrl: "",
    icon: 1,
  });
  const dials = [1, 2, 3, 4];
  const handleSpeedial = (e) => {
    setValues({...values, icon: e});
    setOpen(false);
  };
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
        console.log("signed in. uid: ", auth.currentUser.uid);
      })
      .catch((error) => {
        console.log(error.code, error.message);
      });
  };

  return (
    <>
      <Box sx={{height: 320, transform: "translateZ(0px)", flexGrow: 1}}>
        <SpeedDial
          ariaLabel="SpeedDial avatar selection"
          direction="right"
          sx={{
            position: "absolute",
            bottom: 16,
            left: 10,
          }}
          FabProps={{color: "lightestGrey"}}
          icon={<IconAvatar variant={values.icon} />}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
        >
          {dials.map((num) => (
            <SpeedDialAction
              key={`key-sd-${num}`}
              icon={<IconAvatar variant={num} />}
              onClick={() => handleSpeedial(num)}
            />
          ))}
        </SpeedDial>
        {/* <Button variant="outlined" size="small" onClick={() => setOpen(!open)}>
          Choose Avatar
        </Button> */}
      </Box>
      <Box component="form" onSubmit={handleSubmit}>
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
