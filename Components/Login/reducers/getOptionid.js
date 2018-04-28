const getOptionid = (state = 14 , action) => {
    switch (action.type) {
        case 'GET_OPTIONID' :
            return action.id
        default :
            return state
    }
}

export default getOptionid