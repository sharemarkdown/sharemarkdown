
import React from "react";
import {Card, Grid, Typography, List, ListItem, ListItemText, Divider} from "material-ui";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import { connect } from 'react-redux'
import { compose } from 'redux'
import {withRouter} from 'react-router-dom';
// import {history} from '../router/history';
import {push} from 'react-router-redux';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
});


class Home extends React.Component {
    // static contextTypes = {
    //   router: PropTypes.object
    // };
    state = {
      dense: false,
      secondary: true,
    };
    navigate = (path) => {
      this.props.dispatch(push(path));
    };


    render() {
      const {classes, login } = this.props;
      const {dense, secondary} = this.state;
      const titles = ["File 1", "README", "TODO"];
      return (
        <div className={classes.root}>
          <Grid container spacing={24} justify={'center'}>
            <Grid item xs={12}>
              {!login.user &&
              <Typography variant="title" className={classes.title}>
                Please Log in.
              </Typography>
              }
              {login.user &&
                <div>
                  <Typography variant="title" className={classes.title}>
                    Files of {login.user.username}
                  </Typography>


                  <div className={classes.demo}>
                    <List dense={dense}>
                      {titles.map(value=> (
                        <div key={`item-${value}`}>
                          <ListItem button  onClick={()=>this.navigate('/second')}>
                            <ListItemText
                              name="name"
                              primary={`${value}`}
                              secondary={secondary ? 'Secondary text' : null}
                            />
                          </ListItem>
                          <Divider />
                        </div>

                      ))}
                    </List>
                  </div>
                </div>
              }
            </Grid>
            <Card>
            </Card>
          </Grid>
        </div>
      );
    }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps(state){
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default compose(withRouter, withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Home);