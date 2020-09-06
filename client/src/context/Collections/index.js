import React, { useState, useEffect, createContext } from 'react'
export const CollectionContext = createContext();

export default function CollctionProvider() {
    return (
        <CollectionContext.Provider value={{}}>
            {this.children}
        </CollectionContext.Provider>
    )
}
