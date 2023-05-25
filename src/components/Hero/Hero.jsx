import {Box} from "@mui/material";
import LogoArtista from "../../assets/images/LogoArtista/LogoArtista";

export default function Hero() {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>SAT JUNE 24TH</div>
        <Box sx={{minWidth: "300px"}}>
          <LogoArtista />
        </Box>
        <div>FROM 3PM TIL 10PM</div>
      </Box>
    </>
  );
}
