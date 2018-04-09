import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import Home from "../components/Home";
import First from "../components/First";
import Second from "../components/Second";
import Third from "../components/Third";

function Routes() {
    return (
        <Wrapper>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/first" component={First} />
                <Route exact path="/second" component={Second} />
                <Route exact path="/third" component={Third} />
            </Switch>
        </Wrapper>
    );
}

const Wrapper = styled.div`
`;

export default Routes;