import React, { useState } from 'react'
import '@firebase/firestore';
import { Box, Button, makeStyles, ButtonGroup, TextField } from '@material-ui/core';
import { CreditCard, LocalAtm } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            // margin: theme.spacing(0),
            // width: '50ch',
        },
    },
}));

export default function Checkout({ onConfirm }) {

    const [payment, setPayment] = useState('visa');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirmation, setEmailConfirmation] = useState('')
    const [phone, setPhone] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiration, setCardExpiration] = useState('');
    const [paypalUser, setPaypalUser] = useState('');

    const classes = useStyles();

    function onSetPaymentMethod(selectedPaymentMethod) {
        setPayment(selectedPaymentMethod)
    }

    function getPaymentMethod() {
        switch (payment) {
            case 'visa':
            case 'mastercard':
                if (cardNumber != "" && cardExpiration != "") {
                    return {
                        method: payment,
                        cardNumber: cardNumber,
                        cardExpiration: cardExpiration
                    }
                }
                break;
            case 'paypal':
                if (paypalUser != "") {
                    return {
                        method: payment,
                        username: paypalUser
                    }
                }
        }
        return null;
    }

    function isValid() {
        return name != "" &&
            phone != "" &&
            email != "" &&
            email == emailConfirmation &&
            getPaymentMethod() != null
    }

    function onClickConfirm() {
        onConfirm({
            name: name,
            email: email,
            phone: phone,
            paymentMethod: getPaymentMethod()
        })
    }

    return (
        <Box display="flex" flexDirection="column" justifyContent="center">
            <form className={classes.root} noValidate autoComplete="off" display="flex">
                <TextField value={name} onInput={e => setName(e.target.value)} id="outlined-basic" label="Nombre" variant="outlined" fullWidth margin="normal" />
                <TextField value={phone} onInput={e => setPhone(e.target.value)} id="outlined-basic" label="Teléfono" variant="outlined" fullWidth margin="normal" />
                <TextField value={email} onInput={e => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" fullWidth margin="normal" />
                <TextField value={emailConfirmation} onInput={e => setEmailConfirmation(e.target.value)} id="outlined-basic" label="Confirmación de Email" variant="outlined" fullWidth margin="normal" />
                <ButtonGroup aria-label="outlined primary button group" fullWidth>
                    <Button onClick={() => onSetPaymentMethod('visa')}
                        variant="contained"
                        startIcon={<CreditCard />}
                        size='small'>
                        Visa
                    </Button>
                    <Button onClick={() => onSetPaymentMethod('paypal')}
                        variant="contained"
                        style={{ backgroundColor: '#3B7BBF' }}
                        startIcon={<LocalAtm />}
                        size='small'>
                        Paypal
                    </Button>
                    <Button onClick={() => onSetPaymentMethod('mastercard')}
                        variant="contained"
                        style={{ backgroundColor: '#ff5f00' }}
                        startIcon={<CreditCard />}
                        size='small'>
                        Mastercard
                    </Button>
                </ButtonGroup>
                {
                    (payment == 'visa' || payment == 'mastercard') ?
                        <>
                            <TextField value={cardNumber} onInput={e => setCardNumber(e.target.value)} id="outlined-basic" label='Número de tarjeta' variant="outlined" fullWidth margin="normal" />
                            <TextField value={cardExpiration} onInput={e => setCardExpiration(e.target.value)} id="outlined-basic" label='Vencimiento' variant="outlined" fullWidth margin="normal" />
                        </>
                        :
                        <TextField value={paypalUser} onInput={e => setPaypalUser(e.target.value)} id="outlined-basic" label='Usuario paypal' variant="outlined" fullWidth margin="normal" />

                }
            </form>
            <Button variant="contained" color="primary" disabled={!isValid()} onClick={onClickConfirm}>Confirmar</Button>
        </Box >
    );
}
