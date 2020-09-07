export const collectionReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case "CREATE_COLLECTION":
            state = {
                ...state, collection: [
                    ...state.collection, payload
                ]
            }
            break;
        case "DELETE_COLLECTION":
            state = { ...state, collection: state.collection.filter(col => col.name !== payload) };
            break;
        case "RENAME_COLLECTION":
            state = {
                ...state, collection: state.collection.map(col => {
                    if (col.name === payload.prevName)
                        return [...col, col.name = payload.newName]
                    else return col
                })
            };
            break
        case "ADD_TO_COLLECTION":
            state = {
                ...state, collection: state.collection.map(col => {
                    if (col.name === payload.name)
                        return {
                            ...col, books: [...col.books, {
                                title: payload.title,
                                author: payload.author,
                                olid: payload.olid
                            }]
                        }
                    else return col
                })
            }
            break
        case "REMOVE_FROM_COLLECTION":
            state = {
                ...state, collection: state.collection.map(col => {
                    if (col.name === payload.name) {
                        return { ...col, books: col.books.filter(book => book.olid[0] !== payload.olid[0]) }
                    } else return col
                })
            }
            break
       
        default:
            break;
    }

    localStorage.collection = JSON.stringify(state.collection);
    console.log(state);
    return state
}