import React from "react";
import {Card, CardContent, Grid, Typography} from "material-ui";


class Second extends React.Component {


  render() {
    return (
      <Grid container spacing={24} justify={'center'}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">
                HII
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography color="textSecondary">
                HII
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    );
  }
}



export default Second;