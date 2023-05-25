import LogoArtista from "../../assets/images/LogoArtista/LogoArtista";
import TitlebarBelowMasonryImageList from "../Gallery/Gallery";

export default function Hero() {
  return (
    <>
      <div className="hero">
        <div>SAT JUNE 24TH</div>
        <div className="hero-logo">
          <LogoArtista />
        </div>
        <div>FROM 3PM TIL 10PM</div>
      </div>
      <TitlebarBelowMasonryImageList />
    </>
  );
}
