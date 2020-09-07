import React, { createContext, useReducer } from 'react'
import { collectionReducer } from '../../reducer/Collection';

export const CollectionContext = createContext();

export default function CollctionProvider(props) {
    const initialState = {
        collection: localStorage.collection ? JSON.parse(localStorage.collection) : []
    }

    const [collections, collectionDispach] = useReducer(collectionReducer, initialState);

    return (
        <CollectionContext.Provider value={{ collections, collectionDispach }}>
            {props.children}
        </CollectionContext.Provider>
    )
}
