import React from "react"
import Routes from "../router/urls";
import Header from "../Header";
import { connect } from 'react-redux'
import { compose } from 'redux'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import { Snackbar } from "material-ui";
import {alertActions} from '../js/actions'
import axios from 'axios/index'

class App extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
    const {alert, dispatch, login} = this.props;
    if(login.user){
      axios.defaults.headers.common['Authorization'] = "Token " + login.user.token;
    }

    return(
      <div>
        { alert.message &&
          <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            open={Object.keys(alert).length !== 0}
            onClose={() => {
              dispatch(alertActions.clear());
            }}
            autoHideDuration={2000}
            message={<span> {alert.message} </span>}
          />
        }
        <Header/>

        <div style={{margin: 10}}>
          <Routes />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  alert: PropTypes.object,
  login: PropTypes.object,
};


function mapStateToProps(state){
  const { alert, login } = state;
  return { alert, login };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
