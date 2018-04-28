const nomalState = {
    tabs:[
        {tabName:"月会考核",id:1} ,
        {tabName:"半年汇总考核",id:2} ,
        {tabName:"排行榜",id:3} ,
        {tabName:"人员管理",id:4} ,
        {tabName:"系统消息",id:5}
    ],
    currentIndex : 1
}

const optionList = (state = nomalState,action)=> {
    switch (action.type) {
        case 'TOGGLE_OPTION' :
        return {
            tabs : state.tabs ,
            currentIndex : action.id
        }
        default :
        return state
    }
}

export default optionList