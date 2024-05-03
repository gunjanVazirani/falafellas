import Container from "react-bootstrap/esm/Container";
import Video from "./Video";
import {useEffect, useState} from "react";
import "../css/module.css"
import NotFound from "../../CommonComponents/NotFound";



/*const data = [{
    title: "What is Lorem Ipsum",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's",
    status: "Complete",
    time: "10 mins",
    questions: "",
    type:""},

    {
        title: "Why is Lorem Ipsum",
        description: " Lorem Ipsum has been the industry's quote. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        status: "Incomplete",
        time: "5 mins",
        questions: "",
        type:""},

    {
        title: "Quiz 1",
        description: " What is Lorem Ipsum",
        status: "Incomplete",
        time: "5 mins",
        questions: "10 Questions",
        type:"MCQs"
    }
]*/

//Component that displays video and quizzes in the module

export default function Videos({mdata , videos, quizzes , checkBox, moduleId}) {

    const [data, setData] = useState([]);
    const merged = {mdata}.mdata;
    console.log("mdata ",merged);
    useEffect(() => {
        setData(merged)
        console.log("DATA ", data);
    }, [mdata]);


    return(

        <Container fluid className="video-frame">
            {data.filter(function(data){
                //console.log("check video ",checkBox.video);
                //console.log("check quiz ",checkBox.quiz);
                //console.log("check status ",checkBox.status);
                if(!(checkBox.video || checkBox.quiz || checkBox.status)){
                    return data;
                }else{

                    if(data.contentType==="video"){
                        if(checkBox.video){
                            return data;
                        }
                    }
                    else if(data.contentType==="quiz"){
                        if(checkBox.quiz){
                            return data;
                        }
                    }
                    if(data.status === "Incomplete"){
                        if(checkBox.status){
                            return data;
                        }
                    }

                }
                return null;
            } ).map(function(data) {
                console.log("rendering");
                return (

                    <Video data={data} moduleId={moduleId}/>

                )})
            }
    </Container>
   
    )
}