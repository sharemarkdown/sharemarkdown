import React from "react";
// import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import Home from "../components/Home";
import Register from "../components/Register";
import Second from "../components/EditPage";
// import FileList from "../components/FileList";
import Login from "../components/Login";

function Routes() {
    return (

            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/second" component={Second} />
                <Route exact path="/folder/:id" component={Home} />
                <Route exact path="/login" component={Login} />
            </Switch>

    );
}

// const Wrapper = styled.div`
// `;

export default Routes;