/* global console */

import React from "react";
import {Card, CardContent, Grid, Typography, List, ListItem, ListItemText} from "material-ui";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import { connect } from 'react-redux'
import { compose } from 'redux'

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
    static contextTypes = {
      router: PropTypes.object
    };
    state = {
      dense: false,
      secondary: true,
    };
    navigate = (path) => {
      this.context.router.history.push({
        pathname: path,
        state: "HI",
        });
    };


    render() {
      const {classes, login } = this.props;
      const {dense, secondary} = this.state;
      const titles = ["File 1", "README", "TODO"];
      console.log(login);
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
                        <ListItem button key={`item-${value}`} onClick={()=>this.navigate('/second')}>
                          <ListItemText
                            name="name"
                            primary={`${value}`}
                            secondary={secondary ? 'Secondary text' : null}
                          />
                        </ListItem>

                      ))}
                    </List>
                  </div>
                </div>
              }
            </Grid>
            <Card>
              <CardContent>
                <img src={'https://sayingimages.com/wp-content/uploads/welcome-to-the-team-meme.jpg'}/>

              </CardContent>


            </Card>
          </Grid>
        </div>
      );
    }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.object,
};

function mapStateToProps(state){
  return state;
}

export default compose(withStyles(styles), connect(mapStateToProps))(Home);