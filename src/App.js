import React from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from "react-router-dom";
import RoutesList from "./Routes/RoutesList";
import CodeSplit from "./Components/CodeSplit";
const App = () => {
    return (
        <Router>
            <Switch>
                {RoutesList.map((item) => {
                    return (
                        <Route
                            exact
                            key={item.path}
                            path={item.role + item.path}
                            component={(props) => (
                                <CodeSplit load={() => item.layout}>
                                    {(Component) =>
                                        Component === null ? (
                                            <div>Loading...</div>
                                        ) : (
                                            <Component item={item} {...props} />
                                        )
                                    }
                                </CodeSplit>
                            )}
                        />
                    );
                })}

                <Redirect to="/404" />
            </Switch>
        </Router>
    );
};

export default App;
