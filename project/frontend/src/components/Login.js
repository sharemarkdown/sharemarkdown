
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import {
    AppBar, Button, Card, CardActions, FormControl, Input, InputAdornment, InputLabel, Toolbar,
    Typography
} from "material-ui";
import {AccountCircle, Lock} from "material-ui-icons";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { userActions } from '../js/actions/userActions';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    root: {
        flexGrow: 1,
    }
});

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            direction: 'row',
            justify: 'center',
            alignItems: 'center',
            username: '',
            password: '',

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit(event){
        event.preventDefault();

        const {username, password} = this.state;
        const {dispatch} = this.props;

        dispatch(userActions.login(username, password));

    }


    render() {
        const { classes } = this.props;
        const { alignItems, direction, justify } = this.state;
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <Grid
                        container
                        spacing={16}
                        alignItems={alignItems}
                        direction={direction}
                        justify={justify}
                        style={{height: 500}}
                    >
                        <Grid item xs={3}>
                            <Card>
                                <AppBar position="static">
                                    <Toolbar>
                                        <Typography variant="title" color="inherit">
                                            Login
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                                <form onSubmit={this.handleSubmit}>
                                    <Grid container
                                          alignItems={alignItems}
                                          direction={direction}
                                          justify={justify} sytle={{padding: 100}}>


                                        <Grid item xs={10}>
                                            <FormControl fullWidth className={classes.margin} required>
                                                <InputLabel htmlFor="username">Username</InputLabel>
                                                <Input
                                                    id='username'
                                                    name='username'
                                                    value={this.state.username}
                                                    onChange={this.handleChange}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <AccountCircle />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Grid>

                                        <Grid item xs={10}>
                                            <FormControl fullWidth className={classes.margin} required>
                                                <InputLabel htmlFor="password">Password</InputLabel>
                                                <Input
                                                    id='password'
                                                    name='password'
                                                    type='password'
                                                    value={this.state.password}
                                                    onChange={this.handleChange}
                                                    startAdornment={
                                                        <InputAdornment position="start">
                                                            <Lock />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Grid>


                                    </Grid>
                                    <CardActions>
                                        <Button type="submit" size="small" color="primary">
                                            Login
                                        </Button>

                                    </CardActions>
                                </form>
                            </Card>

                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

function mapStateToProps(state){

  const login  = state;

  return { login };
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    login: PropTypes.object,
    dispatch: PropTypes.func,
};

export default compose(withStyles(styles), connect(mapStateToProps))(Login);