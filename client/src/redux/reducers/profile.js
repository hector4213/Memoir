
export const initialState = {}

const profile = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PROFILE':
            return {...state, ...action.payload}

        default:
            return state
    }
}

export default profile