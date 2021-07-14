import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 700,
        height: 600,
    },
    media: {
        height: 146
    },
    textLine: {
        height: 40
    }
}));

export default function ItemListSkeleton() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div"></ListSubheader>
                </GridListTile>
                <GridListTile cols={1}>
                    <Skeleton animation="wave" variant="rect" className={classes.media} />
                    <Skeleton animation="wave" className={classes.textLine} />
                </GridListTile>
                <GridListTile cols={1}>
                    <Skeleton animation="wave" variant="rect" className={classes.media} />
                    <Skeleton animation="wave" className={classes.textLine} />
                </GridListTile>
                <GridListTile cols={1}>
                    <Skeleton animation="wave" variant="rect" className={classes.media} />
                    <Skeleton animation="wave" className={classes.textLine} />
                </GridListTile>
                <GridListTile cols={1}>
                    <Skeleton animation="wave" variant="rect" className={classes.media} />
                    <Skeleton animation="wave" className={classes.textLine} />
                </GridListTile>
            </GridList>
        </div>
    )
}