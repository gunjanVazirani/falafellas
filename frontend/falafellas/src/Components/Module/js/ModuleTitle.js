import { Container } from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Routes, Route, useParams, useLocation, useNavigate} from "react-router-dom";
import Videos from "./Videos";
import "../css/module.css";
import api from "../../../baseUrl";
import {useEffect, useState} from "react";
import VideoPlayer from "./VideoPlayer/VideoPlayer";


//Main module component
export default function ModuleTitle() {

    const [moduleData, setModuleData] = useState({});
    const location = useLocation();
    const [up, setUp] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videos, setVideos] = useState();
    const [quizzes, setQuizzes] = useState([]);
    const {courseId,moduleId } = useParams()
    const [video, setVideo] = useState(false);
    const [quiz, setQuiz] = useState(false);
    const [status, setStatus] = useState(false);
    const userId = sessionStorage.getItem('id');
    console.log("user id from session ", userId)
    console.log("module id from session ", moduleId)
    console.log("course id from session ", courseId)

    const checkBox = {video: video, quiz: quiz, status: status};
    const navigate = useNavigate();
    const callback = (value) => {
        console.log("value " + value);

        if (value === "video-box") {
            setVideo(!video);
            //console.log(video);
        } else if (value === "quiz-box") {
            setQuiz(!quiz);
            //console.log(quiz);
        } else if (value === "incomplete-box") {
            setStatus(!status);
            //console.log(status);
        }
    }
    useEffect(() => {
        api.get(`/module/get/${moduleId}`).then(res =>{
            const response = res.data;
            setModuleData(response);
            setTitle(response.module.title);
            setDescription(response.module.description);
            setVideos(response.module.videos);
            console.log(response);
            setVideos(response.videos);
            console.log(response.videos);
            setQuizzes(response.quizzes);
        }).catch( error => {
            console.log(error);
        })


    }, [moduleId]);

    const [data, setData] = useState([]);
    const mergedData = (videos || []).concat(quizzes || []);
    console.log('merged data ', mergedData )
    let moduleP;
    useEffect(() => {
        api.post("/progress/add/user-progress", {
            userId: userId,
            courseId: "1223",
            moduleId: moduleId
        }).then(res =>{
        api.post("/progress/get/user-progress",{
            user_id: userId,
            module_id: moduleId
        }).then(res => {
            let response = res.data;
            console.log("module response progress ",response)
            moduleP = response.module_progress;
            //console.log("module p", moduleP.progress);
            setUp(moduleP.progress);
            let newMergedData = [];
            mergedData.forEach(function(data){
                let status = "Incomplete";
                console.log("in foreach ",moduleP.progress)
                if (moduleP.progress.includes(data._id)){
                    console.log("progress found ", data._id)
                    status = "Complete";
                }
                const newData = {
                    _id: data._id,
                    title: data.name || "",
                    description: data.description || " ",
                    status: status,
                    drive_url:data.drive_url || "",
                    time: data.time_limit? data.time_limit : data.duration,
                    questions: data.questions ? data.questions.length : "",
                    type: data.questions ? "quiz" : "video",
                    contentType: data.questions ? "quiz" : "video"
                }
                newMergedData.push(newData);
            })
            setData(newMergedData);
            console.log("data",data);
        }).catch ( error => {
            console.log("error fetching user progress ",error);
        })
        }).catch(error => {
            console.log("error adding user progress", error)
        })


    }, [videos, quizzes]);



    function call(videoId, contentType){
        if(contentType ==="quiz"){
            navigate("/not-found")
        }else {
            navigate(`/courses/${courseId}/module/${moduleId}/video/${videoId}`, {state: {moduleId: moduleId}})
        }
    }

    const isVideoPath = location.pathname.includes("/video/");

    return (
        <>
            {!isVideoPath &&  <Container className="course-title-container course-title">
                <Row className="course-name ">
                    {title}
                </Row>
                <Row className="course-description">
                    {description}
                </Row>
                <Row className='filter-tabs '>
                    <Col className="filter d-flex align-items-center justify-content-center p-2" onClick={(e)=>{navigate("/")}}>
                        Home
                    </Col>
                    <Col className="filter d-flex align-items-center justify-content-center p-2">
                <span className="check-box">
                    <input type="checkbox" name="video-box" onChange={(e) => callback(e.target.name)}></input>
                </span>
                        <span>
                    Video
                </span>
                    </Col>
                    <Col className="filter d-flex align-items-center justify-content-center p-2">
                <span className="check-box">
                    <input type="checkbox" name="incomplete-box" onChange={(e) => callback(e.target.name)}></input>
                </span>
                        <span>
                    Incomplete
                </span>
                    </Col>
                    <Col className="filter d-flex align-items-center justify-content-center p-2">
                <span className="check-box">
                    <input type="checkbox" name="quiz-box" onChange={(e) => callback(e.target.name)}></input>
                </span>
                        <span>
                    Quiz
                </span>
                    </Col>
                    <Col className="filter d-flex align-items-center justify-content-center p-2" onClick={(e)=>{navigate("/course")}}>

                        Course

                    </Col>
                </Row>

            </Container>}
            <Routes>
                <Route path="/" element={<Videos mdata = {data} videos = {videos} quizzes = {quizzes} checkBox={checkBox} moduleId={moduleId}/>}/>
                <Route path="video/:videoId" element={<VideoPlayer content={data} moduleId = {moduleId} callbackSidePanel={(videoId, contentType)=>call(videoId, contentType)}/>}/>
            </Routes>
    </>
    )
}