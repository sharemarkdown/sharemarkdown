import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import Home from "../components/Home";
import Register from "../components/Register";
import Second from "../components/Second";
import Third from "../components/Third";
import Login from "../components/Login";

function Routes() {
    return (
        <Wrapper>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/second" component={Second} />
                <Route exact path="/third" component={Third} />
                <Route exact path="/login" component={Login} />

            </Switch>
        </Wrapper>
    );
}

const Wrapper = styled.div`
`;

export default Routes;