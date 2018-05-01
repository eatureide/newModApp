export const getToken = token => {
    return {
        type : 'GET_TOKEN' ,
        token
    }
}

export const getOption = data => {
    return {
        type : 'GET_OPTION' ,
        data
    }
}