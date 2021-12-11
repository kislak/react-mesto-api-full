import React from "react";
import { Redirect, Route } from "react-router-dom";

const SIGN_IN_ROUTE = 'sign-in'

function ProtectedRoute({ children, ...restOfProps }) {
    const isAuthenticated = localStorage.getItem("AuthToken");

    return (
        <Route
            {...restOfProps}
        >
            {isAuthenticated ? <>{children}</> : <Redirect to={SIGN_IN_ROUTE} />}
        </Route>
    );
}

export default ProtectedRoute;
