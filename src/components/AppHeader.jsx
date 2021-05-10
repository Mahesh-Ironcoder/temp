import React, { useContext } from "react";

import { useHistory } from "react-router-dom";

import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	makeStyles,
	IconButton,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import { AuthContext } from "../contexts/AuthContext";
import { AppContext } from "../App";
import { BluetoothDeviceContext } from "../contexts/BluetoothDeviceContext";

const useStyles = makeStyles((theme) => {
	return {
		title: {
			flex: 1,
		},
	};
});

function AppHeader() {
	const classes = useStyles();
	const { isLogin, logout } = useContext(AuthContext);
	const { handleDrawerOpen } = useContext(AppContext);
	const { disconnect } = useContext(BluetoothDeviceContext);
	let history = useHistory();
	const handleLogout = () => {
		logout();
		disconnect();
	};
	return (
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
						isLogin ? handleLogout() : history.push("/");
					}}
				>
					{isLogin ? "Log out" : "Login"}
				</Button>
			</Toolbar>
		</AppBar>
	);
}

export default AppHeader;
