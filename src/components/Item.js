import React from 'react'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from 'react-router-dom'

export default function Item({ data, onAdd, cols, ...other }) {

    const styles = {
        hover:{
            "&:hover": {
                backgroundColor:'red',
            }
        },
        image:{
            width: '100%',
            position: 'absolute',
            top: '-45%'
        }
    }
    return (
        <GridListTile key={data.id} cols={cols || 1} {...other}>
            <Link style={styles.link} to={`/detail/${data.id}`}>
                <img style={styles.image} src={data.img} alt={data.title} />
                <GridListTileBar
                    title={data.title}
                    subtitle={<span>$: {data.price}</span>}
                    style={styles.hover}
                />
            </Link>
        </GridListTile>
    );
}