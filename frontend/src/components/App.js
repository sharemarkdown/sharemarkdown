import React from "react"
import ReactDOM from "react-dom";
import DataProvider from "./DataProvider";
import Table from "./Table";
import {MuiThemeProvider} from "material-ui";
const App = () => (
    <MuiThemeProvider>
        <DataProvider endpoint="api/lead/"
                      render={data => <Table data={data} />} />
    </MuiThemeProvider>

);
/* global document*/
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;