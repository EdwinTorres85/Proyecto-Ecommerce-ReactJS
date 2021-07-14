import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
    root: {
        width: 800,
    },
    media: {
        position: 'relative',
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    textLine: {
        height: 40
    }
});


export default function ItemDetailSkeleton() {

    const classes = useStyles();

    return (
        <Card className={classes.root}>

            <Skeleton className={classes.media} animation="wave" variant="rect" />

            <CardContent>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={9}>
                        <Skeleton animation="wave" className={classes.textLine} />
                        <Skeleton animation="wave" className={classes.textLine} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Skeleton animation="wave" className={classes.textLine} />
                    </Grid>
                </Grid>


            </CardContent>
        </Card>
    )
}