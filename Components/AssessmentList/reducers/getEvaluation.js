
const nomalIndex = {
    import_obj_index : 0 ,
    evaluation_state : false
}

const getEvaluationIndex = (state = nomalIndex , action) => {
    switch (action.type) {
        case 'IMPORT_OBJ_INDEX' :
            return {
                import_obj_index : action.index ,
                evaluation_state : !state.evaluation_state
            }
        case 'RESET_OBJ_INDEX' :
            return {
                import_obj_index : nomalIndex.import_obj_index ,
                evaluation_state : nomalIndex.evaluation_state
            }
        case 'RESET_EVALUATION_OBJ_INDEX' :
            return {
                import_obj_index : nomalIndex.import_obj_index ,
                evaluation_state : !nomalIndex.evaluation_state
            }
        default :
            return state
    }
}

export default getEvaluationIndex