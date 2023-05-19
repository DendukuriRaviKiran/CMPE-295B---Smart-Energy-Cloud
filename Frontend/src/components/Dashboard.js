import React, { useState ,useEffect} from "react";
import { Table,Card, Button, Alert, Form, Dropdown } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import WifiIcon from '@mui/icons-material/Wifi';
import WifiTwoToneIcon from '@mui/icons-material/WifiTwoTone';
import Wifi1Icon from '@mui/icons-material/SignalWifi1Bar';
import Wifi2Icon from '@mui/icons-material/SignalWifi2Bar';
import Wifi3Icon from '@mui/icons-material/SignalWifi3Bar';
import Wifi4Icon from '@mui/icons-material/SignalWifi4Bar';
export default function Dashboard({ setAPICode }) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [selectedOption, setSelectedOption] = useState("Option 1");

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function handleOptionChange(e) {
    setSelectedOption(e);
  }

  function handleSubmit() {
    setAPICode(selectedOption.split(" ").join(""));
    history.push("/mainpage");
  }
  
  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  }, [currentUser, history]);

  return (
    <>
      <div
        className="d-flex flex-column align-items-center mt-5"
        style={{
          margin: 0,
          color: "#fff",
          fontFamily: "Source Sans Pro,sans-serif",
          fontWeight: 400,
          fontSize: "0.8571428571428571rem",
          lineHeight: 1.5,
          backgroundColor: "#141b2d",
        }}
      >
        <h2 className="mt-5">Select Battery System</h2>
      <div className="d-flex flex-column align-items-center">
      <Table
      striped
      bordered
      hover
      className="mt-5"
      style={{
        width: "300%",
        tableLayout: "fixed",
        height: "400px",
      }}
    >
            <thead>
              <tr>
                <th style={{ color: "#fff",textAlign: "center" }}>Provider Name</th>
                <th style={{ color: "#fff",textAlign: "center"  }}>Provider ID</th>
                <th style={{ color: "#fff",textAlign: "center"  }}>Network</th>
                <th style={{ color: "#fff",textAlign: "center"  }}>Value 1</th>
                <th style={{ color: "#fff",textAlign: "center" }}>Value 2</th>
                <th style={{ color: "#fff",textAlign: "center"  }}>Submit</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ color: "#fff",textAlign: "center" }}>Provider 1</td>
              <td style={{ color: "#fff",textAlign: "center"  }}>ID001</td>
              <td style={{ textAlign: "center" }}>
                <Wifi2Icon color="action" />
              </td>
              <td style={{ color: "#fff",textAlign: "center"  }}>High</td>
              <td style={{ color: "#fff",textAlign: "center"  }}>Li-Ion</td>
              <td style={{ textAlign: "center" }}>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => handleSubmit("Option 1")}
                >
                  Submit
                </Button>
              </td>
            </tr>
            <tr>
              <td style={{color: "#fff",textAlign: "center"  }}>Provider 2</td>
              <td style={{ color: "#fff",textAlign: "center"  }}>ID002</td>
              <td style={{ textAlign: "center" }} >
                <Wifi1Icon color="action" />
              </td>
              <td style={{ color: "#fff",textAlign: "center" }}>Medium</td>
              <td style={{ color: "#fff",textAlign: "center" }}>Lead Acid</td>
              <td style={{ textAlign: "center" }}>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => handleSubmit("Option 2")}
                >
                  Submit
                </Button>
              </td>
            </tr>
            <tr>
              <td style={{color: "#fff",textAlign: "center" }}>Provider 3</td>
              <td style={{color: "#fff",textAlign: "center" }}>ID003</td>
              <td style={{ textAlign: "center" }}>
                <Wifi4Icon color="action" />
              </td>
              <td style={{color: "#fff",textAlign: "center" }}>Low</td>
              <td style={{ color: "#fff",textAlign: "center"  }}>Lithium Polymer</td>
              <td style={{ textAlign: "center" }}>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => handleSubmit("Option 3")}
                >
                  Submit
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      </div>
      <div style={{ 
      position: "absolute", 
      top: "10px", 
      right: "10px",
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
  );
}