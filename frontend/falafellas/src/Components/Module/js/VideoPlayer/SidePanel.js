import React from "react";
import {Row,Col} from "react-bootstrap";
import thumbnail from "../../../../assets/Module/videothumbnail.png";
import {useNavigate} from "react-router-dom";

export default function SidePanel({item, id, moduleId, handleOnClickSidePanel}){
    const navigate = useNavigate();
    const content = {item};
    console.log(content.item.contentType);
    console.log("module id ", moduleId);
    /*function handleOnClick(){
        navigate(`/module/${moduleId}/video/${id}`)
    }*/

    return(
        <div>
            <Row className="sidepanel-row" onClick={()=>handleOnClickSidePanel(id, content.item.contentType)}>
                <Col sm={5}>
                    {!(content.item.contentType === "quiz") &&
                    <img src={thumbnail} alt="thumbnail" className="thumbnail" style={{ height: '5rem', width:"100%"}}></img>
                    }
                    </Col>
                <Col>
                    <Row>{`${content.item.title}`}</Row>
                    <Row>{`${content.item.time} mins`}</Row>
                </Col>
            </Row>
        </div>
    )
}