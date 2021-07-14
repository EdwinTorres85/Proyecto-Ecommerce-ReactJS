import React, { useState, useEffect } from 'react'
import ItemDetail from './ItemDetail'
import ItemDetailSkeleton from './ItemDetailSkeleton'
import { useParams } from 'react-router-dom'
import { getFirestore } from '../firebase'
import { Grid, Typography } from '@material-ui/core'

export default function ItemDetailContainer() {

    //Routing params
    let { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [detailData, setDetailData] = useState(null);

    useEffect(() => {
        setLoading(true);

        const db = getFirestore();
        const itemCollection = db.collection("items");
        const item = itemCollection.doc(id)

        item.get().then((doc) => {
            if (!doc.exists) {
                console.log('no results');
            } else {
                setDetailData({ id: doc.id, ...doc.data() });
            }
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }, [id]); //Refresh on id change

    const styles = {
        container: {
            padding: 20,
        },
    }

    return (
        <Grid
            container
            spacing={3}
            justify="center"
            style={styles.container}
            alignItems='stretch'>
            {
                
                loading ?
                <ItemDetailSkeleton />
                    :
                    <>
                        {
                            detailData ?
                                <ItemDetail itemData={detailData} />
                                :
                                <Typography color="textSecondary">
                                    No encontramos el producto
                                </Typography>
                        }
                    </>
            }
            </Grid>
    )
}