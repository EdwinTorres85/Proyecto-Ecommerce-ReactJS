import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Item from './Item'
import ListSubheader from '@material-ui/core/ListSubheader';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

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
    }
}));

export default function ItemList({ title, itemDataList, onAdd }) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div"></ListSubheader>
                </GridListTile>
                {                    
                    itemDataList.map((item) => <Item key={item.id} data={item} onAdd={onAdd} cols={1} {...item} />)
                }
            </GridList>
        </div>
    )
}