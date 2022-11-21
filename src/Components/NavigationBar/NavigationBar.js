import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "../../assets/cow_PNG2139.webp";
import BackIcon from "../../assets/pngfind.com-arrow-png-transparent-162137.png"
import "./NavigationBar.css";

function NavigationBar() {
 let navigate = useNavigate()
  return (
    <Navbar
    className="justify-content-around"
      expand="lg"
      sticky="top"
      variant="light"
      bg="light"
    >
        <img
          onClick={()=>navigate(-1)}
          className="homePageIcon"
          src={BackIcon}
          alt="return"
        />

      <Link to="/">
        <img
          className="homePageIcon"
          src={HomeIcon}
          alt="Home"
        />
      </Link>
    </Navbar>
  );
}
export default NavigationBar;
