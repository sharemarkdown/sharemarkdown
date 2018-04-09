import React from "react"
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import Routes from "../router/urls";
import Header from "../Header";
const App = () => (
        <Router>
            <div>
                <Header/>
                <div style={{margin: 10}}>
                    <Routes />
                </div>
            </div>
        </Router>

);
/* global document*/
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;