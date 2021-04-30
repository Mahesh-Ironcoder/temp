import React from "react";
import {
	Typography,
	Grid,
	// AppBar,
	// Toolbar,
	// IconButton,
	makeStyles,
	// Button,
	// MenuItem,
} from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
import { AppContext } from "../App.js";


const useStyles = makeStyles((theme) => ({
	appbarStyles: {
		paddingRight: theme.spacing(1),
		display: "flex",
		flexDirection: "row",
	},
	appHeaderStyle: {
		flexGrow: 1,
	},
}));

export default function Home(props) {
	// const { logout } = React.useContext(AppContext);
	// const classes = useStyles();
	return (
		<Grid container direction='column'>
			{/* <Grid item>
				<AppBar position='static' variant='outlined'>
					<Toolbar disableGutters className={classes.appbarStyles}>
						<IconButton>
							<MenuIcon />
						</IconButton>
						<Typography
							variant='h5'
							className={classes.appHeaderStyle}
						>
							Healthfy
						</Typography>
						<Button
							alignSelf='flex-end'
							variant='contained'
							color='secondary'
							onClick={logout}
						>
							Logout
						</Button>
					</Toolbar>
				</AppBar>
			</Grid> */}
			<Typography variant='h3'>Welcome to healthfy...</Typography>
			<Typography variant='subtitle1'>
				Tracks your diet and keep you healthy
			</Typography>
		</Grid>
	);
}
