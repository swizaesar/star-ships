import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";

const RouteGuestLayout = (props) => {
    return (
        <Switch>
            <Suspense fallback={<div>Loading...</div>}>
                <div style={{ paddingTop: 50 }}>
                    <Route
                        exact
                        path={`${props.item.path}`}
                        component={props.item.component}
                    />
                </div>
            </Suspense>
        </Switch>
    );
};

export default RouteGuestLayout;
