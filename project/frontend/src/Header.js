/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import MenuIcon from 'material-ui-icons/Menu';
import {AppBar, Drawer, IconButton, MenuItem, Toolbar, Typography, Button} from "material-ui";
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {push} from 'react-router-redux';
import { withStyles } from 'material-ui/styles/index'
import {userActions} from './js/actions'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
          open: false
        };
    }
    handleToggle = () => this.setState({open: !this.state.open});
    navigate = (path) => {
        this.handleToggle();
        this.props.dispatch(push(path));
    };
    render() {
        const {classes, login} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={()=>this.handleToggle()}>
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.flex} variant="title" color="inherit">
                            sharemarkdown
                        </Typography>
                      {login.user &&
                        <Button color="inherit" onClick={()=>this.props.dispatch(userActions.logout())}>Logout</Button>
                      }
                    </Toolbar>
                </AppBar>
                <Drawer
                    open={this.state.open}
                    onClose={()=>this.handleToggle()}
                >
                    <div style={{width: 250}}>
                        <MenuItem onClick={()=>this.navigate('/')}>Home</MenuItem>
                      {!login.user &&
                        <div>
                          <MenuItem onClick={() => this.navigate('/register')}>Register</MenuItem>
                          <MenuItem onClick={()=>this.navigate('/login')}>Login</MenuItem>
                        </div>
                      }
                    </div>
                </Drawer>
            </div>
        );
    }

}

Header.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.func,
  login: PropTypes.object,
};

function mapStateToProps(state){

  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default compose(withRouter, withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Header);
