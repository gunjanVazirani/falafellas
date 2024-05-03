import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import './Certificates.css';
import api from "../../baseUrl";
import certiImg from '../../assets/Profile/foodCerti.png'
import silver from '../../assets/Profile/silver.png'
import gold from '../../assets/Profile/gold.png'

function Certificates() {
    const { userId } = useParams(); 
    const [certificates, setCertificates] = useState([]);
    const [activeTab, setActiveTab] = useState('certificates');
    const [medal, setMedal] = useState('');
    const [hasSilverMedal, setHasSilverMedal] = useState(false);
    const [hasGoldMedal, setHasGoldMedal] = useState(false);

    useEffect(() => {
        fetchCertificates();
    }, [userId]); 

    const fetchCertificates = async () => {
        try {
            const response = await api.post(`/users/add/rewards/${userId}`);
            setCertificates(response.data.reward);
            setMedal(response.data.medal);
            setHasSilverMedal(response.data.medal === 'silver');
            setHasGoldMedal(response.data.medal === 'gold');
        } catch (error) {
            console.error('Error fetching certificates:', error);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <>
            <Navbar expand="lg" className="justify-content-start navbar-second">
                <Nav className="flex-row navbar-second-elements">
                    <Nav.Link onClick={() => handleTabChange('certificates')} href="#certificates">Certificates</Nav.Link>
                    <Nav.Link onClick={() => handleTabChange('medals')} href="#medals" className="mx-5">Medals</Nav.Link>
                </Nav>
            </Navbar>

            {activeTab === 'certificates' && (
                <div className='custom-table'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Module Name</th>
                                <th scope="col">Certificates</th>
                            </tr>
                        </thead>
                        <tbody>
                            {certificates.map((certificate, index) => (
                                <tr key={index}>
                                    <td>{certificate.module_name}</td> 
                                    <td><img src={certiImg} alt="Certificate" /></td> 
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        {activeTab === 'medals' && (
            <div className='custom-table'>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Medal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {hasSilverMedal ? (
                                    <img src={silver} alt="Silver" />
                                ) : (
                                    <span>No Silver Medal. More modules to go...</span>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {hasGoldMedal ? (
                                    <img src={gold} alt="Gold" />
                                ) : (
                                    <span>No Gold Medal. More modules to go...</span>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )}

        </>
    );
}

export default Certificates;
