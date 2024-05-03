import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import api from "../../baseUrl";
import "../Courses/css/CoursesPage.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './css/CoursesPage.css'

const AdminCoursesPage = (props) => {
  const { user } = props;
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    api
      .get("/courses/get/all")
      .then((response) => {
        setCourses(response.data.courses);
        console.log(response.data.courses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const shortenDescription = (description) => {
    if (description.length > 300) {
      return description.substring(0, 300) + "...";
    }
    return description;
  };

  return (
    <main className="container mt-5">
      <header className="text-center">
        <h1 className="mb-4 heading">Course Library</h1>
        <div className="search-bar text-center mb-4">
          <input
            type="text"
            placeholder="Search for courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Link to="/module/create" style={{ textDecoration: "none" }}>
          <Button variant="primary" className="add-course-button-courses">
            + ADD COURSE
          </Button>
        </Link>
      </header>

      <section className="row">
        {filteredCourses.map((course) => (
          <article className="col-md-6" key={course._id}>
            <section className="card mb-4">
              <section className="card-body d-flex flex-column">
                <h2 className="card-title mb-2 text-center">{course.name}</h2>
                <br />
                <p className="card-text mb-2">
                  <b className="font-weight-bold">Description:</b>{" "}
                  {shortenDescription(course.description)}
                </p>
                <p className="card-text mb-2">
                  <b className="font-weight-bold">Tutor:</b> {course.tutor}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="card-text mb-0">
                    <b className="font-weight-bold">Deadline:</b>{" "}
                    {course.deadline}
                  </p>
                  <Link
                    to={`/courses/${course._id}/modules`}
                    className="btn btn-primary modulesButton"
                  >
                    View Modules
                  </Link>
                </div>
              </section>
            </section>
          </article>
        ))}
      </section>
      <ToastContainer />
    </main>
  );
};

export default AdminCoursesPage;
