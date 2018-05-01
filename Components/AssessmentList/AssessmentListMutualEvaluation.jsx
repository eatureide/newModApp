import React, { Component } from 'react'
import { connect } from 'react-redux'
import GroupList from './GroupList.jsx'
import { toggle_group } from './action'
import { action_fetch } from '../Loading/action'
import { get_menberList , reset_evaluation_obj_index} from './action'
import MutualEvaluationBox from './MutualEvaluationBox.jsx'

class AssessmentListMutualEvaluation extends Component {

    parameter = obj => {
        let parameter = ''
        for(let key in obj) { parameter += `${key}=${obj[key]}` }
        return parameter
    }

    on_nomalMenberList = e => {

        const obj = {
            token : `${this.props.getToken}&` ,
            option_id : `${this.props.getOptionid}&` ,
            department : `${encodeURIComponent('设计部')}&` ,
            group : encodeURIComponent(this.props.groupList.tabs[e-1].tableName)
        }

        const body = this.parameter(obj)
        
        this.props.dispatch(action_fetch('FETCH_ING'))
        fetch(`https://modiarts.com/api/view?${body}`).then(response => {
            if(response.status !== 200){
                alert('获取选项列表失败，请刷新')
                window.location.reload()
            }
            return response.json()
        }).then(e => {
            if(e.status !== 1 && e.status !== 2){
                alert('获取选项列表失败，请刷新')
                window.location.reload()
            }else if(e.status === 2){
                const data = []
                return data
            }else{
                console.log(`月会考核组别事件请求：${e.msg}`)
                const { data = [] } = e
                return data
            }
        }).then( data =>{
            this.props.dispatch(action_fetch('FETCH_END'))
            return data
        }).then(data=> {  
            this.props.dispatch(get_menberList(data))
            data.length === 0 && alert('该组暂无成员')
        })
    }

    on_toggleGroup = (e) => {
        this.props.dispatch(toggle_group (e))
        this.on_nomalMenberList(e)
        this.props.dispatch(reset_evaluation_obj_index())
    }

    render () {  

        const { share_name = '' } = this.props 
        const groupList  = this.props.groupList
        const index = this.props.getEvaluationIndex.import_obj_index ? this.props.getEvaluationIndex.import_obj_index : 0
        const obj = this.props.getMenberList[index] ? this.props.getMenberList[index] : ''
        const { name = '' } = obj
        
        return (
            <div className="AssessmentListMutualEvaluation" >
                <span className="background"></span>
                <h1>{`${name}${share_name}月会考核`}</h1>
                <div className="optionBox">
                    <ul className="GoupOptionMenu">
                        {
                           groupList.tabs.map((item,key)=>{
                               return <GroupList key = { item.id } {...item} 
                               currentIndex = { groupList.currentIndex }
                               onClick = { this.on_toggleGroup } 
                               />
                           })
                       }
                    </ul>
                </div>

                <MutualEvaluationBox Menber = { obj } />
               
            </div>
        )
    }
}

const mapStateToProps = state => {
    
    return state
}

AssessmentListMutualEvaluation = connect(mapStateToProps)(AssessmentListMutualEvaluation)

export default AssessmentListMutualEvaluation