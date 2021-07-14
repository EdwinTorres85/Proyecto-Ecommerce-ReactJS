import React, { useEffect, useState } from 'react';
import ItemList from './ItemList';
import ItemListSkeleton from './ItemListSkeleton';
import { useParams } from 'react-router-dom'
import { getFirestore } from '../firebase'

function ItemListContainer({ title, onAdd }) {

    //Routing params
    let { categoryId } = useParams();

    const [loading, setLoading] = useState(false);
    const [itemList, setItemList] = useState([])

    useEffect(() => {
        setLoading(true);
        const db = getFirestore();
        const itemCollection = db.collection("items");
        const filteredCollection = categoryId ? itemCollection.where("category", "==", categoryId) : itemCollection;

        filteredCollection.get().then((querySnapshot) => {
            if (querySnapshot.size === 0) {
                console.log('no results');
            }
            const filteredItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setItemList(filteredItems);
        }, err => {
            console.log(err);
        }).finally(result => {
            setLoading(false);
        });
    }, [categoryId]);

    return (
        <>
            { loading ? <ItemListSkeleton /> : <ItemList itemDataList={itemList} onAdd={onAdd} />}
        </>
    );
}

export default ItemListContainer