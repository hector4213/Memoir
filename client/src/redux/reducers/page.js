
export const initialState = {
    modal: false
}

const page = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return {...state, modal:action.payload}

        case 'SET_ALL_STORIES':
            return {...state, stories:action.payload}

        case 'CURRENT_STORY':
            return {...state, current:{ story: action.payload }}

        case 'CURRENT_ENTRY':
            return {...state, current:{entry: action.payload}}

        default:
            return state
    }
}

export default page