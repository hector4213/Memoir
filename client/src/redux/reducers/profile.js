
export const initialState = {}

const profile = (state = initialState, action) => {
    switch (action.type) {
        case 'PROFILE_ERROR':
            return {...state, error:action.payload}

        case 'REMOVE_PROFILE':
            return {}
        
        case 'ADD_PROFILE':
            return {...state, ...action.payload}

        default:
            return state
    }
}

export default profile