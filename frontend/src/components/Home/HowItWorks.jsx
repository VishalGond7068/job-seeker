import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How JobZee Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <Link to={"/register"}>
                <p>Create Account</p>

                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur, culpa.
                </p>
              </Link>
            </div>
            <div className="card">
              <MdFindInPage />
              <Link to={"/job/getall"}>
                <p>Find a Job/Post a Job</p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur, culpa.
                </p>
              </Link>
            </div>
            <div className="card">
              <IoMdSend />
              <Link to={"/applications/me"}>
                <p>Apply For Job/Recruit Suitable Candidates</p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Consequuntur, culpa.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
