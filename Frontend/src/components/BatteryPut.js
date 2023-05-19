import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom";
import batteryImage from './images/battery_image_2.png';
import app_background from './images/app_background.jpg';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
const BatteryUpdate = ({APICode, Battery}) => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [value, setValue] = useState("");
    const [obj, setObj] = useState("");
    const [city, setCity] = useState("");
    const [batteryData, setBatteryData] = useState({});
    const history = useHistory();
    
    const Battery_URL = `http://127.0.0.1:5000/batteries/${APICode}`;

    useEffect(() => {
        async function fetchData(Battery) {
          const response1 = await axios.get(Battery_URL);
          const response_data = response1.data.find(
            (batteries) => batteries.id === Battery
          );
          setBatteryData(response_data);
        }
        fetchData(Battery);
      }, [Battery]);
    
    useEffect(() => {
        setName(batteryData.name);
        setId(batteryData.id);
        setValue(batteryData.value);
        setObj(batteryData.obj);
        setCity(batteryData.city);
      }, [batteryData]);

    const handleSubmit = (event) => {
      event.preventDefault();
  
      fetch(`http://127.0.0.1:5000/battery/${APICode}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, id, value, obj, city }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          alert("Battery updated successfully!");
          history.push("/mainpage");
        })
        .catch((err) => {
          alert("Error updating battery!");
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
                <h2 className="text-start mb-4">Update Battery</h2>
                <Form onSubmit={handleSubmit}>
                  <div class="col-sm-7">
                    <Form.Group id="ID">
                      <Form.Label>ID</Form.Label>
                      <Form.Control
                        type="text"
                        id="id"
                        placeholder={id}
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
                        placeholder={name}
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div class="col-sm-7">
                    <Form.Group id="Object ID">
                      <Form.Label>Object ID</Form.Label>
                      <Form.Control
                        type="text"
                        id="Object ID"
                        placeholder={obj}
                        required
                        value={obj}
                        onChange={(event) => setObj(event.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div class="col-sm-7">
                    <Form.Group id="Value">
                      <Form.Label>Current Capacity</Form.Label>
                      <Form.Control
                        type="text"
                        id="value"
                        placeholder={value}
                        required
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div class="col-sm-7">
                    <Form.Group id="City">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        id="city"
                        placeholder={city}
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
                  <div style={{ position: 'absolute', right: -190, top: 0, bottom: 0, float: 'right' }}>
                    <img src={batteryImage} alt="Card background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
    
      )
    }

export default BatteryUpdate;