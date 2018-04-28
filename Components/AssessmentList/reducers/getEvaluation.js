const nomalState = {
    obj : {} ,
    evaluation_state : false
}


const getEvaluation = (state = nomalState , action) => {
    switch (action.type) {
        case 'IMPORT_OBJ' :
            return {
                obj : action.obj ,
                evaluation_state : action.state
            }
        default :
            return state
    }
}

export default getEvaluation