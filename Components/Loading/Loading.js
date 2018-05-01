export const isLoding = (state='FETCH_ING',action) => {
    switch(action.type) {
        case 'FETCH_ING' :
            return 'FETCH_ING'
        case 'FETCH_END' :
            return 'FETCH_END'
        default :
            return state
    }
}

export default isLoding