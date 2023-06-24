import {
  Avatar,
  Box,
  Button,
  TextField,
  Stack,
  ButtonBase,
  Typography,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useEffect, useState} from "react";
import {auth, db} from "../firebase/firebase";
import IconAvatar from "../assets/icons/IconAvatar";
import {colors} from "@mui/material";
import {NavigateNextRounded, WaterDrop} from "@mui/icons-material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {ToastContainer, toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../firebase/UserContextProvider";

export default function Login() {
  const user = useContext(UserContext);
  const initialValues = {
    username: "",
    displayName: "",
    email: "",
    password: "password",
    icon: 1,
    iconColor: colors.cyan[50],
    uid: "",
  };
  const [values, setValues] = useState(initialValues);
  const [open, setOpen] = useState(false);
  const dials = [1, 2, 3, 4];
  const iconColors = [
    colors.pink[50],
    colors.orange[50],
    colors.green[50],
    colors.cyan[50],
  ];
  const handleSpeedial = (name, e) => {
    setValues({...values, [name]: e});
  };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    if (name === "username") {
      setValues({
        ...values,
        [name]: value,
        email: `${value}@someFakeEmailExtension123.com`,
        displayName: value,
      });
    } else {
      setValues({...values, [name]: value});
    }
  };
  const createUser = async () => {
    setValues({
      ...values,
      username: values.username,
      email: `${values.username}@someFakeEmailExtension123.com`,
      displayName: values.username,
    });
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setValues({...values, uid: user.uid, displayName: values.username});
        updateProfile(auth.currentUser, values);
        setDoc(doc(db, "users", `${auth.currentUser.uid}`), values);
        console.log(
          "created user with em and password ",
          auth.currentUser.uid,
          auth.currentUser
        );
        toast(`Woohoo! Hello, ${user["displayName"]}`);
      })
      .catch((error) => {
        console.log("error creating user: ", error);
        toast("hmmm, looks like something went wrong.");
      });
  };
  // useEffect(() => {
  //   if (user === null) {
  //     // console.log("signin");
  //   } else {
  //     console.log("already signed in ", user["displayName"]);
  //     // navigate("/");
  //   }
  // }, []);

  const [exists, setExists] = useState(null);
  const checkIfUserExists = async () => {
    const found = [];
    const q = query(
      collection(db, "users"),
      where("displayName", "==", values.username)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      found.push(["doc", doc.id]);
      setExists(doc.id);
    });
    const userExists = exists === null ? false : true;
    return userExists;
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (user === null) {
      //check if user exists
      //if user exists --> sign in
      // else --> create new user
      const userExists = checkIfUserExists();
      console.log(userExists);
    } else {
      console.log("already signed in ", user["displayName"]);
      // navigate("/");
    }
  }

  return (
    <>
      <Typography variant="h4">Hi there!</Typography>
      <Typography variant="body1">
        {/* Let's make sure you get credit for your contributions! */}
        Choose a display name and (optionally) customize your avatar.
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "center",
          justifyContent: "center",
          mb: 1.5,
        }}
      >
        {/* <Box> */}
        <Avatar
          alt="profile avatar"
          sx={{
            backgroundColor: values.iconColor,
            color: "black",
            height: {xs: 90, sm: 150},
            width: {xs: 90, sm: 150},
            // ml: {xs: "0"},
            mt: 1,
          }}
        >
          <IconAvatar variant={values.icon} size="50%" />
        </Avatar>
        <Button variant="outlined" size="small" onClick={() => setOpen(!open)}>
          Customize Avatar
        </Button>
        <Box
          sx={{
            // display: open ? "block" : "none",
            transition: "800ms all ease",
            height: open ? "120px" : 0,
            opacity: open ? 1 : 0,
            border: "1px solid black",
          }}
        >
          <Box
            component="fieldset"
            sx={{
              borderColor: "transparent",
              display: "flex",
              gap: 0.5,
              p: 0.25,
            }}
          >
            {iconColors.map((item, i) => {
              return (
                <ButtonBase
                  component="label"
                  key={`key-${item}-${i}`}
                  sx={{
                    backgroundColor: item,
                    position: "relative",
                    borderRadius: 50,
                    display: "flex",
                    justifyContent: "center",
                    aspectRatio: 1 / 1,
                    alignItems: "center",
                    height: 50,
                    width: 50,
                  }}
                  onClick={() => handleSpeedial("iconColor", item)}
                >
                  <WaterDrop />
                  <Box
                    component="input"
                    type="radio"
                    sx={{position: "absolute", opacity: 0}}
                  />
                </ButtonBase>
              );
            })}
          </Box>
          <Box
            component="fieldset"
            sx={{
              borderColor: "transparent",
              display: "flex",
              gap: 0.5,
              p: 0.25,
            }}
          >
            {dials.map((item, i) => {
              return (
                <ButtonBase
                  component="label"
                  key={`key-${item}-${i}`}
                  sx={{
                    backgroundColor: "#fafafa",
                    position: "relative",
                    borderRadius: 50,
                    display: "flex",
                    justifyContent: "center",
                    aspectRatio: 1 / 1,
                    alignItems: "center",
                    height: 50,
                    width: 50,
                  }}
                  onClick={() => handleSpeedial("icon", item)}
                >
                  <IconAvatar variant={item} />
                  <Box
                    component="input"
                    type="radio"
                    sx={{position: "absolute", opacity: 0}}
                  />
                </ButtonBase>
              );
            })}
          </Box>
          {/* </Box> */}
        </Box>

        <Stack sx={{width: "100%", maxWidth: 600}}>
          <TextField
            fullWidth
            name="username"
            label="Your Name"
            variant="outlined"
            value={values.username}
            onChange={handleInputChange}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{backgroundColor: "black", mt: 1, p: 1.5}}
          >
            lets do this <NavigateNextRounded />
          </Button>
        </Stack>
      </Box>
      <ToastContainer pauseOnFocusLoss={false} autoClose={1500} />
    </>
  );
}
