import React,{useState} from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import MainPage from "./MainPage"
import ManageBattery from "./ManageBattery"
import ManageSolar from "./ManageSolar"
import BatteryUpdate from "./BatteryUpdate"
import SolarUpdate from "./SolarUpdate"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import DeleteIcon from '@mui/icons-material/Delete';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BatteryPut from "./BatteryPut";
import SolarPut from "./SolarPut";

function App() {
  const [Battery, setBattery] = useState('');
  const [Sol, setSol] = useState('');
  const [APICode, setAPICode] = useState('');
  const [theme, colorMode] = useMode();
  const [location, setLocation] = useState("");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <Route exact path="/" render={(props) => <Dashboard {...props} setAPICode={setAPICode} />} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route
              path="/mainpage"
              render={(props) => <MainPage {...props} setBattery={setBattery} setSol={setSol} APICode={APICode} setLocation={setLocation} location={location}/>}
              />
              <Route path="/battery" render={(props) => <ManageBattery {...props} Battery={Battery} APICode={APICode} location={location} />} />
              <Route path="/solar" render={(props) => <ManageSolar {...props} Sol={Sol} APICode={APICode} location={location} />} />
              <Route path="/batteryupdate" render={(props) => <BatteryUpdate {...props} APICode={APICode} />} />
              <Route path="/solarupdate" render={(props) => <SolarUpdate {...props} APICode={APICode} />} />
              <Route path="/battery" render={(props) => <ManageBattery {...props} Battery={Battery} APICode={APICode} />} />
              <Route path="/batteryput" render={(props) => <BatteryPut {...props} Battery={Battery} APICode={APICode} />} />
              <Route path="/solarput" render={(props) => <SolarPut {...props} Sol={Sol} APICode={APICode} />} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
      
    </Container>
    </ThemeProvider>
      </ColorModeContext.Provider>
  )
}

export default App
