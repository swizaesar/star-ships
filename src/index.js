import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider } from "./Reducers/index";

ReactDOM.render(
    <StoreProvider>
        <App />
    </StoreProvider>,
    document.getElementById("root")
);

serviceWorker.register();
