import React from "react"
import Routes from "../router/urls";
import Header from "../Header";
import { connect } from 'react-redux'
import { compose } from 'redux'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import { Snackbar } from "material-ui";
import {alertActions} from '../js/actions'

class App extends React.Component{
  constructor(props){
    super(props);

  }
  render(){
    const {alert, dispatch} = this.props;

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
};


function mapStateToProps(state){
  const { alert } = state;
  return { alert };
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(App);
