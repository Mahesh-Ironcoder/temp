import { Grid, makeStyles } from "@material-ui/core";

import "firebase/auth";

import React from "react";

import { useHistory } from "react-router";

import { AuthContext } from "../contexts/AuthContext";
import { BluetoothDeviceContext } from "../contexts/BluetoothDeviceContext";
import VitalDisplayCard, { BorderLinearProgress } from "./VitalDisplayCard";

import { Chart } from "react-google-charts";

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

// const data = {
// 	bp: { sis: 80, dia: 110 },
// 	glucose: 30,
// 	SpO2: 98,
// 	Cholestrol: 110,
// };

const idata = {
	bp: null,
	glucose: null,
	SpO2: null,
	Cholestrol: null,
};

export default function Home(props) {
	const [vitals, setVitals] = React.useState(idata);

	const { currUser } = React.useContext(AuthContext);
	const { server } = React.useContext(BluetoothDeviceContext);

	let history = useHistory();

	const fetchGlucose = React.useCallback(
		(dia = 80, sis = 120) => {
			let formData = new FormData();
			formData.append("diastole", dia);
			formData.append("sistole", sis);
			formData.append("uid", currUser.uid);

			let requestOptions = {
				method: "POST",
				redirect: "follow",
				body: formData,
			};

			fetch("/api/predict_glucose", requestOptions)
				.then((response) => response.json())
				.then((result) => {
					// console.log(result);
					setVitals({
						...vitals,
						glucose: parseInt(result.glucosePrediction),
						// bp: "Sistole: 80 \n Diastole: 110",
					});
				})
				.catch((error) =>
					console.log("error in fetching glucose value", error)
				);
		},
		[vitals.bp]
	);

	function handleCharacteristicValueChanged(e) {
		// console.log(e.target.value.getUint8(0) + "%");
		// console.log(e.target.value);
		let readValue = e.target.value.getUint16();
		let bp = {
			sis: readValue & 0xff,
			dia: (readValue >> 8) & 0xff,
		};
		// setBpValues(bp);
		setVitals((prevState) => ({
			...prevState,
			bp: `Diastole: ${bp.dia} Sistole: ${bp.sis}`,
		}));
	}

	async function getValuesFromGatt(gattserver) {
		try {
			if (gattserver) {
				let service = await gattserver.getPrimaryService(
					"blood_pressure"
				);
				let bpm = await service.getCharacteristic(
					"blood_pressure_measurement"
				);
				return bpm;
			}
		} catch (e) {
			console.error(
				"Error in connecting to bluetooth device from home: ",
				e
			);
			return null;
		}
	}

	const toDataTable = (data)=>{

	}

	React.useEffect(() => {
		let bpm = null;
		if (server) {
			(async () => {
				bpm = await getValuesFromGatt(server);
				bpm.addEventListener(
					"characteristicvaluechanged",
					handleCharacteristicValueChanged
				);
				bpm.startNotifications();

				let reading = await bpm.readValue();
				let readValue = reading.getUint16();
				let bp = {
					sis: readValue & 0xff,
					dia: (readValue >> 8) & 0xff,
				};
				setVitals((prevState) => ({
					...prevState,
					bp: `Diastole: ${bp.dia} Sistole: ${bp.sis}`,
				}));
			})();
		} else {
			alert("No bluetooth Devices found...Please connect to one");
			history.push("/devices");
		}
		return () => {
			if (bpm) {
				bpm.removeEventListener("characteristicvaluechanged", () => {
					console.log("Removed event listener from home");
				});
			}
		};
	}, [server]);

	React.useEffect(() => {
		if (vitals.bp) {
			let [a, dia, b, sis] = vitals.bp.split(" ");
			console.log(a, ": ", dia, " ", b, ": ", sis);
			fetchGlucose(dia, sis);
		}

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
	}, [vitals.bp, fetchGlucose]);

	const classes = useStyles();
	return (
		<Grid
			container
			direction='column'
			alignItems='flex-start'
			className={classes.gridContainer}
		>
			<Grid
				item
				container
				direction='row'
				alignItems='stretch'
				spacing={2}
			>
				<Grid item xs={12} sm={4}>
					<VitalDisplayCard
						data={vitals.bp}
						title={"Blood Pressure"}
						noUnits
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<VitalDisplayCard data={vitals.glucose} title={"Glucose"} />
				</Grid>
				<Grid item xs={12} sm={4}>
					<Chart
						width={"500px"}
						height={"300px"}
						chartType='AreaChart'
						loader={<div>Loading Chart</div>}
						data={[
							["Year", "Sales", "Expenses"],
							["2013", 1000, 400],
							["2014", 1170, 460],
							["2015", 660, 1120],
							["2016", 1030, 540],
						]}
						options={{
							title: "Blood Pressure Trends",
							hAxis: {
								title: "Time",
								titleTextStyle: { color: "#333" },
							},
							vAxis: { minValue: 0 },
							// For the legend to fit, we make the chart area smaller
							chartArea: { width: "80%", height: "70%" },
							// lineWidth: 25
						}}
						// For tests
						rootProps={{ "data-testid": "1" }}
					/>
				</Grid>
			</Grid>
			<Grid item container direction='column'>
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
