const getMenberList = (state=[],action) => {
    switch (action.type) {
        //更新fetch返回来的成员列表
        case 'GET_MEMNERLIST' :
            return [ ...action.data ]
        case 'SWITCH_MODIFY' :
        //根据参数返回新字段select 用于切换成员列表的style
            return state.map(todo => todo.user_id === action.id ? { ...todo, select : true } : { ...todo, select : false })
        case 'SUBMIT_POINT' :
        //提交评分
            return state.map( todo => todo.user_id === action.id ? { ...todo , select : false } : { ...todo })
        case 'TOGGLE_SHARE' :
        //切换分享状态
            return state.map( todo => todo.user_id === action.id  ? { ...todo, share : action.share } : { ...todo })
        case 'MODIFY_TYPESETTING' :
        //调整排版
            return state.map( todo => todo.user_id === action.id  ? { ...todo, typesetting : action.value } : { ...todo })
        case 'MODIFY_FORM' :
        //调整形式
            return state.map( todo => todo.user_id === action.id  ? { ...todo, form : action.value } : { ...todo })
        case 'MODIFY_DETAIL' :
        //调整细节
            return state.map( todo => todo.user_id === action.id  ? { ...todo, detail : action.value } : { ...todo })
        case 'MODIFY_WHOLE' :
        //调整整体
            return state.map( todo => todo.user_id === action.id  ? { ...todo, whole : action.value } : { ...todo })
        case 'MODIFY_EFFICIENCY' :
        //调整效率
            return state.map( todo => todo.user_id === action.id  ? { ...todo, efficiency : action.value } : { ...todo })
        case 'MODIFY_COMPREHENSIVE' :
        //月会综合评分
            return state.map( todo => todo.user_id === action.id  ? { ...todo, comprehensive : action.value } : { ...todo })
        default :
            return state
    }
}

export default getMenberList