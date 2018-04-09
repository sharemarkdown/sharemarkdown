import React from "react";
import {Card, CardContent, Grid, Typography, TextField} from "material-ui";
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles/index'
import purple from 'material-ui/colors/purple';

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
  inputLabelFocused: {
    color: purple[500],
  },
  inputUnderline: {
    '&:after': {
      backgroundColor: purple[500],
    },
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 1,
    },
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 20,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
});

class Second extends React.Component {

  state = {
    name: 'HII \n' +
    'Welcome to README',
  };

  handleChange = event => {
    this.setState({ name: event.target.value });

  };

  render() {
    const {classes} = this.props;
    return (
      <Grid container spacing={24} justify={'center'}>
        <Grid item xs={12}>
          <Typography variant="title" className={classes.title}>
            README
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <TextField
                value={this.state.name}
                id="textarea"
                label="Edit"
                placeholder="Type Here"
                multiline
                fullWidth
                rows="30"
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    input: classes.textFieldInput,
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                  className: classes.textFieldFormLabel,
                }}
                onChange={this.handleChange}
                margin="normal"
                onKeyPress={(ev) => {
                  if (ev.key === 'Tab') {
                    // Do code here
                    ev.preventDefault();
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>

              <TextField
                disabled
                value={this.state.name}
                id="textarea"
                label="Output"
                multiline
                fullWidth
                rows="30"
                InputProps={{
                  disableUnderline: true,
                }}
                InputLabelProps={{
                  shrink: true,
                  className: classes.textFieldFormLabel,
                }}
                margin="normal"

              />
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    );
  }
}

Second.propTypes = {
  classes: PropTypes.object.isRequired,
};




export default withStyles(styles)(Second);