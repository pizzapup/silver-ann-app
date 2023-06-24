import {addDoc, collection, getDocs} from "firebase/firestore";
import {db} from "../firebase/firebase";
import {useEffect, useState} from "react";
import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function Guestbook() {
  const [loading, setLoading] = useState(false);
  const initValues = {
    name: "",
    message: "",
  };
  const [list, setList] = useState([]);
  const [values, setValues] = useState(initValues);
  const findAll = async () => {
    const docRefs = await getDocs(collection(db, "guestbook"));
    const res = [];
    docRefs.forEach((post) => {
      res.push({id: post.id, ...post.data()});
    });
    return res;
  };
  const fetchData = async () => {
    setLoading(true);
    const res = await findAll();
    setList([...res]);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    console.log(list);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    addDoc(collection(db, "guestbook"), {
      values,
    });
  };
  return (
    <Box sx={{width: "100vw"}}>
      <Typography
        variant="h3"
        textAlign="center"
        fontFamily="var(--font-groovy)"
        m={2}
      >
        Guestbook
      </Typography>
      <Stack
        component="form"
        sx={{maxWidth: 400, m: "0 auto"}}
        onSubmit={handleSubmit}
      >
        <TextField
          value={values.name}
          onChange={(e) => setValues({...values, name: e.target.value})}
          label="Name"
        />
        <TextField
          value={values.message}
          label="Message"
          onChange={(e) => setValues({...values, message: e.target.value})}
        />
        <Button type="submit" variant="contained" size="large">
          Submit
        </Button>
      </Stack>
      <Box>
        {list && (
          <List>
            {list.map((item, i) => {
              return (
                <ListItem>
                  <ListItemText
                    primary={item.values.name}
                    secondary={item.values.message}
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>
    </Box>
  );
}
