import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AppContext } from "../App";

const ProtectedRoute = ({ children, ...rest }) => {
	const { isLoggedIn } = React.useContext(AppContext);
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isLoggedIn ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default ProtectedRoute;
