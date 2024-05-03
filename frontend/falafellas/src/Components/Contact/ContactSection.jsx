import React, {useRef, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./contact.css";
import {Col, Row} from "react-bootstrap";
import ContactInfo from "./ContactInfo";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ContactForm() {
    const form = useRef();
    const [name, setName] = useState("");
    const [recipient, setRecipient] = useState("");
    const [message, setMessage] = useState("");

    const formData = {
        name: name,
        recipient: recipient,
        message: message
    }

    const emailService = (e) => {
        e.preventDefault();
        
        const service_ID = "service_41vsdel";
        const template_ID = "template_02s8u88";
        const public_key = "uT01JHienkNiY7mGB";
       
        emailjs.send(service_ID, template_ID, formData, public_key)
        .then((result) => {
            toast.success("Message sent successfully!");

            // Clear the state after sending the email
            setName("");
            setRecipient("");
            setMessage("");

            // Reset the form fields
            if (form.current) {
                form.current.reset();
            }

        }, (error) => {
            toast.error("Failed to send the message, please try again.");
        });
    };
    return (
        <>
            <ToastContainer/>
            <Container className="mt-5 form" >
            <Row className="parent">
            <Col md={4} style={{"background":"#F26B37"}}>
                    <ContactInfo/>
                </Col>
                <Col md={8}>
                    <div className="inner-text">
                        <Form ref={form} onSubmit={emailService}>
                            <label className="form-title">Have any Questions?</label>
                            <Form.Group class="floating-label-group">
                                <input className="name" type="text" id="name" autocomplete="on" required onChange={(e) => setName(e.target.value)} />
                                <label for="name">Full Name</label>
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group class="floating-label-group">
                                    <input className="recipient" type="email" id="email" autocomplete="on" required onChange={(e) => setRecipient(e.target.value)} />
                                    <label for="email">Email</label>
                                    </Form.Group>
                                </Col>
                                <Col >
                                    <Form.Group class="floating-label-group">
                                    <input type="tel" id="name" autocomplete="on" required />
                                    <label for="phone">Phone</label>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group class="floating-label-group">
                                <textarea className="message" id="message" cols="40" rows="5" required onChange={(e) => setMessage(e.target.value)} ></textarea>
                                <label for="message">Write your message here ... </label>
                            </Form.Group>
                            <Button type="submit" className="submit-button-contact">Submit Message</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
        
    )
}
