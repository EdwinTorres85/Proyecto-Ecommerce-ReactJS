import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge'
import { useCartContext } from '../context/cartContext';

function CartWidget() {
    const { totalItemCount } = useCartContext();

    const styles = {
        display: totalItemCount > 0 ? 'block' : 'none'
    }

    return (
        <div style={styles} variant="button">
            <Badge badgeContent={totalItemCount} color="secondary">
                <ShoppingCartIcon color="primary" />
            </Badge>
        </div>
    )
}

export default CartWidget