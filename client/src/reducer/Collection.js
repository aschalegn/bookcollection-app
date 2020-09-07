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
            state = { ...state, collection: state.filter(collection => collection.name !== payload) };
            break;
        case "RENAME_COLLECTION":
            state = {
                ...state, collection: state.map(collection => {
                    if (collection.name === payload.prevName)
                        return [...collection, collection.name = payload.newName]
                    else return collection
                })
            };
            break
        case "ADD_TO_COLLECTION":
            state = {
                ...state, collection: state.collection.map(col => {
                    if (col.name === payload.name)
                        return { ...col, books: [...col.books, { title: payload.title, author: payload.autho }] }
                    else return col
                })
            }
            break
        case "REMOVE_FROM_COLLECTION":
            return

        default:
            break;
    }
    console.log(state);
    localStorage.collection = JSON.stringify(state.collection);
    return state
}