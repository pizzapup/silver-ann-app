import {Link} from "react-router-dom";
import Image from "./desert-scene/desert-scene.png";
import {Box, Button, Typography} from "@mui/material";
export default function NotFound() {
  return (
    <>
      <Box sx={{display: "grid", gridTemplateColumns: "1fr"}}>
        <Box>
          <Typography
            variant="h2"
            fontFamily="var(--font-groovy)"
            textAlign="center"
            color="black"
          >
            Not all who wander are lost,
          </Typography>
          <Typography
            variant="h4"
            fontStyle="italic"
            fontFamily="Mukta+Mahee"
            textAlign="center"
            pb={2}
            color="GrayText"
          >
            but you definitely are...
          </Typography>
          <Typography variant="body1" pb={2}>
            <Typography
              fontSize="larger"
              color="secondary"
              fontWeight="bolder"
              fontStyle="italic"
              display="inline-block"
            >
              Oh deer!
            </Typography>{" "}
            Looks like you've stumbled upon a hidden glitch in the matrix. Don't
            worry, even the best hikers get lost sometimes.
            <Button
              component={Link}
              to="/"
              variant="text"
              sx={{
                textDecoration: "underline",
                textUnderlineOffset: 3,
                transition: "200ms ease all",
                "&:hover": {
                  textDecoration: "underline",
                  textUnderlineOffset: 1,
                },
              }}
            >
              Trek on back to the Home Page
            </Button>
          </Typography>
        </Box>
        <Box>
          <Box className="bg" sx={{position: "relative"}}>
            <Box
              component="img"
              src={Image}
              alt=""
              width="100vw"
              sx={{opacity: 0}}
            />
            <Box className="img-behind"></Box>
            <Box className="img-deer"></Box>
            <Box className="img-mtns"></Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
