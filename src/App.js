import "./App.css";
import Login from "./components/login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import AppDrawer from './components/AppDrawer';

import React, { useState, createContext } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid, CssBaseline } from '@material-ui/core';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import ProtectedRoute from './components/ProtectedRoute';
import AuthContextProvider from './contexts/AuthContext';
import AppHeader from './components/AppHeader';
import { red } from '@material-ui/core/colors';

export const appTheme = createMuiTheme({
	palette: {
		primary: {
			main: red[600],
		},
	},
});

export const AppContext = createContext('');

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
				<ThemeProvider theme={appTheme}>
					<CssBaseline />

					<Grid container direction='column'>
						<AppHeader />
						<AppDrawer open={drawerOpen} onClose={handleDrawerClose} />
						<Switch>
							<ProtectedRoute path='/' exact>
								<Home />
							</ProtectedRoute>
							<Route path='/register' exact component={Signup} />
							<Route path='/login' exact component={Login} />
							<Route path='*'>
								<div>403 error</div>
							</Route>
						</Switch>
					</Grid>
				</ThemeProvider>
			</AuthContextProvider>
			{/* </Router> */}
		</AppContext.Provider>
	);
}

export default App;
