/*
This code creates the main Quiz Addition page for our application.
================================
Author: Gunjan Vazirani
Last Updated: 04-04-2024
================================
*/

import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useNavigate, useLocation } from "react-router-dom";
import "./QuizAddition.css";
import { toast } from "react-toastify";
import api from "../../baseUrl";

const QuizAddition = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [minimumMarks, setMinimumMarks] = useState("");
  const [selectedModule, setSelectedModule] = useState({});
  var modulesArray1 = [];
  const location = useLocation();
  // console.log(location.state?.courseId);
  //const [personName, setPersonName] = useState([]);
  const [existingQuestions, setExistingQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [modules, setModules] = useState([]);
  //const [modulesArray, setModulesArray] = useState([]);
  const [existingQuestionsSelected, setExistingQuestionsSelected] =
    useState(false);
  const navigate = useNavigate();
  var courseId = location.state?.courseId;

  useEffect(() => {
    function fetchQuestions() {
      api
        .get("/question/get/all")
        .then((response) => {
          setExistingQuestions(response.data.questions);
          return api.get(`/courses/get/${courseId}`);
        })
        .then((getCourse) => {
          const modulesFromCourse = getCourse.data?.course?.modules;
          console.log(modulesFromCourse);

          const modulePromises = modulesFromCourse.map((moduleId) =>
            api.get(`/module/get/${moduleId}`)
          );

          return Promise.all(modulePromises);
        })
        .then((responses) => {
          const modulesArray = responses.map((response) => response.data);
          console.log("inside promise" + modulesArray);
          setModules(modulesArray); // Set modules state here
        })
        .catch((error) => {
          console.error("Error fetching modules:", error);
        });
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    // This will run after `modules` is updated
    console.log("Modules state has been updated:", modules);
  }, [modules]);
  const handleChange = (event, value) => {
    console.log("Selected questions:", value);
    setSelectedQuestions(value);
    setExistingQuestionsSelected(value.length > 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const combinedQuestions = [...selectedQuestions];
    const form = event.currentTarget.form;

    // if (!form.checkValidity()) {
    //   event.stopPropagation();
    //   toast.error("Not all fields are filled.", {
    //     autoClose: 3000,
    //   });

    // return;
    // }
    try {
      var response = await api.post("/quiz/add", {
        name,
        description,
        timeLimit,
        deadline,
        minimumMarks,
        questions: combinedQuestions,
      });
      if (
        response.data &&
        response.data.success &&
        response.data.quiz &&
        response.data.quiz._id
      ) {
        console.log(response.data.quiz._id);
        api.put(`/module/update/${selectedModule._id}`, {
          ...selectedModule, // Send the entire module object
          quizzes_id: [...selectedModule.quizzes_id, response.data.quiz._id], // Append the new quiz ID
        });
      }

      navigate("/course");
      toast.success("Quiz and Questions added successfully.", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error adding quiz:", error);
      toast.error("Failed to add quiz. Please try again later.", {
        autoClose: 3000,
      });
    }
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await api.post("/quiz/add", {
  //       name,
  //       description,
  //       timeLimit,
  //       deadline,
  //       minimumMarks,
  //     });

  // const quizId = response.data._id;

  // await Promise.all(
  //   personName.map(async (question) => {
  //     await api.post(`/question/${question._id}/addQuiz`, { quizId });
  //   })
  // );

  // navigate("/associate-module");
  //   } catch (error) {
  //     console.error("Error adding quiz:", error);
  //   }
  // };

  const handleModuleChange = (event) => {
    const value = event.target.value;
    setSelectedModule(value);
    console.log(selectedModule._id);
  };
  const handleCreateNew = (event) => {
    const form = event.currentTarget.form;

    if (!form.checkValidity()) {
      event.stopPropagation();
      toast.error("Not all fields are filled.", {
        autoClose: 3000,
      });
      return;
    }
    toast.success("You are good to add new questions.", {
      autoClose: 3000,
    });
    navigate("/create-new-question", {
      state: {
        name: name,
        description: description,
        timeLimit: timeLimit,
        deadline: deadline,
        minimumMarks: minimumMarks,
        questions: selectedQuestions,
        module: selectedModule,
      },
    });
  };

  return (
    <div className="create-quiz-container">
      <h2>Add Quiz</h2>
      <form onSubmit={handleSubmit} className="create-quiz-form">
        <div className="align">
          <div className="left-half">
            <FormControl className="input-field-dropdown">
              <InputLabel id="module-label">Module</InputLabel>

              <Select
                label="Module"
                labelId="module-label"
                id="module-select"
                value={selectedModule.id}
                onChange={handleModuleChange}
              >
                {modules &&
                  modules.map((item) => (
                    <MenuItem
                      key={item.module.id}
                      value={item.module}
                      eventKey={item.module.id}
                    >
                      {item.module.title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField
              label="Name"
              className="input-field "
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Description"
              className="input-field labels-quiz-left"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={1}
            />
          </div>
          <div className="right-half">
            <TextField
              className="input-field"
              label="Deadline with respect to course start date"
              type="number"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Enter number of days"
              required
            />
            <TextField
              label="Time Limit to finish the quiz"
              className="input-field labels-quiz-right"
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              placeholder="Time limit in minutes"
              required
            />
            <TextField
              label="Enter minimum marks to pass the quiz"
              className=" labels-quiz-right input-field"
              type="number"
              value={minimumMarks}
              onChange={(e) => setMinimumMarks(e.target.value)}
              placeholder="Enter passing marks"
              required
            />
          </div>
        </div>
        <div className="question-divider">Questions:</div>
        <div className="search-dropdown"></div>
        <div className="side">
          <div className="add-new-q">
            <FormControl sx={{ m: 1, width: 600 }}>
              <Autocomplete
                multiple
                id="existing-questions-autocomplete"
                options={existingQuestions}
                getOptionLabel={(option) => option.question}
                onChange={(event, newValue) => {
                  setSelectedQuestions(newValue);
                  setExistingQuestionsSelected(newValue.length > 0);
                }}
                value={selectedQuestions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label=""
                    placeholder="Select Existing Questions"
                  />
                )}
              />
            </FormControl>
          </div>
          <div className="button-container">
            <div className="create-new-button">
              <button
                className="submit-button"
                type="button"
                onClick={handleCreateNew}
              >
                CREATE NEW
              </button>
            </div>
            <div className="save-and-next">
              <button
                className="submit-button"
                type="submit"
                disabled={!existingQuestionsSelected}
              >
                SAVE AND GO TO COURSE
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuizAddition;
