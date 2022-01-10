import { Grid, makeStyles, Typography, Paper } from '@material-ui/core';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import React from 'react';

import { useHistory } from 'react-router';

import { AuthContext } from '../contexts/AuthContext';
import cubicles from '../cubicles';

const useStyles = makeStyles((theme) => ({
	appbarStyles: {
		paddingRight: theme.spacing(1),
		display: 'flex',
		flexDirection: 'row',
	},
	appHeaderStyle: {
		flexGrow: 1,
	},
	gridContainer: {
		padding: theme.spacing(5),
	},
	apd: {
		margin: 16,
		width: '100%',
	},
	card: {
		padding: 10,
	},
}));

export default function Home(props) {
	const [userCubicles, setUserCubicles] = React.useState([]);

	React.useEffect(() => {
		let cl = cubicles.getCubicles();
		setUserCubicles([...userCubicles, ...cl]);
		return () => {
			setUserCubicles([]);
		};
	}, []);

	const classes = useStyles();
	return (
		<Grid
			container
			direction='row'
			alignItems='flex-start'
			className={classes.gridContainer}
			spacing={1}>
			{userCubicles.map((cubicle, index) => {
				return (
					<Grid key={index} item xs={12} sm={3} zeroMinWidth>
						<Paper elevation={3} className={classes.card}>
							<Typography variant='h5'>{cubicle.name}</Typography>
							<Typography variant='subtitle1' style={{ paddingBottom: '1.5rem' }}>
								{cubicle.desc}
							</Typography>
							<Typography variant='subtitle2'>
								Participants: {cubicle.noofparticipants}
							</Typography>
							<Typography variant='body1'>Status: {cubicle.status}</Typography>
						</Paper>
					</Grid>
				);
			})}
		</Grid>
	);
}
