import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import "./ManageSolar.css";
import { tokens } from "../theme";
import { render } from 'react-dom'
import Thermometer from 'react-thermometer-component'
import Speedometer from 'react-d3-speedometer'
import { Grid } from '@mui/material'
import { Card, Button, Alert, Form, Dropdown } from "react-bootstrap";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ResponsiveLine } from '@nivo/line';


const ManageSolar = ({ Sol,APICode,location }) => {
  const [solarData, setSolarData] = useState({});
  const Solar_URL = `http://127.0.0.1:5000/solar/${APICode}`;

  const [solarLevel, setSolarLevel] = useState(0);
  const [solarTemperature, setSolarTemperature] = useState(0);
  const [solarASI, setSolarASI] = useState(0);
  const [chargeRate, setChargeRate] = useState(0);
  const [dischargeRate, setDischargeRate] = useState(0);
  const [CalenderView,setCalenderView] = useState(false);
  const [GraphView,setGraphView] = useState(false);
  const Battery_URL = `http://127.0.0.1:5000/batteries/${APICode}`;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [value, setValue] = useState(new Date());
  const [day, setDay] = useState(value.getDate());
  const [month, setMonth] = useState(value.getMonth() + 1);
  const [year, setYear] = useState(value.getFullYear());
  const [timeValue, setTimeValue] = useState('');
  


  useEffect(() => {
  async function fetchData(Sol) {
    
      const response1 = await axios.get(Solar_URL);
      const solarData = response1.data.find(solar => solar.id === Sol);
      setSolarData(solarData);
      console.log(solarData);
    }
    fetchData(Sol);
}, [Sol]);

useEffect(() => {
  setSolarLevel(solarData.current_stored_capacity);
  setSolarTemperature(solarData.temperature);
  setSolarASI(solarData.asi);
  setChargeRate(solarData.charge_rate);
  setDischargeRate(solarData.discharge_rate);
}, [solarData]);

function getLiquidColorClass(level) {
  if (level >= 0 && level < 40) {
    return "gradient-color-red";
  } else if (level >= 40 && level < 70) {
    return "gradient-color-orange";
  } else {
    return "gradient-color-green";
  }
}

const onChange = (date) => {
  setValue(date);
  setDay(date.getDate());
  setMonth(date.getMonth() + 1);
  setYear(date.getFullYear());
};

useEffect(() => {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  setTimeValue(`${hours}:${minutes}`);
}, []);

const onTimeChange = (event) => {
  setTimeValue(event.target.value);
};


const allTemperatureData = {
  '2023-01': [
    { date: '2023-01-01', value: 20 },
    { date: '2023-01-02', value: 22 },
    // ... more data points for January
  ],
  '2023-02': [
    { date: '2023-02-01', value: 100 },
    { date: '2023-02-02', value: 80 },
    // ... more data points for February
  ],
};

const allPowerData = {
  '2023-01': [
    { date: '2023-01-01', setpoint: 50, chargeRate: 30, dischargeRate: 20 },
    { date: '2023-01-02', setpoint: 45, chargeRate: 28, dischargeRate: 22 },
    // ... more data points for January
  ],
  '2023-02': [
    { date: '2023-02-01', setpoint: 48, chargeRate: 29, dischargeRate: 21 },
    { date: '2023-02-02', setpoint: 44, chargeRate: 27, dischargeRate: 23 },
    // ... more data points for February
  ],
};


const [selectedMonth, setSelectedMonth] = useState('2023-01');
const [temperatureData, setTemperatureData] = useState(allTemperatureData[selectedMonth]);
const [powerData, setPowerData] = useState(allPowerData[selectedMonth]);

const handleMonthChange = (e) => {
  const newSelectedMonth = e.target.value;
  setSelectedMonth(newSelectedMonth);
  setTemperatureData(allTemperatureData[newSelectedMonth]);
  setPowerData(allPowerData[newSelectedMonth]);
};

const temperatureChartData = [
  {
    id: 'Temperature',
    data: temperatureData.map(d => ({ x: d.date, y: d.value })),
  },
];

const powerChartData = [
  {
    id: 'Present Power Setpoint (KW)',
    data: powerData.map(d => ({ x: d.date, y: d.setpoint })),
  },
  {
    id: 'Charge Rate (KW)',
    data: powerData.map(d => ({ x: d.date, y: d.chargeRate })),
  },
  {
    id: 'Discharge Rate (KW)',
    data: powerData.map(d => ({ x: d.date, y: d.dischargeRate })),
  },
];



  return (
    <div>
      {solarData && solarData.name ? (
    
      <div>
      
      <Box m="-300px">
      <Header
        title={`Manage Solar - ${solarData.name} at ${location}`}
        subtitle={`Detailed Analytics for Object ID: ${solarData.obj}`}
      />
      <Box display="grid" gridAutoRows="285px"
     gap="185px" gridTemplateColumns="repeat(4, 2fr) repeat(8, 1fr)" gap={1}>
        <Box gridColumn="span 4" m="0 -400px 0 50px">
          <section className="battery">
            <div className="battery__card">
              <div className="battery__data">
                <p className="battery__text">{"Energy Production Efficiency (%)"}</p>
                <h1 className="battery__percentage">{`${solarLevel}%`}</h1>
              </div>
              <div className="battery__pill">
                <div className="battery__level">
                  <div
                    className={`battery__liquid ${getLiquidColorClass(
                      solarLevel
                    )}`}
                    style={{ height: `${solarLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </Box>
        <Box gridColumn="span 8" m="-200 -100 -100 100px">
          <section className="battery">
            <div className="battery_card_new">
            <div className="battery__data">
                <p className="battery__text">{"Panel Temperture (°C)"}</p>
                <h1 className="battery__percentage">{`${solarTemperature} C`}</h1>
              </div>
                  <Thermometer
                    theme="dark"
                    value={solarTemperature}
                    max="100"
                    steps="3"
                    format="°C"
                    
                    height="200"
                  />
            </div>
          </section>    
        </Box>
      </Box>
    <Box
      gridColumn="span 20"
      gridRow="span 20"
      justifyContent="center"
      m="100 -100 -100 -100px"
    >
      <section className="battery">
      <div className="battery_card_speed" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap'}}>
        <div style={{margin: '10px', textAlign: 'center'}}>
          <Speedometer
            value={solarASI}
            minValue={0}
            maxValue={50}
            segments={5}
            segmentColors={['#CCFFCC','#99FF99', '#66FF66','#00FF00', '#33FF33']}
            height={150}
            width={150}
            label="Voltage"
            labelFontSize={10}
            labelStyle={{ color: 'white', fontFamily: 'sans-serif' }}
          />
          <p className="battery__text_speed">Average Solar Irradiance(KWH)</p>
        </div>
        <div style={{margin: '10px', textAlign: 'center'}}>
          <Speedometer
            value={chargeRate}
            minValue={-20}
            maxValue={20}
            segments={5}
            segmentColors={['#A6E1FF','#63C7FF','#00A2FF','#006FCC','#004D99']}
            height={150}
            width={150}
            label="Charge Rate"
            labelFontSize={10}
            labelStyle={{ color: 'white', fontFamily: 'sans-serif' }}
          />
          <p className="battery__text_speed">Charging rate(kW)</p>
        </div>
        <div style={{margin: '10px', textAlign: 'center'}}>
          <Speedometer
            value={dischargeRate}
            minValue={-20}
            maxValue={20}
            segments={5}
            segmentColors={['#FFA6A6','#FF6363','#FF0000','#CC0000','#990000']}
            height={150}
            width={150}
            label="Discharge Rate"
            labelFontSize={10}
            labelStyle={{ color: 'white', fontFamily: 'sans-serif' }}
          />
          <p className="battery__text_speed">Discharging Rate (kW)</p>
          
        </div>
      </div>
      </section>  
    </Box>
  </Box>
      <div style={{ 
            position: "absolute", 
            top: "10px", 
            right: "40px",
            color: "#fff", // Set text color to white
            background: "transparent" // Set card background to transparent
          }}>
            <Card style={{ background: "transparent" }}>
              <Card.Body>
                <div className="d-flex justify-content-center w-100 mt-3">
                <Button variant="link" style={{ background: "#28a745", color: "white", textDecoration: "none", marginRight: "10px" }} onClick={() => {
                    setCalenderView(!CalenderView);
                    setGraphView(false);
                  }}>
                    Calender View
                  </Button>
                  <Button variant="link" style={{ background: "#007bff", color: "white", textDecoration: "none" }} onClick={() => {
                    setGraphView(!GraphView);
                    setCalenderView(false);
                  }}>
                    Graph View
                  </Button>
                </div>
              </Card.Body>
            </Card>
            {CalenderView === true && GraphView === false ? (
              <div className="calendar-container">
                <Calendar value={value} onChange={onChange} />
                <div className="selected-date">
                  <p>Selected Date: {`${day}-${month}-${year}`}</p>
                </div>
                <div className="time-input">
                  <input type="time" value={timeValue} onChange={onTimeChange} />
                </div>
              </div>
            ):(
              <p> </p>
            )}
            {GraphView === true && CalenderView === false ? (
              <div className="graph-container">
              <div className="month-selector">
                <label htmlFor="month-select">Choose a month:</label>
                <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
                  <option value="2023-01">January 2023</option>
                  <option value="2023-02">February 2023</option>
                </select>
              </div>
              <div className="line-chart" style={{ height: '250px' , width: '350px'}}>
                <ResponsiveLine
                  data={temperatureChartData}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Date',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    tickColor: 'white', // Add this line to make the tick text white
                    legendTextColor: 'white', 
                    
                  }}
                  axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Temperature',
                    legendOffset: -40,
                    legendPosition: 'middle',
                    tickColor: 'white', // Add this line to make the tick text white
                    legendTextColor: 'white', // Add this line to make the legend text white
                    
                  }}
                  colors={{ scheme: 'category10' }}
                  lineWidth={2}
                  pointSize={10}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  enableArea={false}
                  enableGridX={false}
                  enableGridY={false}
                  theme={{
                    axis: {
                      ticks: {
                        text: {
                          fill: 'white', // Make tick text white
                        },
                      },
                      legend: {
                        text: {
                          fill: 'white', // Make legend text white
                        },
                      },
                    },
                    grid: {
                      line: {
                        stroke: 'white', // Make grid lines white
                      },
                    },
                  }}
                  legends={[
                    {
                      itemTextColor: 'white',
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: 'left-to-right',
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: 'circle',
                      symbolBorderColor: 'rgba(0, 0, 0, .5)',
                      effects: [
                        {
                          on: 'hover',
                          style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                />
              </div>
              <div className="line-chart" style={{ height: '250px',width:'350px' }}>
                <ResponsiveLine
                  data={powerChartData}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60}}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      orient: 'bottom',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'Date',
                      legendOffset: 36,
                      legendPosition: 'middle',
                    }}
                    axisLeft={{
                      orient: 'left',
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: 'Power (KW)',
                      legendOffset: -40,
                      legendPosition: 'middle',
                    }}
                    colors={{ scheme: 'category10' }}
                    lineWidth={2}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    enableArea={false}
                    enableGridX={false}
                    enableGridY={false}
                    theme={{
                      axis: {
                        ticks: {
                          text: {
                            fill: 'white', // Make tick text white
                          },
                        },
                        legend: {
                          text: {
                            fill: 'white', // Make legend text white
                          },
                        },
                      },
                      grid: {
                        line: {
                          stroke: 'white', // Make grid lines white
                        },
                      },
                    }}
                    legends={[
                      {
                        itemTextColor: 'white',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                          {
                            on: 'hover',
                            style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1,
                            },
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
              ) : (
                <p> </p>
              )}
        </div>
  </div>

      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ManageSolar;