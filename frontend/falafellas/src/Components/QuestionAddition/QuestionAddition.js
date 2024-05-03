/*
This code creates the main Question Addition page for our application.
================================
Author: Gunjan Vazirani
Last Updated: 04-04-2024
================================
*/

import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../baseUrl";

import {
  TextField,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Radio,
  RadioGroup,
} from "@mui/material";
import "./QuestionAddition.css";
import { useNavigate, useLocation } from "react-router-dom";

const QuestionAddition = () => {
  const [questionType, setQuestionType] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [defaultPoints, setDefaultPoints] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const module = location.state?.module;
  console.log(module);
  const handleSaveAndNext = async (event) => {
    try {
      const newQuestion = {
        question: question,
        options: options,
        answer: answer,
        marks: defaultPoints,
      };

      const form = event.currentTarget.form;

      if (!form.checkValidity()) {
        event.stopPropagation();
        toast.error("Not all fields are filled.", {
          autoClose: 3000,
        });
        return;
      }
      const updatedState = {
        ...location.state,
        questions: location.state
          ? [...location.state.questions, newQuestion]
          : [newQuestion],
      };
      const response = await api.post("/quiz/add", updatedState);
      navigate("/course");
      toast.success("Quiz and Questions successfully added", {
        autoClose: 3000,
      });

      api.put(`/module/update/${module._id}`, {
        ...module, // Send the entire module object
        quizzes_id: [...module.quizzes_id, response.data.quiz._id], // Append the new quiz ID
      });
    } catch (error) {
      console.error("Error adding quiz:", error);
      toast.error("Failed to add quiz. Please try again later.", {
        autoClose: 3000,
      });
    }
  };

  const handleSaveAndNew = (event) => {
    try {
      const form = event.currentTarget.form;

      if (!form.checkValidity()) {
        event.stopPropagation();
        toast.error("Not all fields are filled.", {
          autoClose: 3000,
        });
        return;
      }
      if (answer.trim() === "") {
        toast.error("Please select the correct answer.");
        return;
      }

      const areAllOptionsFilled = options.every(
        (option) => option.optionString.trim() !== ""
      );

      if (!areAllOptionsFilled) {
        toast.error("Please fill in all the options.");
        return;
      }

      setQuestionType("");
      setQuestion("");
      setOptions([]);
      setDefaultPoints("");
      setAnswer("");

      let existingQuestions = [];
      if (location.state && location.state.questions) {
        existingQuestions = location.state.questions;
      }
      const newQuestion = {
        question: question,
        options: options,
        answer: answer,
        marks: defaultPoints,
      };
      const updatedQuestions = [...existingQuestions, newQuestion];

      navigate("/create-new-question", {
        state: {
          ...location.state,
          questions: updatedQuestions,
        },
      });
      toast.success("Question added. You can add more questions.", {
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add question. Please try again later.", {
        autoClose: 3000,
      });
    }
  };

  const handleCorrectAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleQuestionTypeChange = (event) => {
    const value = event.target.value;
    setQuestionType(value);
    if (value === "TrueFalse") {
      setOptions([
        {
          optionId: "1",
          optionString: "True",
        },
        {
          optionId: "2",
          optionString: "False",
        },
      ]);
    } else {
      setOptions([]);
    }
  };

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };
  // const handleOptionChange = (index, value) => {
  //   const newOptions = options.map((optionString, i) => {
  //     if (i === index) {
  //       return {
  //         optionId: (index + 1).toString(),
  //         optionString: value,
  //       };
  //     } else {
  //       return optionString;
  //     }
  //   });
  //   setOptions(newOptions);
  // };

  const handleOptionChange = (index, value) => {
    const newOptions = options.map((option, i) => {
      if (i === index) {
        return {
          optionId: (index + 1).toString(),
          optionString: value,
        };
      } else {
        return option;
      }
    });
    setOptions(newOptions);
  };

  return (
    <div className="create-question-container">
      <h2>Add Question</h2>
      <form>
        <FormControl fullWidth>
          <InputLabel id="question-type-label">Question Type*</InputLabel>
          <Select
            labelId="question-type-label"
            id="question-type-select"
            value={questionType}
            label="Question Type"
            onChange={handleQuestionTypeChange}
          >
            <MenuItem value={"MCQs"}>Multiple Choice Question(MCQs)</MenuItem>
            <MenuItem value={"TrueFalse"}>True/False</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Question"
          multiline
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {questionType === "MCQs" && (
          <div>
            <RadioGroup value={answer} onChange={handleCorrectAnswerChange}>
              {options.map((option, index) => (
                <div key={index} className="option-row">
                  <FormControlLabel
                    value={index.toString()}
                    control={<Radio />}
                  />
                  <TextField
                    className="option-text-field"
                    value={option.optionString} // Update this line
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </div>
              ))}
            </RadioGroup>
            <Button variant="outlined" onClick={handleAddOption}>
              Add Option
            </Button>
          </div>
        )}
        {questionType === "TrueFalse" && (
          <RadioGroup
            value={answer}
            onChange={(e) => setAnswer(e.target.value)} // Update answer state with selected value
          >
            <FormControlLabel value="0" control={<Radio />} label="True" />
            <FormControlLabel value="1" control={<Radio />} label="False" />
          </RadioGroup>
        )}

        <TextField
          label="Default points"
          type="number"
          value={defaultPoints}
          onChange={(e) => setDefaultPoints(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <div className="button-container">
          <div className="save-add-button">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveAndNew}
              style={{ backgroundColor: "#f36b37" }}
            >
              ADD NEW QUESTION
            </Button>
          </div>
          <div className="save-next-button">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveAndNext}
              style={{ backgroundColor: "#f36b37" }}
            >
              SAVE AND GO TO COURSE
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuestionAddition;
