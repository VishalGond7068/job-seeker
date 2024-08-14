import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaBriefcase } from "react-icons/fa";

const JobWithCategory = () => {
  const [jobs, setJobs] = useState([]);
  const { id } = useParams(); 
  const optionsArray = [
    "Graphics & Design",
    "Mobile App Development",
    "Frontend Web Development",
    "MERN Stack Development",
    "Account & Finance",
    "Artificial Intelligence",
    "Video Animation",
    "MEAN Stack Development",
    "MEVN Stack Development",
    "Data Entry Operator"
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/job/getall/${optionsArray[id]-1}`, {
          withCredentials: true,
        });
        setJobs(response.data.jobs); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, [id]); 

  return (
    <section className="jobs page">
      <div className="container">
        <h1 className="text-5xl flex items-center">
          <FaBriefcase className="mr-3" />
          {optionsArray[id - 1]} JOBS
        </h1>
        <div className="banner">
          {jobs.length > 0 ? (
            jobs.map((element) => (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
            ))
          ) : (
            <p>No jobs found for category: {id}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobWithCategory;
