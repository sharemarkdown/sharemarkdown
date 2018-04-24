// /* global console */
import React from "react";
import {Card, Grid, Typography, List, ListItem, ListItemText, Divider, Button,
        Dialog, DialogTitle, DialogContent, TextField, DialogActions,
        ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Icon,
       } from "material-ui";
import {ExpandMore} from "material-ui-icons";

import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import { connect } from 'react-redux'
import { compose } from 'redux'
import {withRouter} from 'react-router-dom';
import {push} from 'react-router-redux';
import {documentActions} from '../js/actions'

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
});


class Home extends React.Component {
    constructor(props) {

      super(props);

      this.state = {
        dense: false,
        secondary: true,
        open_dialog: false,
        title: "",
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount() {
      if(this.props.login.user){

        this.props.dispatch(documentActions.get_documents());
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
      this.setState({open_dialog: true});
    }
    handleCloseDialog = () => {
      this.setState(({open_dialog: false}));
    }

    handleSubmit(event){
      event.preventDefault();
      const { dispatch } = this.props;
      dispatch(documentActions.create_document(this.state.title));
      this.handleCloseDialog();
      this.setState({title: "" })
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
                      <Button color="primary" className={classes.btn} onClick={this.handleOpenDialog}>New Folder</Button>
                    </Grid>
                    <Grid item xs={24}>
                      <Button color="primary" className={classes.btn} onClick={this.handleOpenDialog}>New Document</Button>
                    </Grid>
                  </Grid>

                    <Dialog
                      open={this.state.open_dialog}
                      onClose={this.handleCloseDialog}
                      aria-labelledby="form-dialog-title"
                    >
                      <form onSubmit={this.handleSubmit} >
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
                          <Button onClick={this.handleCloseDialog} color="primary">
                            Cancel
                          </Button>
                          <Button type="submit" color="primary">
                            Create
                          </Button>
                        </DialogActions>
                      </form>
                    </Dialog>


                  <div className={classes.demo}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <Grid container spacing={8} alignItems="flex-end">
                          <Grid item>
                            <Icon style={{fontSize: 20}}>
                              folder
                            </Icon>
                          </Grid>
                          <Grid item >
                            <Typography style={{fontSize: 19}}>
                              Expansion Panel 1
                            </Typography>
                          </Grid>
                        </Grid>

                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                          sit amet blandit leo lobortis eget.
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <List dense={dense}>
                      {documents.documents.map(value=> (
                        <div key={`item-${value.file_name}-${value.id}`}>
                          <ListItem button  onClick={()=>
                            this.navigate('/second', value.id)
                          }
                          >
                            <ListItemText
                              name="name"
                              primary={`${value.file_name}`}
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
  documents: PropTypes.object
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