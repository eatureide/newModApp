const nomalState = {
    tabs:[
        {tableName : '第一组',id:1},
        {tableName : '第二组',id:2},
        {tableName : '第三组',id:3}
    ],
    currentIndex : 1,
    currentTableName : '第一组'
}

const groupList = (state = nomalState , action) => {
    switch (action.type) {
        case 'TOGGLE_GOUP' :
            return {
                tabs : state.tabs ,
                currentIndex : action.id ,
                currentTableName : state.tabs[action.id-1].tableName
            }
        case  'RESET_GROUP_LIST' :
            return nomalState
        default :
            return state
    }
}

export default groupList