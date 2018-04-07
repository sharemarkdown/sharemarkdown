import React from "react";
import {Card, CardContent, Grid} from "material-ui";

function Home() {
    return (
        <Grid container justify={'center'}>
            <Card>
                <CardContent>
                    <img src={'https://sayingimages.com/wp-content/uploads/welcome-to-the-team-meme.jpg'} />
                </CardContent>
            </Card>
        </Grid>
    );
}


export default Home;