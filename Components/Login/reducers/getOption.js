const getOption = (state=[],action) => {
    switch(action.type) {
        case 'GET_OPTION' :
            return action.data
        default :
            return state
    }
}

export default getOption