import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

export default function PurchaseComplete({ id }) {

    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        setOrderId(id);
    }, [id])

    return (<>
        <Typography variant="h4">Tu compra fue exitosa!</Typography>
        <Typography variant="h5">Tu código de operación es {orderId}</Typography>
        <Typography>Próximamente te llegara un mail con detalles del envío.</Typography>
    </>)
}