import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get_menberList,toggle_group,get_optionId,reset_obj_index,reset_group_list} from './action'
import { action_fetch } from '../Loading/action'
import AssessmentListMemberOption from './AssessmentListMemberOption.jsx'
import AssessmentListMutualEvaluation from './AssessmentListMutualEvaluation.jsx'
import Loading from '../Loading'
import GroupList from './GroupList.jsx'
import './AssessmentList.css'

class AssessmentList extends Component {

    constructor (props) {
        super (props)
        this.state = {
            option_caption : '1月-2月' ,
            option_id : 14 ,
            group : '第一组'
        }
    }

    on_ToggleTime = e => {
        this.setState({ 
            option_caption : e.share_name ,
            option_id : e.id
        },()=>{
            this.props.dispatch(get_optionId(this.state.option_id))
            this.on_nomalMenberList()
        })
    }

    parameter = obj => {
        let parameter = ''
        for(let key in obj) { parameter += `${key}=${obj[key]}` }
        return parameter
    }

    on_nomalMenberList = () => {
        const obj = {
            token : `${this.props.getToken}&` ,
            option_id : `${this.state.option_id}&` ,
            department : `${encodeURIComponent('设计部')}&` ,
            group : encodeURIComponent(this.state.group)
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

    on_toggleGroup = e => {
        this.props.dispatch(toggle_group (e))
        const tableName = this.props.groupList.tabs[e-1].tableName
        this.setState({ group:tableName } , () => { 
            this.on_nomalMenberList()
            this.props.dispatch(reset_obj_index())
         })
    }

    componentDidMount () {
        this.on_nomalMenberList () 
        this.props.dispatch(reset_obj_index())
        this.props.dispatch(reset_group_list())
    }

    render () {
        
        const { getOption = '' } = this.props
        const getMenberList = this.props.getMenberList
        const { groupList = [] } = this.props
        const { isLoading = false } = this.props
        const { getEvaluationIndex = {} } = this.props

        return (
            <div className="AssessmentList">
                { 
                    getEvaluationIndex.evaluation_state && 
                    < AssessmentListMutualEvaluation
                        share_name = { this.state.option_caption } 
                        current_group = { this.props.groupList.currentTableName } 
                    /> 
                }
                {/* < Loading /> */}
                { isLoading === 'FETCH_ING' && < Loading /> }
                <span className="background"></span>
                <h1>{ this.state.option_caption }月会考核</h1>
                <div className="optionBox">
                    <div className="optionMenu">
                        <p> { this.state.option_caption } </p>
                        <span><b></b></span>
                        <ul className="TimeOptionMenu">
                            {
                                getOption && getOption.map((item,key) => {
                                    return <li key = { item.id }  
                                    data-id = { item.id } 
                                    onClick = { e => this.on_ToggleTime(item) } > { item.share_name } </li>
                                })
                            }
                        </ul>
                    </div>
                    <ul className="GoupOptionMenu">
                       {
                           groupList.tabs.map((item,key)=>{
                               return <GroupList key = { item.id } 
                               currentIndex = { groupList.currentIndex } {...item} 
                               onClick = { this.on_toggleGroup }  />
                           })
                       }
                    </ul>
                </div>
                <div className="AssessmentListBox">
                    <span className="Mask"></span>
                    <div className="AssessmentListMember">
                        {
                            getMenberList && getMenberList.map((item,key)=> {
                                return <AssessmentListMemberOption 
                                key = { item.user_id } 
                                data_index = { key }
                                style = { item.select }
                                user_id = { item.user_id } obj = { item } />
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

AssessmentList = connect(mapStateToProps)(AssessmentList)

export default AssessmentList