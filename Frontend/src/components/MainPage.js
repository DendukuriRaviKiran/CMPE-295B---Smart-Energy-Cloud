import React, { useState,useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { Card, Button, Alert, Form, Dropdown } from "react-bootstrap";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { Tooltip } from "@mui/material";
import {Slider, Switch,ToggleButton, ToggleButtonGroup } from "@mui/material";

import { FaHome,FaSun ,FaSolarPanel} from "react-icons/fa";
import { IoMdBatteryCharging } from 'react-icons/io';
import { VscDashboard } from 'react-icons/vsc';
import { VscThreeBars } from 'react-icons/vsc';
import { Box,Typography, IconButton, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import UpdateIcon from '@mui/icons-material/RoomPreferences';
import StatBox from "./StatBox";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/BatteryChargingFull";
import Header from "./Header";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/SolarPower";
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import GridViewIcon from '@mui/icons-material/GridView';
import sjsumap from "./images/sjsu_map.jpg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import PowerIcon from '@mui/icons-material/Power';

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import UmbrellaIcon from '@mui/icons-material/Umbrella'; 

import axios from "axios";
import './Mainpage.css';
const data = [
    { name: "Battery 1", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Battery 2", uv: 3000, pv: 1398, amt: 2210 }
  ];


function MainPage({ setBattery, setSol, APICode,setLocation,location }) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedBattery, setSelectedBattery] = useState(null);
  const [selectedSolar, setSelectedSolar] = useState(null);
  const [batteries, setBatteries] = useState([]);
  const [solar, setSolar] = useState([]);
  const [list, setList] = useState("");
  const [admin, setAdmin] = useState(false);
  const [dashboard, setDashboard] = useState([]);
  const [selectedBatteryMap, setSelectedBatteryMap] = useState("");
  const [selectedBatteryID, setSelectedBatteryID] = useState("");
  const [selectedSolarMap, setSelectedSolarMap] = useState("");
  const [selectedSolarID, setSelectedSolarID] = useState("");
  const [BatteryName, setBatteryName] = useState("");
  const [SolarName, setSolarName] = useState("");
  const [mapLocationID, setMapLocationID] = useState("");
  const [solarCount, setSolarCount] = useState(0);
  const [batteryCount, setBatteryCount] = useState(0);
  const [batteryCountStatus, setBatteryCountStatus] = useState([]);
  const [solarCountStatus, setSolarCountStatus] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('April');
  const [selectedWeek, setSelectedWeek] = useState('1');
  const [selectedDay, setSelectedDay] = useState('1');
  const [selectedYear, setSelectedYear] = useState('2023');

  const API_URL = `http://127.0.0.1:5000/batteries/${APICode}`;
  const Solar_URL = `http://127.0.0.1:5000/solar/${APICode}`;
  const Admin_URL = "http://127.0.0.1:5000/admin_credentials";
  const Dashboard_URL = "http://127.0.0.1:5000/dashboard";
  const Battery_URL = `http://127.0.0.1:5000/batteries/${APICode}`;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  
  async function fetchData(a) {
    if (a === 0) {
      setSelectedTab("Manage Battery");
      const response = await axios.get(API_URL);
      setBatteries(response.data);
    } else if (a === 1) {
      setSelectedTab("Manage Solar");
      const response1 = await axios.get(Solar_URL);
      setSolar(response1.data);
      
    }
    else if (a === 2) {
      setSelectedTab("Dashboard");
      const response_1 = await axios.get(Dashboard_URL);
      setDashboard(response_1.data);
    }
  }

  async function handleSolarView(name) {
    setSelectedSolar(name)
    setSol(name);
    history.push("/solar");
  }

  async function handleBatteryView(name) {
    setSelectedBattery(name)
    setBattery(name);
    history.push("/battery");
  }

  async function handleBatteryPut(id){
    setSelectedBattery(id)
    setBattery(id);
    history.push("/batteryput");
  }

  async function handleSolarPut(id){
    setSelectedSolar(id)
    setSol(id);
    history.push("/solarput");
  }

  async function handleDelete(selection,id_value) {
    if(selection === 1){
        axios.delete(`http://127.0.0.1:5000/solar/${APICode}/${id_value}`)
    .then(response => {
      if (response.status === 200) {
        alert("Solar entry deleted successfully")
        console.log(`Solar entry with ID ${id_value} was successfully deleted`);
      } else {
        console.error('Error deleting solar entry with ID :', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error deleting solar entry with ID :', error);
    });
  }
  else if(selection === 0){
    axios.delete(`http://127.0.0.1:5000/battery/${APICode}/${id_value}`)
    .then(response => {
      if (response.status === 200) {
        alert("Battery entry deleted successfully")
        console.log(`Solar entry with ID ${id_value} was successfully deleted`);
      } else {
        console.error('Error deleting solar entry with ID :', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error deleting solar entry with ID :', error);
    });
  }
}
     
async function handleUpdate(b) {
  if (b === 0) {
    history.push("/batteryupdate");
  } else if (b === 1) {
    history.push("/solarupdate");
  }
}

  async function fetchList() {
    const response = await axios.get(Admin_URL);
    setList(response.data);
    
}
 fetchList();


useEffect(() => {
  async function handleMapSelect(c) {
    if (c != ""){
    const response1 = await axios.get(Battery_URL);
    const response_data = response1.data.find(
      (batteries) => batteries.id === c
        );
    setBatteryName(response_data.name);
    const response2 = await axios.get(Solar_URL);
    const solarData = response2.data.find(solar => solar.id === c);
    setSolarName(solarData.name);
    }
  
  } 
    handleMapSelect(mapLocationID);
}, [mapLocationID]);

useEffect(() => {
    setSelectedBatteryMap(BatteryName);
    setSelectedSolarMap(SolarName);
    setSelectedBatteryID(mapLocationID);
    setSelectedSolarID(mapLocationID);
}, [SolarName,BatteryName]);

 const [isSidebarOpen, setIsSidebarOpen] = useState(true);

 const toggleSidebar = () => {
   setIsSidebarOpen(!isSidebarOpen);
 };

 const [batteryStatus, setBatteryStatus] = useState(0);
 const [solarStatus, setSolarStatus] = useState(0);

 const handleToggle = (id,value) => {
  if(value === 1){
   setSolarStatus((prevStatus) => {
     return {
       ...prevStatus,
       [id]: !prevStatus[id],
     };
   });
  }
  else if(value === 0){
    setBatteryStatus((prevStatus) => {
      return {
        ...prevStatus,
        [id]: !prevStatus[id],
      };
    });
  }
 };


 useEffect(() => {
  setBatteryCount(batteryCount + 1);
}, [batteryCountStatus]);

useEffect(() => {
  setSolarCount(solarCount + 1);
}, [solarCountStatus]);


const updatedByList = ['davidhume3690', 'dhanush.babu', 'ritu.patil']; // replace with actual list of updaters
const lastUpdatedOnList = ['05-18-2023', '05-16-2023', '05-05-2023']; // replace with actual update dates

 const columns_battery = [
  { field: "id", headerName: "ID",flex: 0.8, },
  {
    field: "name",
    headerName: "Name",
    flex: 1.4,
    cellClassName: "name-column--cell",
  },
  {
    field: "value",
    headerName: "Current Capacity",
    flex: 1.4,
    cellClassName: "name-column--cell",
  },
  {
    field: "city",
    headerName: "Building",
    flex: 1.4,
  },  

  {
    field: "activate",
    headerName: "Activate",
    flex: 1.5,
    renderCell: ({ row }) => {
      const id = row.id;
      const status = batteryStatus[id] ? "on" : "off";
      return (
        <Slider
        value={status === "on" ? 1 : 0}
        onChange={() => handleToggle(id, 0)}
        sx={{
          color: status === "on" ? colors.greenAccent[300] : colors.grey[700],
          width: "40%",
          height:"12px",
          margin: "1 auto",
        }}
        marks={[ { value: 0,label: "OFF",},{ value: 1,label: "ON",}, ]}
        step={1}
        min={0}
        max={1}
      />
      );
    },
  },

  {
    field: "analytics",
    headerName: "View Analytics",
    flex: 2.1,
    renderCell: ({ row }) => {
      return (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.greenAccent[700]}
          borderRadius="4px"
          onClick={() => handleBatteryView(row.id)}
        >
          <AnalyticsIcon  />
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            View Analytics
          </Typography>
        </Box>
      );
    },
  },
  currentUser && currentUser.email === list && (
  {
    field: "update",
    headerName: "Update Battery",
    flex: 2.1,
    renderCell: ({ row }) => {
      return (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.blueAccent[600]}
          borderRadius="4px"
          onClick={() => handleBatteryPut(row.id)}
        >
          <UpdateIcon />
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            Update Battery
          </Typography>
        </Box>
      );
    },
  }),
   currentUser && currentUser.email === list && (
  {
    field: "delete",
    headerName: "Delete Storage",
    flex: 2.1,
    renderCell: ({ row }) => {
      return (
        <Box
          width="100%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.redAccent[600]}
          borderRadius="4px"
          onClick={() => handleDelete(0,row.id)}
        >
          <DeleteIcon/>
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            Delete Storage
          </Typography>
        </Box>
      );
    },
  }),
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: ({ row }) => {
      const icon =
        row.status === "1" ? (
          <CheckCircleIcon sx={{ marginLeft: "10px",backgroundColor: "transparent" }} />
        ) : (
          <ErrorIcon sx={{ marginLeft: "10px",backgroundColor: "transparent" }} />
        );
      if (row.status === "1") {
        setBatteryCountStatus(row);
      }
        return (
      <Tooltip
        title={row.status === "1" ? "Working well" : "Error"}
        placement="right"
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {row.status === "1" ? (
            <span style={{ color: "#70d8bd" }}>{icon}</span>
          ) : (
            <span style={{ color: "#e2726e" }}>{icon}</span>
          )}
        </div>
      </Tooltip>
      );
    },
  },
  {
    field: "updatedBy",
    headerName: "Updated By",
    flex: 1.3,
    valueGetter: (params) => updatedByList[params.row.id % updatedByList.length],
  },  
  {
    field: "lastUpdatedOn",
    headerName: "Last Updated on",
    flex: 1.3,
    valueGetter: (params) => lastUpdatedOnList[params.row.id % lastUpdatedOnList.length],
  }, 
];

const columns_solar = [
  { field: "id", headerName: "ID",flex: 0.8, },
  {
    field: "name",
    headerName: "Name",
    flex: 1.2,
    cellClassName: "name-column--cell",
  },
  {
    field: "value",
    headerName: "Location",
    flex: 1.2,
    cellClassName: "name-column--cell",
  },
  {
    field: "city",
    headerName: "Building",
    flex: 1.2,
  },

  {
    field: "activate",
    headerName: "Activate",
    flex: 1.3,
    renderCell: ({ row }) => {
      const id = row.id;
      const status = solarStatus[id] ? "on" : "off";
      return (
        <Slider
        value={status === "on" ? 1 : 0}
        onChange={() => handleToggle(id, 1)}
        sx={{
          color: status === "on" ? colors.greenAccent[300] : colors.grey[700],
          width: "40%",
          height:"12px",
          margin: "1 auto",
        }}
        marks={[ { value: 0,label: "OFF",},{ value: 1,label: "ON",}, ]}
        step={1}
        min={0}
        max={1}
      />
      );
    },
  },
  
  {
    field: "analytics",
    headerName: "View Analytics",
    flex: 1.6,
    renderCell: ({ row }) => {
      return (
        <Box
          width="110%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.greenAccent[700]}
          borderRadius="4px"
          onClick={() => handleSolarView(row.id)}
        >
          <AnalyticsIcon  />
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            View Analytics
          </Typography>
        </Box>
      );
    },
  },

  currentUser && currentUser.email === list && (
    {
      field: "update",
      headerName: "Update Solar",
      flex: 1.6,
      renderCell: ({ row }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.blueAccent[600]}
            borderRadius="4px"
            onClick={() => handleSolarPut(row.id)}
          >
            <UpdateIcon />
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              Update Solar
            </Typography>
          </Box>
        );
      },
    }),

  currentUser && currentUser.email === list && (
  {
    field: "delete",
    headerName: "Delete Solar",
    flex: 1.6,
    renderCell: ({ row }) => {
      return (
        <Box
          width="105%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.redAccent[600]}
          borderRadius="4px"
          onClick={()=>handleDelete(1,row.id)}
        >
          <DeleteIcon/>
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
            Delete Solar
          </Typography>
        </Box>
      );
    },
  }),
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: ({ row }) => {
      const icon =
        row.status === "1" ? (
          <CheckCircleIcon sx={{marginLeft:"10px", backgroundColor: "transparent" }} />
        ) : (
          <ErrorIcon sx={{marginLeft:"10px", backgroundColor: "transparent" }} />
        );

        if (row.status === "1") {
          setSolarCountStatus(row);
        }
        
      return (
        <Tooltip
        title={row.status === "1" ? "Working well" : "Error"}
        placement="right"
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {row.status === "1" ? (
            <span style={{ color: "#70d8bd" }}>{icon}</span>
          ) : (
            <span style={{ color: "#e2726e" }}>{icon}</span>
          )}
        </div>
      </Tooltip>
      );
    },
  },
  {
    field: "updatedBy",
    headerName: "Updated By",
    flex: 1.3,
    valueGetter: (params) => updatedByList[params.row.id % updatedByList.length],
  },  
  {
    field: "lastUpdatedOn",
    headerName: "Last Updated on",
    flex: 1.3,
    valueGetter: (params) => lastUpdatedOnList[params.row.id % lastUpdatedOnList.length],
  }, 
];


const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = '8c245e5ce73940778cf34239230204'; // Replace with your WeatherAPI.com API key
  const CITY_NAME = 'San Jose'; // Replace with your city name

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY_NAME}&aqi=no`
        );

        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);


const handleMapLocation = (id) => {
  setMapLocationID(id);
  if(id === "1"){
    setLocation("MLK Library");
  }
  else if(id === "2"){
    setLocation("Hugh Gillis Hall");
  }
  else if(id === "3"){
    setLocation("Dudley Moorhead Hall");
  }
  else if(id === "4"){
    setLocation("Administration Building");
  }
  else if(id === "5"){
    setLocation("Engineering Building");
  }
  else if(id === "6"){
    setLocation("Historic Tower Hall");
  }
  else if(id === "7"){
    setLocation("Engineering Building");
  }
  else if(id === "8"){
    setLocation("Engineering Building");
  }
  else if(id === "9"){
    setLocation("Engineering Building");
  }
  else if(id === "10"){
    setLocation("Engineering Building");
  }
  else if(id === "11"){
    setLocation("Engineering Building");
  }
  else if(id === "12"){
    setLocation("Engineering Building");
  }
  else if(id === "13"){
    setLocation("Engineering Building");
  }
  else if(id === "14"){
    setLocation("Engineering Building");
  }
  else if(id === "15"){
    setLocation("Engineering Building");
  }
 };

  return (
    <>
     <div>
        <div>
          <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
            <VscThreeBars style={{ color: "#17a2b8", marginRight: "10px" }} />
            {isSidebarOpen ? "Menu" : "Menu"}
          </button>
        </div>
        <div className={`sidebar ${isSidebarOpen ? "" : "hidden"}`}>
          <button className={`sidebar-btn dashboard-btn ${
            selectedTab === "Dashboard" ? "selected" : ""
          }`} onClick={() => fetchData(2)}>
            <GridViewIcon style={{ color: "#17a2b8", marginRight: "10px" }} /> Dashboard
          </button>
          <button className={`sidebar-btn battery-btn ${
            selectedTab === "Manage Battery" ? "selected" : ""
          }`} onClick={() => fetchData(0)}>
          <BatteryChargingFullIcon style={{ color: "#17a2b8" ,marginRight: "5px", fontSize: "18px" }} />{" "} Manage Battery
          </button>
          <button className={`sidebar-btn solar-btn ${
            selectedTab === "Manage Solar" ? "selected" : ""
          }`} onClick={() => fetchData(1)}>
            <FaSolarPanel style={{ color: "#17a2b8", marginRight: "5px" }} /> {" "} Manage Solar
          </button>
          
        { currentUser && currentUser.email === list && 
          <button class="btn btn-success" style={{ marginTop:"10px" }} onClick={()=>handleUpdate(0)}>Add new Battery</button>
        }
        {currentUser && currentUser.email === list &&
        <button class="btn btn-warning"  style={{ marginTop:"30px" }} onClick={()=>handleUpdate(1)}>Add new Solar</button>
        }
        </div>
      {(selectedTab === "") ? (  
        <div className="map_sjsu">
          <img src={sjsumap} alt="image-description" />
          <LocationOnIcon sx={{ color: "#e6cc00" }} className="map_icon_1" onClick={()=>handleMapLocation(String(1))}/>
          <LocationOnIcon className="map_icon_2" onClick={()=>handleMapLocation(String(2))}/>
          <LocationOnIcon className="map_icon_3" onClick={()=>handleMapLocation(String(3))}/>
          <LocationOnIcon className="map_icon_4" onClick={()=>handleMapLocation(String(4))}/>
          <LocationOnIcon sx={{ color: "#e6cc00" }}className="map_icon_5" onClick={()=>handleMapLocation(String(5))}/>
          <LocationOnIcon className="map_icon_6" onClick={()=>handleMapLocation(String(6))}/>
          <LocationOnIcon className="map_icon_7" onClick={()=>handleMapLocation(String(7))}/>
          <LocationOnIcon className="map_icon_8" onClick={()=>handleMapLocation(String(8))}/>
          <LocationOnIcon className="map_icon_9" onClick={()=>handleMapLocation(String(9))}/>
          <LocationOnIcon className="map_icon_10" onClick={()=>handleMapLocation(String(10))}/>
          <LocationOnIcon className="map_icon_11" onClick={()=>handleMapLocation(String(11))}/>
          <LocationOnIcon className="map_icon_12" onClick={()=>handleMapLocation(String(12))}/>
          <LocationOnIcon className="map_icon_13" onClick={()=>handleMapLocation(String(13))}/>
          <LocationOnIcon className="map_icon_14" onClick={()=>handleMapLocation(String(14))}/>
          <LocationOnIcon className="map_icon_15" onClick={()=>handleMapLocation(String(15))}/>
          <div style={{ 
            position: "absolute",
            right:"-550px"
            }}>
            <Card style={{ backgroundColor: "white" , height:"450px",width:"370px"}}>
            <Card.Header style={{ backgroundColor: "black", color: "white",height: "60px"  }}>
              <Header subtitle={location !== "" ? `Grid Elements in ${location}` : "Grid Elements in the Selected Location"} />
            </Card.Header>
            <Card.Body>
            {(selectedBatteryMap === "") ? (
                  <Typography
                  marginTop="140px"
                  marginLeft="80px"
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[700]}
                >
                Select a location in the Map
                </Typography>
            ):null }
            {(selectedBatteryMap != "") ? (
              
              <Card style={{ backgroundColor: "#034694", marginTop:"25px",marginBottom: "60px" }}>
                <Typography
                  marginTop="10px"
                  marginLeft="10px"
                  variant="h5"
                  fontWeight="600"
                  color="white"
                >
                 Battery:
                </Typography>
                
                <Card.Body style={{ height: "90px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <PowerIcon style={{ marginRight: "10px",marginLeft:"5px",color:"white" }} />
                  {selectedBatteryID && (selectedBatteryID === "1" || selectedBatteryID === "5") ? (
                    <Typography
                    variant="h5"
                    fontWeight="600"
                    marginRight="10px"
                    color="yellow"
                  >
                    {selectedBatteryMap}
                  </Typography>
                  ) : (
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    marginRight="10px"
                    color={colors.greenAccent[400]}
                  >
                    {selectedBatteryMap}
                  </Typography>
                  )}
                  <Button
                    variant="link"
                    style={{
                      background: "#ffc107",
                      fontSize: "11px",
                      display: "flex",
                      alignItems: "center",
                      transition: "opacity 0.5s ease-in-out",
                      textDecoration: "none",
                      color: "black",
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                    onMouseLeave={(e) => e.target.style.opacity = "1"}
                    onClick={() => handleBatteryView(selectedBatteryID)}
                  >
                    View More
                  </Button>
                </Card.Body>
              </Card>
              ) : null }
              {(selectedSolarMap != "") ? (
              <Card style={{ backgroundColor: "#034694"}}>
              <Typography
                marginTop="10px"
                marginLeft="10px"
                variant="h5"
                fontWeight="600"
                color="white"
              >
                Solar:
              </Typography>
              <Card.Body style={{ height: "90px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <SolarPowerIcon style={{ marginRight: "10px",marginLeft:"5px",color:"white" }} />
                <Typography
                  variant="h5"
                  fontWeight="600"
                  marginRight="10px"
                  color={colors.greenAccent[400]}
                >
                  {selectedSolarMap}
                </Typography>
                <Button
                  variant="link"
                  style={{
                    background: "#ffc107",
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                    transition: "opacity 0.5s ease-in-out",
                    textDecoration: "none",
                    color: "black",
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                  onMouseLeave={(e) => e.target.style.opacity = "1"}
                  onClick={() => handleSolarView(selectedSolarID)}
                >
                  View More
                </Button>
              </Card.Body>
            </Card>
            ) : null }
            </Card.Body>
            </Card>
          </div>
        </div>
      ) : null}
      {(selectedTab === "Dashboard") && dashboard && dashboard.new_clients && weatherData ? (
       <Box m="-300px">
       {/* HEADER */}
       <Box display="flex" justifyContent="space-between" alignItems="center">
         <Box display="flex" alignItems="center" pt="20px">
          <Header title="DASHBOARD" subtitle="Welcome to your Grid dashboard" />
          <div style={{ marginLeft: '20px' }}>
            <select
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div style={{ marginLeft: '20px' }}>
            <select
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
          <div style={{ marginLeft: '20px' }}>
            <select
              value={selectedMonth}
              onChange={(event) => setSelectedWeek(event.target.value)}
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              <option value="1">1st week</option>
              <option value="2">2nd week</option>
              <option value="3">3rd week</option>
              <option value="4">4th week</option>
            </select>
          </div>
          <div style={{ marginLeft: '20px' }}>
            <select
              value={selectedMonth}
              onChange={(event) => setSelectedDay(event.target.value)}
              style={{ backgroundColor: 'black', color: 'white' }}
            >
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
              <option value="5">5th</option>
              <option value="6">6th</option>
              <option value="7">7th</option>
            </select>
          </div>
         </Box>
       </Box>
 
       {/* GRID & CHARTS */}
       <Box
         display="grid"
         gridTemplateColumns="repeat(12, 1fr)"
         gridAutoRows="140px"
         gap="20px"
       >
         {/* ROW 1 */}
         <Box
           gridColumn="span 3"
           backgroundColor={colors.primary[400]}
           display="flex"
           alignItems="center"
           justifyContent="center"
         >
           <StatBox
             title={dashboard.total_storage_consumption.total[selectedMonth]}
             subtitle="Total Storage Consumption"
             progress={dashboard.total_storage_consumption.progress[selectedMonth]}
             increase={dashboard.total_storage_consumption.increase[selectedMonth]}
             icon={
               <EmailIcon
                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
               />
             }
           />
         </Box>
        
         <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={weatherData.current.temp_c + "°C"}
              subtitle="Current Weather"
              progress={dashboard.new_clients.progress}
              increase={dashboard.new_clients.increase}
              icon={
                weatherData.current.condition.text.toLowerCase() === "sun" ? (
                  <WbSunnyIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                ) : weatherData.current.condition.text.toLowerCase().includes("rain") ? (
                  <UmbrellaIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                ) : (
                  <CloudIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                )
              }
            />
          </Box>
         <Box
           gridColumn="span 3"
           backgroundColor={colors.primary[400]}
           display="flex"
           alignItems="center"
           justifyContent="center"
         >
           <StatBox
             title={dashboard.total_energy_generation.total[selectedMonth]}
             subtitle="Total Energy Generation"
             progress={dashboard.total_energy_generation.progress[selectedMonth]}
             increase={dashboard.total_energy_generation.increase[selectedMonth]}
             icon={
               <TrafficIcon
                 sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
               />
             }
           />
         </Box>
 
         {/* ROW 2 */}
         <Box
           gridColumn="span 8"
           gridRow="span 2"
           backgroundColor={colors.primary[400]}
         >
           <Box
             mt="20px"
             p="0 30px"
             display="flex "
             justifyContent="space-between"
             alignItems="center"
           >
             <Box>
               <Typography
                 variant="h5"
                 fontWeight="600"
                 color={colors.grey[100]}
               >
                 Storage Consumption
               </Typography>
               
             </Box>
           </Box>
           <Box height="250px" m="-20px 0 0 0">
             <LineChart isDashboard={true} selectedYear={selectedYear}/>
           </Box>
         </Box>
         
         <Box
           gridColumn="span 4"
           gridRow="span 2"
           backgroundColor={colors.primary[400]}
         >
           <Typography
             variant="h5"
             fontWeight="600"
             sx={{ padding: "30px 30px 0 30px" }}
             color={colors.grey[300]}
           >
             Energy Generation
           </Typography>
           <Box height="250px" mt="-40px">
             <BarChart isDashboard={true} />
           </Box>
         </Box>
         
       </Box>
     </Box>
      ) : null}
      {selectedTab === "Manage Solar" ? (
          <Box m="-350px">
            <Box display="flex" alignItems="center" pt="20px">
            <Header
              title="Manage Solar"
              subtitle="List of Solar Devices and their details" 
            />
             <Box
              ml="20px"
              pt="10px"
              pb="5px"
              pl="10px"
              pr="10px"
              bgcolor={colors.blueAccent[700]}
              color={colors.greenAccent[300]}
              borderRadius="5px"
            >
              <Typography variant="h6">Total Active Solar</Typography>
              <Typography variant="h4">{solarCount}</Typography>
            </Box>
            </Box>
          <Box
            m="80px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
            }}
          >
            <DataGrid checkboxSelection={false} rows={solar} columns={columns_solar} />
          </Box>
        </Box>
      ) : null}
      {selectedTab === "Manage Battery" ? (
        
       <Box m="-350px">
    
            <Box display="flex" alignItems="center" pt="20px">
              <Header
                title="Energy Source"
                subtitle="List of Energy Sources and their details" 
              />
              <Box
                ml="20px"
                pt="10px"
                pb="5px"
                pl="10px"
                pr="10px"
                bgcolor={colors.blueAccent[700]}
                color={colors.greenAccent[300]}
                borderRadius="5px"
              >
                <Typography variant="h6">Total Active Battery</Typography>
                <Typography variant="h4">{batteryCount}</Typography>
              </Box>
            </Box>
      <Box
        m="80px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection={false} rows={batteries} columns={columns_battery} />
      </Box>
    </Box>
        
      ) : null}
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

export default MainPage;