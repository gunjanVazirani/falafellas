import React from 'react'
import AboutImage from './aboutimage.jpg'
import './../../../src/common.css';
import './LandingPage.css'



const About = () => {
    return (
        <div>
            <div className="landing-page">
                <div className="content-wrapper">
                    <div className="image-container">
                        <img src={AboutImage} alt="" />
                    </div>
                    <div className="text-container">
                        <h2>About</h2>
                        <p>Transforming Workplace Learning with Falafellas</p>
                        <p className="primary-text">
                            Our mission is to provide companies with the tools they need to
                            cultivate a culture of continuous learning and development.</p>
                        <p className="primary-text">
                            We believe that the onboarding process should be accessible and empowering.
                        </p>
                    </div>         
                </div>
            </div>
        </div>
    );
}

export default About;