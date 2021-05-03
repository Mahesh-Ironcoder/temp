import React from "react";

import {
	Grid,
	Button,
	TextField,
	Card,
	CardHeader,
	CardContent,
	Link,
	makeStyles,
} from "@material-ui/core";

import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
	LoginCardContainer: {
		marginTop: theme.spacing(9),
		[theme.breakpoints.down("sm")]: { width: "100%", minWidth: "300px" },
		display: "flex",
		flexDirection: "column",
		// alignItems: "center",
		// paddingLeft: theme.spacing(8),
		// paddingRight: theme.spacing(8),
	},
	cardHeaderStyle: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	form: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
	},
	submitbtn: {
		margin: "1rem 0rem",
		width: "40%",
		color: theme.palette.primary.contrastText,
	},
	avatar: {
		marginTop: theme.spacing(3),
		background: theme.palette.info.main,
	},
	linkStyle: {
		color: theme.palette.grey[500],
	},
	textinputStyle: {
		width: "80%",
		// alignSelf: "flex-start",
	},
}));

function TextInput(props) {
	const {
		value,
		onTextChange,
		className,
		startIcon: MyIcon,
		type: textType,
		label: labelFor,
		fullWidth,
	} = props;
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				alignItems: "baseline",
			}}
			className={className}
		>
			{MyIcon && <MyIcon />}
			<TextField
				autoFocus
				margin='normal'
				value={value}
				onChange={(e) => {
					onTextChange(e.target.value);
				}}
				label={labelFor}
				variant='filled'
				fullWidth={fullWidth}
				required
				color='secondary'
				style={{ marginLeft: 10 }}
				type={textType ? textType : "text"}
			/>
		</div>
	);
}

export default function Signup() {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [password2, setPassword2] = React.useState("");

	// const { login } = ReactuseContext(AppContext);
	const classes = useStyles();
	const handleRegister = () => {
		if (password !== password2) {
			window.alert("Please match both the password fields");
		}
	};
	return (
		<Grid container direction='row' justify='center' alignItems='center'>
			<Grid item xs={1} sm={4} />
			<Grid item xs={10} sm={4}>
				<Card
					variant='elevation'
					raised
					className={classes.LoginCardContainer}
				>
					<CardHeader
						title='Sign Up'
						titleTypographyProps={{ variant: "h4" }}
						avatar={<LocalHospitalIcon fontSize='large' />}
						className={classes.cardHeaderStyle}
					/>
					<CardContent>
						<form className={classes.form}>
							<TextInput
								value={username}
								label='Username'
								onTextChange={(value) => setUsername(value)}
								className={classes.textinputStyle}
								startIcon={PersonOutlineOutlinedIcon}
								fullWidth
							/>
							<TextInput
								value={password}
								label='Password'
								onTextChange={(value) => setPassword(value)}
								className={classes.textinputStyle}
								startIcon={LockOutlinedIcon}
								fullWidth
							/>
							<TextInput
								value={password2}
								label='Confirm password'
								onTextChange={(value) => setPassword2(value)}
								className={classes.textinputStyle}
								startIcon={LockOutlinedIcon}
								fullWidth
							/>
							<Button
								variant='contained'
								color='primary'
								size='large'
								className={classes.submitbtn}
								type='submit'
								onClick={(e) => handleRegister()}
							>
								Sign Up
							</Button>
						</form>
						<Link className={classes.linkStyle} href='/'>
							Already have an account?
						</Link>
					</CardContent>
				</Card>
			</Grid>
			<Grid item xs={1} sm={4} />
		</Grid>
	);
}
