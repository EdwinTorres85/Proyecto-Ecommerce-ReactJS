import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width:'100%',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent:'center',
        flexDirection:"column"
    },
    textInput: {
        borderRadius: 0,
    },
    buttonGroup: {
        margin: "auto",
    },
    title: {
        fontSize: 18,
        textAlign: "center",
    },
    pos: {
        marginBottom: 12,
    },
});

export default function ItemCount({ id, stock, initial, onAdd }) {

    const [itemId, setItemId] = useState(0);
    const [itemCount, setItemCount] = useState(0);

    //On component initialize
    useEffect(() => {
        setItemId(id);
        setItemCount(initial);
    }, [id, initial])

    function onIncrement() {
        if (itemCount < stock) {
            setItemCount(itemCount + 1);
        }
    }
    function onDecrement() {
        if (itemCount > 0) {
            setItemCount(itemCount - 1);
        }
    }
    function onConfirmAdd(){
        onAdd(itemCount)
    }

    const CustomTextField = withStyles({
        root: {
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderRadius: `0`,
                },
            },
        },
    })(TextField);

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                        Agregar al carrito
                    </Typography>
                    <ButtonGroup className={classes.buttonGroup} color="primary" aria-label="outlined primary button group">
                        <Button onClick={onDecrement}>-</Button>
                        <CustomTextField value={itemCount} />
                        <Button onClick={onIncrement}>+</Button>
                    </ButtonGroup>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="secondary" onClick={onConfirmAdd}>Agregar</Button>
                </CardActions>
            </Card>
    )
}