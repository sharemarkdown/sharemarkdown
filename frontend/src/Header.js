/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import MenuIcon from 'material-ui-icons/Menu';
import {AppBar, Drawer, IconButton, MenuItem, Toolbar, Typography} from "material-ui";

export default class DrawerSimpleExample extends React.Component{
    static contextTypes = {
        router: PropTypes.object
    };
    constructor (props) {
        super(props);
        this.state = {open: false};
    }
    handleToggle = () => this.setState({open: !this.state.open});
    navigate = (path) => {
        this.handleToggle();
        this.context.router.history.push(path);
    };
    render() {
        return (
            <div>

                <AppBar position="static">
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu" onClick={()=>this.handleToggle()}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit">
                            sharemarkdown
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={this.state.open}
                    onClose={()=>this.handleToggle()}
                >
                    <div style={{width: 250}}>
                        <MenuItem onClick={()=>this.navigate('/')}>Home</MenuItem>
                        <MenuItem onClick={()=>this.navigate('/first')}>Aount</MenuItem>
                    </div>
                </Drawer>
            </div>
        );
    }

}
