
export const initialState = {
    modal: false
}

const page = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return {...state, modal:action.payload}

        default:
            return state
    }
}

export default page