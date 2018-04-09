import React from "react";
import {Card, CardContent, Grid, Typography} from "material-ui";

function First() {
    return (
        <Grid container justify={'center'}>
            <Card>
                <CardContent>
                    <Typography color="textSecondary">
                        First page
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}



export default First;