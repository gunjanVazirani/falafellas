/*
This code creates the main ModuleAddition page for our application.
================================
Author: Aditya Pattani
Last Updated: 03-04-2024
================================
*/

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import AccordionElement from './AccordionElement';
import CourseContentElement from './CourseContentElement';
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import api from '../../baseUrl';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function ModuleAddition() {

  const courseUrl = api.defaults.baseURL + "courses/add";
  const moduleUrl = api.defaults.baseURL + "module/add-module";

  const navigate = useNavigate();

  const [isUploading, setIsUploading] = useState(false);

  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    tutor: "",
    deadline: "",
    modules: [],
    certificate: "",
    reward_points: 0
  });

  const [modules, setModules] = useState([{
      numeric_id: 1,
      title: "Module 1",
      description: "Description for Module 1",
      author: "",
      videos_id: [],
      quizzes_id: [],
      duration: 0,
      is_mandatory: true,
      reward_points: 5,
      fileName: ""
    },
  ]);
  const [selectedModule, setSelectedModule] = useState(modules[0]);

  const addModule = () => {
    const newModule = {
      numeric_id: modules.length + 1,
      title: `Module ${modules.length + 1}`,
      description: `Description for Module ${modules.length + 1}`,
      author: "",
      videos_id: [],
      quizzes_id: [],
      duration: 0,
      is_mandatory: true,
      reward_points: 5,
      fileName: ""
    };
    setModules([...modules, newModule]);
  };

  const onClickModuleItem = (module) => {
    setSelectedModule(module);
  };
  
  const updateModuleData = (moduleId, newTitle, addedFile, fileName, newDescription) => {
    console.log(addedFile)
    const updatedModules = modules.map((module) => {
      if (module.numeric_id === moduleId) {
        return { ...module,
          title: newTitle,
          videos_id: [{
            description: newDescription,
            name: fileName,
            duration: 10
          }],
          file: addedFile,
          fileName: fileName,
          description: newDescription };
      }
      return module;
    });
    setModules(updatedModules);
    toast.success("Module Saved !");
  };

  // This function handles the video upload first, then it uploads modules, then courses
  const handleSave = (exitFlag) => {

    // Checking if all values are entered
    if (!courseData.name || !courseData.description || !courseData.tutor || !courseData.deadline) {
      toast.error("Please fill in all course details.");
      return; // Exit function early if any field is missing
    }

    setIsUploading(true);
    var modulesArray = [];
    var courseId = "";
  
    const storage = getStorage();
  
    const uploadPromises = modules.map((module) => {

      if (!module.file) {
        // If module.file is empty, skip the file upload process
        return Promise.resolve(null);
      }

      // Upload the video file
      const storageRef = ref(storage, 'module-videos/' + module.file.name);
      return uploadBytes(storageRef, module.file)
        .then((snapshot) => {
          console.log("File uploaded!");
  
          // Get the download URL of the uploaded file
          return getDownloadURL(storageRef)
            .then((downloadURL) => {
              console.log("File download URL:", downloadURL);
              toast.success("File uploaded !")
              return downloadURL;
            });
        })
        .then((fileUrl) => {
          // Update the module object with the download URL
          const updatedModule = {
            ...module,
            videos_id: [{
              description: module.description,
              name: module.fileName,
              drive_url: fileUrl
            }]
          };
  
          // Upload the module object
          return axios({
            method: "post",
            url: moduleUrl,
            data: updatedModule
          })
          .then((response) => {
            if (response.status === 201) {
              modulesArray.push(response.data.doc._id);
            }
          });
        })
        .catch((error) => {
          toast.error(`Module with title ${module.title} failed to upload!`);
          console.error(error);
        });
    });
  
    // Wait for all video uploads and module uploads to finish
    Promise.all(uploadPromises)
      .then(() => {
        // All modules are successfully uploaded
        // Update courseData with moduleIds
        setCourseData((prevCourseData) => ({
          ...prevCourseData,
          modules: modulesArray
        }));
  
        // Upload the course
        return axios({
          method: "post",
          url: courseUrl,
          data: {
            ...courseData,
            modules: modulesArray
          }
        });
      })
      .then((response) => {
        if (response.status === 201) {
          courseId = response.data.courseId;
          toast.success("Course added !");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error in adding course !");
      })
      .finally(() => {
        setIsUploading(false);
        if (exitFlag) {
          navigate("/add-quiz", { state: { courseId: courseId } });
        }
      });
  };
  

  const handleCourseDataChange = (event) => {
    const { name, value } = event.target;
    setCourseData({ ...courseData, [name]: value });
  };

  return (
    <div className="App">
      <Form.Group>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Course Name"
          className="w-25"
          style={{ fontSize: "24px", height: "80px", marginLeft: '40px', marginTop: '20px', marginBottom: '20px' }}
          name="name"
          value={courseData.name}
          onChange={handleCourseDataChange} />
        <Form.Control
          size="lg"
          type="text"
          placeholder="Course Description"
          className="w-50"
          style={{ marginLeft: '40px' }}
          name="description"
          value={courseData.description}
          onChange={handleCourseDataChange} />
    
        <Form.Control
          size="lg"
          type="text"
          placeholder="Tutor"
          className="w-25"
          style={{ marginLeft: '40px', marginTop: '20px' }}
          name="tutor"
          value={courseData.tutor}
          onChange={handleCourseDataChange} />
        <Form.Control
          size="lg"
          type="number"
          placeholder="Days Allowed"
          className="w-25"
          style={{ marginLeft: '40px', marginTop: '20px', marginBottom: '20px' }}
          name="deadline"
          value={courseData.deadline}
          onChange={handleCourseDataChange} />
      </Form.Group>
      <div style={{ marginLeft: '20px', marginTop: '20px' }}>
        <Row style={{ marginRight: '0px' }}>
          <Col>
            <AccordionElement modules={modules} addModule={addModule} onClickItem={onClickModuleItem} />
          </Col>
          <Col>
          <CourseContentElement
            selectedModule={selectedModule}
            updateModuleData={updateModuleData}
          />
          </Col>
        </Row>
      </div>
      <center>
        <Button
          variant="primary"
          className="w-50 submit-button-contact"
          style={{ display: "inline-block", margin: '10px', marginBottom: "50px" }}
          onClick={() => handleSave(false)}
          disabled={isUploading}>
            {isUploading ? ( // Render spinner if loading
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "SAVE"
            )}
        </Button>

        <Button
          variant="primary"
          className="w-50 submit-button-contact"
          style={{ display: "inline-block", margin: '10px', marginBottom: "50px" }}
          onClick={() => handleSave(true)}
          disabled={isUploading}>
            {isUploading ? ( // Render spinner if loading
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            ) : (
              "SAVE & ADD QUIZ"
            )}
        </Button>
      </center>
      <ToastContainer />
    </div>
  );
}

export default ModuleAddition;
