export const get_menberList = data => {
    return {
        type : 'GET_MEMNERLIST' ,
        data
    }
}

export const get_optionId = id => {
    return {
        type : 'GET_OPTIONID' ,
        id
    }
}

export const switch_Modify = id => {
    return {
        type : 'SWITCH_MODIFY',
        id
    }
}

export const submit_point = id => {
    return {
        type : 'SUBMIT_POINT' ,
        id
    }
}

export const toggle_share = obj => {
    return {
        type : 'TOGGLE_SHARE' ,
        id : obj.id ,
        share : obj.share
    }
}

export const toggle_group = id => {
    return {
        type : 'TOGGLE_GOUP',
        id
    }
}

export const modify_Typesetting = data => {
    return {
        type : 'MODIFY_TYPESETTING' ,
        id : data.id ,
        value : data.value
    }
}

export const modify_Form = data => {
    return {
        type : 'MODIFY_FORM' ,
        id : data.id ,
        value : data.value
    }
}

export const modify_Detail = data => {
    return {
        type : 'MODIFY_DETAIL' ,
        id : data.id ,
        value : data.value
    }
}

export const modify_Whole = data => {
    return {
        type : 'MODIFY_WHOLE' ,
        id : data.id ,
        value : data.value
    }
}

export const modify_Efficiency = data => {
    return {
        type : 'MODIFY_EFFICIENCY' ,
        id : data.id ,
        value : data.value
    }
}

export const modify_Comprehensive = data => {
    return {
        type : 'MODIFY_COMPREHENSIVE' ,
        id : data.user_id ,
        value : data.value
    }
}

export const import_obj_index = index => {
    return {
        type : 'IMPORT_OBJ_INDEX' ,
        index
    }
}

export const reset_obj_index = () => {
    return {
        type : 'RESET_OBJ_INDEX' 
    }
}

export const reset_evaluation_obj_index = () => {
    return {
        type : 'RESET_EVALUATION_OBJ_INDEX' 
    }
}

export const reset_group_list = () => {
    return {
        type : 'RESET_GROUP_LIST' 
    }
}

export const closeAssessmentListMutualEvaluation = () => {
    return {
        type : 'CLOSEASSESSMENTLISTMUTUALEVALUATION'
    }
}