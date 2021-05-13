import "./App.css";
import Login from "./components/login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import AppDrawer from "./components/AppDrawer";
import Diet from "./components/Diet";
import Devices from "./components/Devices";

import React, { useState, createContext } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grid, CssBaseline } from "@material-ui/core";

import ProtectedRoute from "./components/ProtectedRoute";
import AuthContextProvider from "./contexts/AuthContext";
import AppHeader from "./components/AppHeader";
import BluetoothDeviceContextProvider from "./contexts/BluetoothDeviceContext";

export const AppContext = createContext("");

function App() {
	// const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [drawerOpen, setIsDrawerOpen] = useState(false);

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};
	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	return (
		<AppContext.Provider value={{ handleDrawerOpen }}>
			{/* <Router> */}
			<AuthContextProvider>
				<CssBaseline />

				<Grid container direction='column'>
					<BluetoothDeviceContextProvider>
						<AppHeader />
					</BluetoothDeviceContextProvider>
					<AppDrawer open={drawerOpen} onClose={handleDrawerClose} />
					<BluetoothDeviceContextProvider>
						<Switch>
							<ProtectedRoute path='/' exact>
								<Home />
							</ProtectedRoute>
							<Route path='/register' exact component={Signup} />
							<Route path='/login' exact component={Login} />
							<ProtectedRoute path='/diet' exact>
								<Diet />
							</ProtectedRoute>
							<ProtectedRoute path='/devices' exact>
								{/* <BluetoothDeviceContextProvider> */}
								<Devices />
								{/* </BluetoothDeviceContextProvider> */}
							</ProtectedRoute>

							<Route path='*'>
								<div>403 error</div>
							</Route>
						</Switch>
					</BluetoothDeviceContextProvider>
				</Grid>
			</AuthContextProvider>
			{/* </Router> */}
		</AppContext.Provider>
	);
}

export default App;
