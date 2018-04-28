import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toggle_group } from './action'
import GroupList from './GroupList.jsx'
import { action_fetch } from '../Loading/action'
import { get_menberList} from './action'

class AssessmentListMutualEvaluation extends Component {

    constructor (props) {
        super (props)
        this.state = {
            group : this.props.groupList.currentTableName
        }
    }

    parameter = obj => {
        let parameter = ''
        for(let key in obj) { parameter += `${key}=${obj[key]}` }
        return parameter
    }

    on_nomalMenberList = () => {

        const obj = {
            token : `${this.props.getToken}&` ,
            option_id : `${this.props.getOptionid}&` ,
            department : `${encodeURIComponent('设计部')}&` ,
            group : encodeURIComponent(this.state.group)
        }

        const body = this.parameter(obj)
        
        this.props.dispatch(action_fetch('FETCH_ING'))
        fetch(`api/view?${body}`).then(response => {
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
        })
    }

    on_nomalMenber = () => {
        console.log(this.props.getMenberList[0])
    }

    on_toggleGroup = e => {
        this.props.dispatch(toggle_group (e))
        this.setState({ group : this.props.groupList.tabs[e-1].tableName },()=>{
            this.on_nomalMenberList()
            this.on_nomalMenber()
        })
    }

    render () {  
        
        // const { name = '' } = this.props.obj.obj
        // const { share_name } = this.props
        const groupList  = this.props.groupList
        // const { currentTableName } = this.props.groupList
        // console.log(groupList)
        // console.log(currentTableName)

        return (
            <div className="AssessmentListMutualEvaluation" >
                <span className="background"></span>
                {/* <h1>{`${name}${share_name}月会考核`}</h1> */}
                <div className="optionBox">
                    <ul className="GoupOptionMenu">
                        {
                           groupList.tabs.map((item,key)=>{
                               return <GroupList key = { item.id } 
                               currentIndex = { groupList.currentIndex } {...item} onClick = { this.on_toggleGroup } />
                           })
                       }
                    </ul>
                </div>
               
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

AssessmentListMutualEvaluation = connect(mapStateToProps)(AssessmentListMutualEvaluation)

export default AssessmentListMutualEvaluation