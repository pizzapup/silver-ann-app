import {Link} from "react-router-dom";
import Image from "./desert-scene/desert-scene.png";
export default function NotFound() {
  return (
    <>
      <div className="not-found">
        <div className="text-section">
          <div className="heading">Not all who wander are lost,</div>
          <div className="heading">but you definitely are...</div>
          <div>
            Oh deer! Looks like you've stumbled upon a hidden glitch in the
            matrix. Don't worry, even the best hikers get lost sometimes. How
            about we navigate back to safety?{" "}
            <Link to="/">Trek on back to the Home Page</Link>
          </div>
        </div>
        <div className="content">
          <div className="bg">
            <img src={Image} alt="" />
            <div className="img-behind"></div>
            <div className="img-deer"></div>
            <div className="img-mtns"></div>
          </div>
        </div>
      </div>
    </>
  );
}
