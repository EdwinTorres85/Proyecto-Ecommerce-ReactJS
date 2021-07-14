import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ItemCount from './ItemCount';
import { Link } from 'react-router-dom'
import { useCartContext } from '../context/cartContext';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: 800,
    },
    title: {
        position: 'absolute',
        zIndex: 999,
        top: 0,
        left: 20,
        color: 'rgb(63 81 181)',
        fontSize: 40,
        fontWeight: 600,
    },
    price: {
        position: 'absolute',
        zIndex: 999,
        bottom: 0,
        right: 20,
        color: 'white',
        textShadow: '3px 5px 4px #00000061',
        fontSize: 40,
        fontWeight: 600,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        position: 'relative',
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    mediaOverlay: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to top, rgba(245 0 87) 11%, rgba(0,212,255,0) 34%)',
    }
});


export default function ItemDetail({ itemData }) {

    const [detailData, setDetailData] = useState({});
    const [addedToCart, setAddedToCart] = useState(false);
    const [initialCount, setInitialCount] = useState(1);
    const [stock, setStock] = useState(1);

    const { itemsInCart, add } = useCartContext();

    const classes = useStyles();

    useEffect(() => {
        setDetailData(itemData);
        setStock(itemData.stock);

        const foundItem = itemsInCart.find(el => el.id == itemData.id);
        if (foundItem) {
            setInitialCount(foundItem.quantity);
        }

    }, [itemData]);

    function onAdd(quantity) {
        if (quantity > 0) {
            setAddedToCart(true);
        } else {
            setAddedToCart(false);
        }

        //Always fire event
        add(itemData, quantity);
    }

    return (
        <Card className={classes.root}>

            <CardMedia
                className={classes.media}
                image={detailData.img}
                title={detailData.title}
                children={
                    <>
                        <Typography className={classes.title} color="textPrimary">
                            {detailData.title}
                        </Typography>
                        <Typography className={classes.price} variant="h5" component="h2">
                            $ {detailData.price}
                        </Typography>
                        <div className={classes.mediaOverlay} />
                    </>}
            />

            <CardContent>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={9}>
                        <Typography variant="subtitle1" component="p">
                            {detailData.description}
                        </Typography>
                        <Typography variant="caption" component="p">
                            Stock: {detailData.stock} u.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        {
                            addedToCart ?
                                <Link className={classes.cartLink} to='/cart'><Button>Finalizar mi compra</Button></Link>
                                :
                                <ItemCount id={itemData.id} stock={stock} initial={initialCount} onAdd={onAdd} />
                        }
                    </Grid>
                </Grid>


            </CardContent>
        </Card>
    )
}