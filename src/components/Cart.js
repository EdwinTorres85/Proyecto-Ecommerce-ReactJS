import React, { useState } from 'react'
import firebase from 'firebase'
import '@firebase/firestore';
import { Grid, Paper } from '@material-ui/core';
import CartItemList from './CartItemList'
import { getFirestore } from '../firebase';
import { useCartContext } from '../context/cartContext';
import Checkout from './Checkout';
import PurchaseComplete from './PurchaseComplete';


export default function Cart() {

    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const [orderId, setOrderId] = useState('');
    const { itemsInCart, cartTotal, flushCart } = useCartContext();

    async function createOrder({ name, phone, email, paymentMethod }) {
        if (itemsInCart.length > 0 && paymentMethod) {
            const newOrder = {
                buyer: { name: name, phone: phone, email: email },
                items: itemsInCart.map(item => ({ id: item.id, quantity: item.quantity, price: item.price })),
                total: cartTotal,
                paymentMethod: paymentMethod,
                date: firebase.firestore.FieldValue.serverTimestamp(),
                status: 'generada'
            };

            const db = getFirestore();
            const orders = db.collection('orders');

            //Store new order
            orders.add(newOrder).then(({ id }) => {
                setOrderId(id);
            });


            // //Update stock
            for (const item of newOrder.items) {
                const docRef = db.collection('items').doc(item.id);
                await docRef.get().then((doc) => {
                    docRef.update({ stock: doc.data().stock - item.quantity })
                })
            }

            flushCart();
            setPurchaseComplete(true);
        } else{
            alert("No ahi items en el carrito");
        }
    }

    const styles = {
        container: {
            padding: 20,
        },
        cartListContainer: {
            minHeight: '60vh',
            padding: 20,
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        purchaseCompleteContainer: {
            minHeight: '60vh',
            padding: 20,
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
        }
    }

    return (
        <Grid
            container
            spacing={3}
            justify="center"
            style={styles.container}
            alignItems='stretch'>
            {purchaseComplete ?
                <Grid item xs={12} sm={6}>
                    <Paper elevation={3} style={styles.purchaseCompleteContainer} >
                        <PurchaseComplete id={orderId} />
                    </Paper>
                </Grid> :
                <>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={3} style={styles.cartListContainer}>
                            <CartItemList />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={3} style={styles.cartListContainer}>
                            <Checkout onConfirm={createOrder} />
                        </Paper>
                    </Grid>
                </>}
        </Grid>
    );
}
