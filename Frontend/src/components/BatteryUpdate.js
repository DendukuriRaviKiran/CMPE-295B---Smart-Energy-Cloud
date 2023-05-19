import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import batteryImage from './images/battery_image_2.png';
import app_background from './images/app_background.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
const BatteryUpdate = ({APICode}) => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [value, setValue] = useState("");
    const [obj, setObj] = useState("");
    const [city, setCity] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [connectingID, setConnectingID] = useState("");
    const history = useHistory();

    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
  
    async function handleLogout() {
      setError("");
      try {
        await logout();
        history.push("/login");
      } catch {
        setError("Failed to log out");
      }
    }

    const handleSubmit = (event) => {
      event.preventDefault();
  
      fetch(`http://127.0.0.1:5000/${APICode}/batterycreate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, id, value, obj, city }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          alert("Battery created successfully!");
          setName("");
          setId("");
          setValue("");
          setObj("");
          setCity("");
          history.push("/mainpage");
        })
        .catch((err) => {
          alert("Error creating battery!");
          console.error(err);
        });
    };
  const handleBack = () => {
      history.push("/mainpage");
    };
  return (
    <>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    height: '100%', 
                    width: '150px', 
                    backgroundColor: 'black' }}>
        <IconButton onClick={handleBack} 
                    style={{ 
                      color: 'white', 
                      position: 'absolute', 
                      top: '20px', 
                      left: '50px'}}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div>
        <Card className="rounded-10" style={{ width: '800px', margin: 'auto',backgroundImage: `url(${app_background})`, backgroundSize: 'cover' }}>
          <Card.Body>
            <h2 className="text-start mb-4">Create New Battery</h2>
            <Form onSubmit={handleSubmit}>
              <div class="col-sm-7">
                <Form.Group id="ID">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    id="id"
                    placeholder="Enter Battery ID"
                    required
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                  />
                </Form.Group>
              </div>
              <div class="col-sm-7">
                <Form.Group id="Name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    placeholder="Enter Battery Name"
                    required
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Form.Group>
              </div>
              <div class="col-sm-7">
                <Form.Group id="Object ID">
                  <Form.Label>Connecting ID</Form.Label>
                  <Form.Control
                    type="text"
                    id="Object ID"
                    placeholder="Enter Connecting ID of Battery"
                    required
                    value={obj}
                    onChange={(event) => setObj(event.target.value)}
                  />
                </Form.Group>
              </div>
              <div class="col-sm-7">
                <Form.Group id="Manufacturer">
                  <Form.Label>Manufacturer</Form.Label>
                  <Form.Control
                    type="text"
                    id="manufacturer"
                    placeholder="Enter Manufacturer of Battery"
                    required
                    value={manufacturer}
                    onChange={(event) => setManufacturer(event.target.value)}
                  />
                </Form.Group>
              </div>
              <div class="col-sm-7">
                <Form.Group id="Value">
                  <Form.Label>Current Capacity</Form.Label>
                  <Form.Control
                    type="text"
                    id="value"
                    placeholder="Enter Capacity of Battery"
                    required
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                  />
                </Form.Group>
              </div>
              <div class="col-sm-7">
                <Form.Group id="City">
                  <Form.Label>Building</Form.Label>
                  <Form.Control
                    type="text"
                    id="city"
                    placeholder="Enter Building where Battery is located"
                    required
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </Form.Group>
              </div>
              <div class="col-sm-7">
                <Form.Group id="TermsOfService">
                  <Form.Check
                    type="checkbox"
                    id="termsOfServiceCheckbox"
                    label="I agree to the Terms of Service"
                    required
                  />
                </Form.Group>
              </div>
              <div class="col-sm-8">
                <Button className="w-100 mt-3" type="submit">
                  Create Battery
                </Button>
              </div>
              <div style={{ position: 'absolute', right: -220, top: 0, bottom: 0, float: 'right' }}>
                <img src={batteryImage} alt="Card background" style={{ width: '90%', height: '90%', objectFit: 'cover' }} />
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
     <div style={{ 
      position: "absolute", 
      top: "10px", 
      right: "25px",
      color: "#fff", // Set text color to white
      background: "transparent" // Set card background to transparent
    }}>
      <Card style={{ background: "transparent" }}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {currentUser && (
            <>
              <strong style={{ marginRight: "10px" }}>UserName:</strong> {currentUser.email.split("@")[0]}
            </>
          )}
          <div className="d-flex justify-content-between w-100 mt-3">
            <Link to="/update-profile" className="btn btn-primary" style={{ marginRight: "10px" }}>
              Update Profile
            </Link>
            <Button variant="link" style={{ background: "#fff" }} onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
    </>
  )
}

export default BatteryUpdate;