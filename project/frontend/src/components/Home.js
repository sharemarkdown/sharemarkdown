/* global console */
import React from "react";
import {Card, Grid, Typography, List, ListItem, ListItemText, Button,
        Dialog, DialogTitle, DialogContent, TextField, DialogActions,
        Icon, ListItemSecondaryAction
       } from "material-ui";
// import {ExpandMore} from "material-ui-icons";

import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import { connect } from 'react-redux'
import { compose } from 'redux'
import {withRouter} from 'react-router-dom';
import {push} from 'react-router-redux';
import {documentActions} from '../js/actions'
import { documentConstants } from '../js/constants'

const styles = theme => ({
  root: {
    flexGrow: 1,

  },
  grid:{
    backgroundColor: '#DCDCDC',
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },
  btn: {
    margin: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 1}px`,
  },
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  rightIcon:{
    margin: theme.spacing.unit,
  },
});


class Home extends React.Component {
    constructor(props) {

      super(props);

      this.state = {
        dense: false,
        secondary: true,
        new_file_dialog_open: false,
        title: "",
        share_user: "",
        share_file_id: -1,
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleEditSubmit = this.handleEditSubmit.bind(this);
      this.handleCloseDialog = this.handleCloseDialog.bind(this);
      this.handleOpenDialog = this.handleOpenDialog.bind(this);
      this.handleShareSubmit = this.handleShareSubmit.bind(this);

    }
    componentWillReceiveProps(nextProps) {
      console.log("Hiii")

      if(this.props.match.params !== nextProps.match.params){
        this.props = nextProps;
        if(this.props.login.user) {
          if (Object.keys(this.props.match.params).length > 0) {
            this.props.dispatch(documentActions.get_files(this.props.match.params.id));
          } else {
            this.props.dispatch(documentActions.get_documents());
          }
        }
      }

    }


    componentDidMount() {
      console.log(this.props.match.params)
      console.log(Object.keys(this.props.match.params).length)
      if(this.props.login.user){
        if(Object.keys(this.props.match.params).length > 0){
          this.props.dispatch(documentActions.get_files(this.props.match.params.id));
        }else {
          this.props.dispatch(documentActions.get_documents());
        }
      }
    }

    navigate = (path, value) => {
      this.props.dispatch(documentActions.edit_documents(value));
      this.props.dispatch(push(path));
    };

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    handleOpenDialog = () => {
      this.props.dispatch({type: documentConstants.CREATE_DOCUMENT_REQUEST,})
    }
    handleCloseDialog = () => {
      this.props.dispatch({type: documentConstants.CREATE_DOCUMENT_CANCEL,})
    }
    handleShareOpenDialog = () => {
      this.props.dispatch({type: documentConstants.SHARE_DOCUMENT_REQUEST,})
      this.setState()
    }
    handleShareCloseDialog = () => {
      this.props.dispatch({type: documentConstants.SHARE_DOCUMENT_CANCEL,})
    }

    handleEditSubmit(event){
      event.preventDefault();
      const { dispatch } = this.props;
      dispatch(documentActions.create_document(this.state.title, this.props.match.params.id || null));
      this.handleCloseDialog();
      this.setState({title: "" })
    }


    handleShareSubmit(event){
      event.preventDefault();
      const { dispatch } = this.props;
      dispatch(documentActions.share_document(this.state.share_file_id, this.state.share_user));
      this.handleShareCloseDialog();
      this.setState({share_user: "", share_file_id: -1})
    }


    render() {
      const {classes, login, documents, } = this.props;
      const {dense, secondary} = this.state;
      return (
        <div className={classes.root}>
          <Grid container spacing={24} justify={'center'} className={classes.grid}>
            <Grid item xs={12}>
              {!documents.documents &&
              <Typography variant="title" className={classes.title}>
                Please Log in.
              </Typography>
              }
              {documents.documents &&
                <div>
                  <Grid container spacing={24} alignItems="flex-end">
                    <Grid item xs={24}>
                      <Typography variant="title" className={classes.title}>
                        Files of {login.user.username}
                      </Typography>
                    </Grid>
                    <Grid item xs={24}>
                      <Button color="primary"
                              className={classes.btn}
                              name="new_file_dialog_open"
                              onClick={this.handleOpenDialog}
                      >
                        New Folder
                      </Button>
                    </Grid>
                    <Grid item xs={24}>
                      <Button color="primary" className={classes.btn} name="new_file_dialog_open" onClick={this.handleOpenDialog}>New Document</Button>
                    </Grid>
                  </Grid>

                    <Dialog
                      open={documents.create_request}
                      onClose={
                        this.handleCloseDialog
                      }
                      aria-labelledby="form-dialog-title"
                    >
                      <form onSubmit={this.handleEditSubmit} >
                        <DialogTitle id="form-dialog-title">New File</DialogTitle>
                        <DialogContent>

                          <TextField
                            value={this.state.title}
                            autoFocus
                            margin="dense"
                            id="title"
                            name="title"
                            label="title"
                            placeholder="File name"
                            onChange={this.handleChange}
                            fullWidth
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button name="new_file_dialog_open" onClick={this.handleCloseDialog} color="primary">
                            Cancel
                          </Button>
                          <Button type="submit" color="primary">
                            Create
                          </Button>
                        </DialogActions>
                      </form>
                    </Dialog>


                  <Dialog
                    open={documents.share_request}
                    onClose={this.handleShareCloseDialog}
                    aria-labelledby="form-dialog-title"
                  >
                    <form onSubmit={this.handleShareSubmit} >
                      <DialogTitle id="form-dialog-title">Please enter the username:</DialogTitle>
                      <DialogContent>

                        <TextField
                          value={this.state.share_user}
                          autoFocus
                          margin="dense"
                          id="share_user"
                          name="share_user"
                          label="share_user"
                          placeholder="Username"
                          onChange={this.handleChange}
                          fullWidth
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleShareCloseDialog} color="primary">
                          Cancel
                        </Button>
                        <Button type="submit" color="primary">
                          Share
                        </Button>
                      </DialogActions>
                    </form>
                  </Dialog>


                  <div className={classes.demo}>


                    <List dense={dense}>
                      {documents.documents.folders.map(value =>
                        <ListItem key={`item-${value.folder_name}-${value.id}`}
                                  button divider={true}
                                  onClick={()=>{
                                    this.props.dispatch(push("/folder/"+value.id));
                                    this.props.dispatch(documentActions.get_files(value.id))
                                  }}>
                          <Icon style={{fontSize: 25, padding: 12}}>
                            folder
                          </Icon>
                          <Typography style={{fontSize: 19}}>
                            { value.folder_name }
                          </Typography>

                          <ListItemSecondaryAction>
                            <Button variant="raised" mini className={classes.rightIcon}>
                              <Icon>
                                share
                              </Icon>
                            </Button>
                            <Button variant="raised" mini className={classes.rightIcon}>
                              <Icon >
                                delete
                              </Icon>
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                      )}
                    </List>


                    <List dense={dense}>
                      {documents.documents.documents.map(value=> (
                        <div key={`item-${value.file_name}-${value.id}`}>
                          <ListItem button divider={true} onClick={()=>
                            this.navigate('/second', value.id)
                          }
                          >
                            <ListItemText
                              name="name"
                              primary={`${value.file_name}`}
                              secondary={secondary ? 'Secondary text' : null}
                            />
                            <ListItemSecondaryAction>
                              <Button variant="raised" mini className={classes.rightIcon}
                                      onClick={ () => {
                                        this.handleShareOpenDialog();
                                        this.setState({"share_file_id": value.id});
                                      }
                                      }>
                                <Icon>
                                  share
                                </Icon>
                              </Button>
                              <Button variant="raised" mini className={classes.rightIcon}
                                      onClick={()=> {
                                          this.props.dispatch(documentActions.delete_document(value.id, this.props.match.params.id || null))
                                        }
                                      }
                              >
                                <Icon >
                                  delete
                                </Icon>
                              </Button>
                            </ListItemSecondaryAction>
                          </ListItem>

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
  documents: PropTypes.object,
  match: PropTypes.object
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