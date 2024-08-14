import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container flex items-center">
          <h1 className="text-4xl">Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 p-6">
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">
          <span className="font-bold text-gray-700">Name:</span> {element.name}
        </p>
        <p className="text-lg font-semibold mb-2">
          <span className="font-bold text-gray-700">Email:</span> {element.email}
        </p>
        <p className="text-lg font-semibold mb-2">
          <span className="font-bold text-gray-700">Phone:</span> {element.phone}
        </p>
        <p className="text-lg font-semibold mb-2">
          <span className="font-bold text-gray-700">Address:</span> {element.address}
        </p>
        <p className="text-lg font-semibold mb-2">
          <span className="font-bold text-gray-700">Cover Letter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="mb-6">
        <img
          src={element.resume.url}
          alt="resume"
          className="w-full h-auto cursor-pointer rounded-lg border border-gray-300 hover:border-gray-500 transition"
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="text-center">
        <button
          onClick={() => deleteApplication(element._id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  const customColor = "#2D5649";

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6 border border-gray-200">
      <div className="mb-6">
        <img
          src={element.resume.url}
          alt="resume"
          className="w-full h-auto cursor-pointer rounded-lg border border-gray-300"
          style={{ borderColor: customColor }}
          onClick={() => openModal(element.resume.url)}
        />
      </div>
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">
          <span style={{ color: customColor }} className="font-bold">
            Name:
          </span>{" "}
          {element.name}
        </p>
        <p className="text-lg font-semibold mb-2">
          <span style={{ color: customColor }} className="font-bold">
            Email:
          </span>{" "}
          {element.email}
        </p>
        <p className="text-lg font-semibold mb-2">
          <span style={{ color: customColor }} className="font-bold">
            Phone:
          </span>{" "}
          {element.phone}
        </p>
        <p className="text-lg font-semibold mb-2">
          <span style={{ color: customColor }} className="font-bold">
            Address:
          </span>{" "}
          {element.address}
        </p>
        <p className="text-lg font-semibold mb-2">
          <span style={{ color: customColor }} className="font-bold">
            Cover Letter:
          </span>{" "}
          {element.coverLetter}
        </p>
      </div>
    </div>
  );
};
