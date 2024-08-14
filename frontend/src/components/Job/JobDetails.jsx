import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import {
  FaBriefcase,
  FaTags,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3 className="text-5xl flex items-center">
          <FaBriefcase className="mr-2" />
          Job Details
        </h3>
        <div className="banner">
          <div className="max-w-lg rounded overflow-hidden shadow-lg p-6 bg-white">
            <p className="text-xl font-bold mb-2">
              <FaBriefcase className="inline mr-2" />
              Title: <span className="font-normal">{job.title}</span>
            </p>
            <hr className="my-2 border-gray-300" />
            <p className="mb-2">
              <FaTags className="inline mr-2" />
              Category: <span className="font-semibold">{job.category}</span>
            </p>
            <hr className="my-2 border-gray-300" />
            <p className="mb-2">
              <FaGlobe className="inline mr-2" />
              Country: <span className="font-semibold">{job.country}</span>
            </p>
            <hr className="my-2 border-gray-300" />
            <p className="mb-2">
              <FaCity className="inline mr-2" />
              City: <span className="font-semibold">{job.city}</span>
            </p>
            <hr className="my-2 border-gray-300" />
            <p className="mb-2">
              <FaMapMarkerAlt className="inline mr-2" />
              Location: <span className="font-semibold">{job.location}</span>
            </p>
            <hr className="my-2 border-gray-300" />
            <p className="mb-2">
              Description:{" "}
              <span className="font-semibold">{job.description}</span>
            </p>
            <hr className="my-2 border-gray-300" />
            <p className="mb-2">
              <FaCalendarAlt className="inline mr-2" />
              Job Posted On:{" "}
              <span className="font-semibold">{job.jobPostedOn}</span>
            </p>
            <hr className="my-2 border-gray-300" />
            <p className="mb-2">
              <FaMoneyBillWave className="inline mr-2" />
              Salary:{" "}
              {job.fixedSalary ? (
                <span className="font-semibold">{job.fixedSalary}</span>
              ) : (
                <span className="font-semibold">
                  {job.salaryFrom} - {job.salaryTo}
                </span>
              )}
            </p>
          </div>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
