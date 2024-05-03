import React, {useState} from 'react'
import profile from '../../assets/Profile/profile.jpg'
import { Container, Row, Col, Button, Form, Modal} from 'react-bootstrap'
import './UserProfile.css'
import { useParams } from 'react-router-dom'


function UserProfile() {
  const {userId} = useParams();
  const[isEditing, setIsEditing] = useState(false);
  const[bio, setBio] = useState("I'm a passionate food lover who believes the way to anyone's heart is through their stomach. I take joy in crafting sandwiches and I would make you a great falafel fellas. Let's make your meal a memorable one!");

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (event) => {
    setBio(event.target.value);
  };

  const handleDeleteProfile = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirmation = () => {
    // Perform delete action or show confirmation message
    // For now, just console log and close the modal
    setShowDeleteMessage(true);
    setShowDeleteConfirmation(false);
  };

  const handleCloseDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
  };

  const handleCloseDeleteMessage = () => {
    setShowDeleteMessage(false);
  };
  
  return (
    <>
      <Container fluid className='bg-img'>
        <Row className="align-items-center">
          <Col xs={12} md={5} lg={5} xl={3} className="profile-img">
            <img src={profile} alt="Avatar"/>
          </Col>
          <Col xs={12} md={7} lg={7} xl={9} className='bio-text'>

            <h3>Krisha Panchamia</h3>
            {isEditing ? (
              <div>
                {/* <p>{bio}</p> */}
                <Form.Control as="textarea" rows={3} value={bio} onChange={handleChange}/>
                <Button variant="secondary" className='editButton' onClick={handleSave}>Save</Button>
              </div>
            ) : (
              <div>
                <div>{bio}</div>
                <Button variant="secondary" className='editButton' onClick={handleEdit}>Edit Bio</Button>
                <Button variant="secondary" className='deleteButton' onClick={handleDeleteProfile}>Delete Profile</Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirmation} onHide={handleCloseDeleteConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your profile?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirmation}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Message Modal */}
      <Modal show={showDeleteMessage} onHide={handleCloseDeleteMessage}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Deleted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your account deletion request has been sent to admin.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteMessage}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default UserProfile;
