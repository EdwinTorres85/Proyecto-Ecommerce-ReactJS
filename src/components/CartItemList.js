import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { useCartContext } from '../context/cartContext';
import { IconButton, Button, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import { Link } from 'react-router-dom';

export default function CartItemList() {
    const styles = {
        listItemQuantity: {
            textAlign: 'right',
            paddingRight: 10,
        },
        listItem: {
            width: '100%'
        },
        total: {
            width: '100%',
            textAlign: 'right',
            alignSelf: 'flex-end',
            borderTop: '1px solid aliceblue',
            fontSize: '1.4em'
        }
    }

    const { itemsInCart, cartTotal, remove } = useCartContext();

    function onRemove(id) {
        remove(id);
    }

    return (
        <>
            {
                itemsInCart.length == 0 ?
                    <>
                        <span>No tienes elementos en el carrito</span>
                        <Link to='/'><Button>Seguir comprando</Button></Link>
                    </>
                    :
                    <>
                        <Typography>
                            Finalizar tu compra
                        </Typography>
                        <List>
                            {itemsInCart.map((item) => {
                                console.log(item);
                                const labelId = `checkbox-list-secondary-label-${item.id}`;
                                return (
                                    <ListItem key={item.id} button>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={`Avatar n°${item.id}`}
                                                src={item.img}
                                                variant={'rounded'}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={item.title} />
                                        <ListItemText
                                            primary={`$: ${item.quantity * item.price}`}
                                            secondary={`Cantidad: ${item.quantity}`}
                                            style={styles.listItemQuantity}
                                            primaryTypographyProps={{ color: 'secondary' }} />
                                        <ListItemSecondaryAction>
                                            <IconButton onClick={() => { onRemove(item.id) }}
                                                edge="end" aria-label="delete"
                                                color="primary">
                                                <CloseIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                );
                            })}
                        </List>
                        <div style={styles.total}>
                            <Typography variant="h5" gutterBottom color='secondary'>Total: ${cartTotal}</Typography>
                        </div>
                    </>
            }
        </>
    );
}
