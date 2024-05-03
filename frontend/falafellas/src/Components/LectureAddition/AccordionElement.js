/*
This code creates the Accordion component for our application.
================================
Author: Aditya Pattani
Last Updated: 03-04-2024
================================
*/

import { Accordion, Button } from 'react-bootstrap';

function AccordionElement({ addModule, modules, onClickItem }) {
  return (
    <div>
      <style>
        {`
          .accordion-button::after {
            display: none !important;
          }
        `}
      </style>
      <b style={{ marginLeft: "30px" }}>Modules:</b>
      <Accordion className="w-100 p-3">
        {modules.map((module) => (
          <Accordion.Item
            key={module.numeric_id}
            eventKey={module.numeric_id.toString()}
            className="w-100 p-3"
            onClick={() => onClickItem(module)}>
            <Accordion.Header><b style={{ fontSize: "18px" }}>{module.title}</b></Accordion.Header>
          </Accordion.Item>
        ))}
        <center>
          <Button onClick={addModule} className="w-75 submit-button-contact" style={{ marginTop: "20px", marginBottom: "40px" }}>
            + ADD A MODULE
          </Button>
        </center>
      </Accordion>
    </div>
  );
}

export default AccordionElement;
