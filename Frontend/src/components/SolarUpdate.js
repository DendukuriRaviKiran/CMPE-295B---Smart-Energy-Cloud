import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom";
import sunImage from './images/sun_image.jpg';
import app_background from './images/app_background.jpg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
const SolarUpdate = ({APICode}) => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [value, setValue] = useState("");
    const [obj, setObj] = useState("");
    const [city, setCity] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [connectingID, setConnectingID] = useState("");
  
    const history = useHistory();
    const handleSubmit = (event) => {
      event.preventDefault();
    
      fetch(`http://127.0.0.1:5000/${APICode}/solarcreate`, {
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
          alert("Solar created successfully!");
          setName("");
          setId("");
          setValue("");
          setObj("");
          setCity("");
          history.push("/mainpage");
        })
        .catch((err) => {
          alert("Error creating Solar!");
          console.error(err);
        });
    };
    const handleBack = () => {
      history.push("/mainpage");
    };
  return (
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
    <h2 className="text-start mb-4">Create New Solar</h2>
    <Form onSubmit={handleSubmit}>
    <div class="col-sm-7">
    <Form.Group id="ID">
        <Form.Label>ID</Form.Label>
        <Form.Control
                type="text"
                id= "id"
                required
                placeholder="Enter Solar ID"
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
                id= "name"
                required
                placeholder="Enter Solar Name"
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
        <Form.Label>Location</Form.Label>
        <Form.Control
                type="text"
                id= "value"
                required
                placeholder="Enter Location of Solar"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
        </Form.Group>
    </div>
    <div class="col-sm-7">
        <Form.Group id="Value">
        <Form.Label>City</Form.Label>
        <Form.Control
                type="text"
                id= "city"
                required
                placeholder="Enter City where Solar is located"
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
          Create Solar
      </Button>
    </div>
    <div style={{ position: 'absolute', right: -200, top: 0, bottom: 0, float: 'right' }}>
      <img src={sunImage} alt="Card background" style={{ width: '90%', height: '90%', objectFit: 'cover',transform: 'rotate(4deg)'  }} />
    </div>
    </Form>
    </Card.Body>
    </Card>
    </div>
    </div>
  )
}

export default SolarUpdate