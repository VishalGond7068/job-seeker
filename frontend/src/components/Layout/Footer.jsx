import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By CodeWithVishal.</div>
      <div>
        <Link to={"https://www.linkedin.com/in/vishal-gond-b65456227?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.facebook.com/akash.kumar7408?mibextid=ZbWKwL"} target="_blank">
          <FaFacebookF />
        </Link>
        {/* <Link to={"/"} target="_blank">
          <FaYoutube />
        </Link> */}
        <Link to={"https://www.instagram.com/vishal_gond7068?igsh=Zmd4emE2OXI3OTY4"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
