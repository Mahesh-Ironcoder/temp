import React from "react";
import {
	Grid,
	makeStyles,
	Box,
	Card,
	CardHeader,
	CardContent,
} from "@material-ui/core";
import { AppContext } from "../App.js";
import VitalDisplayCard from "./VitalDisplayCard";
import { BorderLinearProgress } from "./VitalDisplayCard";

const useStyles = makeStyles((theme) => ({
	appbarStyles: {
		paddingRight: theme.spacing(1),
		display: "flex",
		flexDirection: "row",
	},
	appHeaderStyle: {
		flexGrow: 1,
	},
	gridContainer: {
		padding: theme.spacing(5),
	},
	apd: {
		margin: 16,
		width: "100%",
		// display: "flex",
		// flexDirection: "row",
	},
}));

const data = {
	bp: { sis: 80, dia: 110 },
	glucose: 30,
	SpO2: 98,
	Cholestrol: 110,
};
const idata = {
	bp: null,
	glucose: null,
	SpO2: null,
	Cholestrol: null,
};

export default function Home(props) {
	// const { logout } = React.useContext(AppContext);
	const [vitals, setVitals] = React.useState(idata);

	React.useEffect(() => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch("/predict_glucose?diastole=85&systole=110", requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log(result);
				setVitals({
					...vitals,
					glucose: parseInt(result.glucosePrediction),
					bp: "Sistole: 80 \n Diastole: 110",
				});
			})
			.catch((error) =>
				console.log("error in fetching glucose value", error)
			);

		// fetch("/predict_colestrol?diastole=80&systole=110", requestOptions)
		// 	.then((response) => response.json())
		// 	.then((result) => {
		// 		console.log(result);
		// 		setVitals({
		// 			...vitals,
		// 			colestrol: parseInt(result.colestrolPrediction),
		// 		});
		// 	})
		// 	.catch((error) =>
		// 		console.log("error in fetching glucose value", error)
		// 	);
	}, []);

	const classes = useStyles();
	return (
		<Grid
			container
			direction='column'
			alignItems='flex-start'
			className={classes.gridContainer}
		>
			<Grid item container direction='row' alignItems='stretch'>
				<VitalDisplayCard data={vitals.glucose} title={"Glucose"} />
				<VitalDisplayCard
					data={vitals.bp}
					title={"Blood Pressure"}
					noUnits
				/>
			</Grid>
			<Grid item conatiner direction='column'>
				<div className={classes.apd}>
					SpO2
					<BorderLinearProgress variant='determinate' value={50} />
				</div>
				<div className={classes.apd}>
					Cholestrol
					<BorderLinearProgress variant='determinate' value={50} />
				</div>
				<div className={classes.apd}>
					Heamoglobin
					<BorderLinearProgress variant='determinate' value={50} />
				</div>
			</Grid>
		</Grid>
	);
}
