import React, {useEffect, useState} from "react";
import {Row, Col, Container} from "react-bootstrap";
import SidePanel from "./SidePanel";
import "../../css/module.css";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import api from "../../../../baseUrl";
import ReactPlayer from "react-player";


export default function VideoPlayer({content, callbackSidePanel}){
    const [url, setUrl] = useState();
    const [hasWatched, setHasWatched] = useState(false);
    const [videos, setVideos] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [descriptionText, setDescriptionText] = useState("Description");
    const [videoName, setVideoName] = useState("Video Name");
    const location = useLocation();
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('id');

    const {courseId, moduleId,videoId} = useParams();
    /*const {moduleId} = location.state;

    const mId = {moduleId}.moduleId;
    const {videoId} = useParams();*/
    //const contentData={content}.content;
    const [contentData, setContentData] = useState([]);
    const mId = moduleId;
    console.log("CONtent ID ",videoId);
    console.log("User id ", userId)
    console.log("CONtent data", {content});
    console.log("Content ", contentData);
    console.log("module id ",moduleId)


    useEffect(() => {
        api.get(`/module/get/${mId}`).then(res =>{
            const response = res.data;
            setVideos( response.module.videos);
            console.log("response " ,response);
            setVideos(response.videos);
            setQuizzes(response.quizzes);
            let newMergedData = [];
            const mergedData = (response.videos || []).concat(response.quizzes || []);
            mergedData.forEach(function(data){
                const newData = {
                    _id: data._id,
                    title: data.name || "",
                    description: data.description || " ",
                    status: "",
                    drive_url:data.drive_url || "",
                    time: data.time_limit? data.time_limit : data.duration,
                    questions: data.questions ? data.questions.length : "",
                    type: data.questions ? "quiz" : "video",
                    contentType: data.questions ? "quiz" : "video"
                }
                newMergedData.push(newData);
            })
           setContentData(newMergedData);
            //console.log("data",newMergedData);
            const item = newMergedData.find(item => item._id === videoId);
            //console.log("Item ", item);
            console.log("Updating title and description");
            setDescriptionText(item.description);
            setVideoName(item.title);
            setUrl(item.drive_url);
            console.log("url ,",item.drive_url)
        }).catch( error => {
            console.log(error);
        })
    }, [mId, videoId]);

    useEffect(() => {


    }, [videoId]);


    const handleVideoEnd = () => {
        setHasWatched(true);
        console.log('User has completed watching.');
        api.post("/progress/update/user-progress", {
            userId: userId,
            moduleId: mId,
            contentId: videoId
        }).then(res => {
            const response = res.data;

            console.log("Updated the progress ", response)
            console.log("for user ",userId)
        }).catch(error => {
            console.log("error updating progress ", error);
        })
    };



    return (
        <>
            <Container className="video-title-container">
            <div className="video-name">
                {videoName}
            </div>
        </Container>
        <Container className="video-player-container">

            <Row>
                <Col sm={8} className="video-player-content">
                    <Row className="video-player-row">
                        <div>
                            {url ?(<video width="100%" controls onEnded={handleVideoEnd}>
                                <source src={url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>):(
                                <div style={{color:"white"}}>No Video Found</div>
                            )}
                            {/*<ReactPlayer url={url} controls={true} onEnded={handleVideoEnd} width="100%" />*/}
                        </div>
                    </Row>
                    <Row className="video-description">

                            <div className="video-description-title">
                                Lecture Description
                            </div>
                            <div className="video-description-des">
                                {descriptionText}
                            </div>

                    </Row>
                </Col>
                <Col sm={4} className="video-module-content">
                    {contentData.map((item) => (
                        <SidePanel key={item._id} id={item._id} item={item} moduleId = {mId} handleOnClickSidePanel={() => callbackSidePanel(item._id, item.contentType)}/>
                ))}
                </Col>

            </Row>
        </Container>
        </>

    )
}