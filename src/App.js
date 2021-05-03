import "./App.css";
import Login from "./components/login";
import Home from "./components/Home";
import Signup from "./components/Signup";
import AppDrawer from "./components/AppDrawer";
import Diet from "./components/Diet";

import { useState, createContext } from "react";

import { Route, Switch, useHistory } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Typography,
	Grid,
	Button,
	CssBaseline,
	makeStyles,
	IconButton,
} from "@material-ui/core";

import ProtectedRoute from "./components/ProtectedRoute";
import MenuIcon from "@material-ui/icons/Menu";

export const AppContext = createContext("");

const useStyles = makeStyles((theme) => {
	return {
		title: {
			flex: 1,
		},
	};
});

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [drawerOpen, setIsDrawerOpen] = useState(false);

	let history = useHistory();
	console.log(history);

	const login = (creds) => {
		console.log("Logged in: ", Date.now());

		var formdata = new FormData();
		formdata.append("username", creds.user);
		formdata.append("password", creds.pass);

		var requestOptions = {
			method: "POST",
			body: formdata,
			redirect: "follow",
		};



		fetch("/login", requestOptions)
			.then((resp) => resp.json())
			.then((body) => {
				console.log("login body: ", body);
				if (body.verified) {
					setIsLoggedIn(true);
					history.push("/home");
				} else {
					setIsLoggedIn(false);
				}
			});
		setIsLoggedIn(false);
	};

	const logout = () => {
		console.log("Logged out: ", Date.now());
		setIsLoggedIn(false);
	};

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};
	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};

	const classes = useStyles();

	return (
		<AppContext.Provider value={{ isLoggedIn, login, logout }}>
			<CssBaseline />

			<Grid container direction='column'>
				<AppBar position='static'>
					<Toolbar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant='h4' className={classes.title}>
							Healthfy
						</Typography>
						<Button
							variant='contained'
							onClick={() => {
								isLoggedIn ? logout() : history.push("/");
							}}
						>
							{isLoggedIn ? "Log out" : "Login"}
						</Button>
					</Toolbar>
				</AppBar>
				<AppDrawer open={drawerOpen} onClose={handleDrawerClose} />
				<Switch>
					<Route path='/' exact>
						<Login />
					</Route>
					<Route path='/register' exact>
						<Signup logout />
					</Route>
					<ProtectedRoute path='/home' exact>
						<Home />
					</ProtectedRoute>
					<ProtectedRoute path='/diet' exact>
						<Diet />
					</ProtectedRoute>
					<Route path='*'>
						<div>403 error</div>
					</Route>
				</Switch>
			</Grid>
		</AppContext.Provider>
	);
}

export default App;
