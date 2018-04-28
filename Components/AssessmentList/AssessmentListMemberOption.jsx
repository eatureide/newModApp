import React, { Component } from 'react'
import { connect } from 'react-redux'
import { switch_Modify , submit_point , modify_Comprehensive ,
toggle_share , modify_Typesetting , modify_Form , modify_Detail , modify_Whole , modify_Efficiency , import_obj } from './action'
import { action_fetch } from '../Loading/action'

class AssessmentListMemberOption extends Component {

    onClick_modifity = e => {
        this.props.dispatch(switch_Modify(e))
    }
    
    onModify_typesetting = e => {
       let obj = {
           id : Number(e.target.getAttribute('user_id')) ,
           value : e.target.value >= 10 ? 9.9 : e.target.value
       }
       this.props.dispatch(modify_Typesetting(obj))
    }

    onModify_form = e => {
        const obj = {
            id : Number(e.target.getAttribute('user_id')) ,
            value : e.target.value >= 10 ? 9.9 : e.target.value
        }
        this.props.dispatch(modify_Form(obj))
    }

    parameter = obj => {
        let parameter = ''
        for(let key in obj) { parameter += `${key}=${obj[key]}` }
        return parameter
    }

    submit_point = e => {
        const obj = {
            token : `${this.props.getToken}&` ,
            option_id : `${this.props.getOptionid}&` ,
            user_id : `${this.props.obj.user_id}&` ,
            typesetting : `${this.props.obj.typesetting}&` ,
            detail: `${this.props.obj.detail}&` ,
            form: `${this.props.obj.form}&` ,
            whole: `${this.props.obj.whole}&` ,
            efficiency: `${this.props.obj.efficiency}&` ,
            share: `${this.props.obj.share}`
        }
        const body = this.parameter(obj)
        this.props.dispatch(submit_point(e))
        this.props.dispatch(action_fetch('FETCH_ING'))
        fetch(`api/save?${body}`).then(response => {
            if(response.status !== 200){
                alert('提交失败，请刷新')
                window.location.reload()
            }
            return response.json()
        }).then(e => {
            console.log(`提交评分事件：${e.msg}`)
            if(e.status!==1){ alert(e.msg) }
            const { comprehensive = '' } = e
            return comprehensive
        }).then(comprehensive => {
            const data = {
                user_id : this.props.obj.user_id ,
                value : comprehensive
            }
            this.props.dispatch(modify_Comprehensive(data))
            alert('评分成功')
            this.props.dispatch(action_fetch('FETCH_END'))
        }) 
    }

    onToggle_share = e => {
        const obj = {
            id : e.user_id ,
            share : e.share === 1 ? 0 : 1
        }
        this.props.dispatch(toggle_share(obj))
    }

    onModify_detail = e => {
        const obj = {
            id : Number(e.target.getAttribute('user_id')) ,
            value : e.target.value >= 10 ? 9.9 : e.target.value
        }
        this.props.dispatch(modify_Detail(obj))
    }

    onModify_whole = e => {
        const obj = {
            id : Number(e.target.getAttribute('user_id')) ,
            value : e.target.value >= 10 ? 9.9 : e.target.value
        }
        this.props.dispatch(modify_Whole(obj))
    }

    onModify_efficiency = e => {
        const obj = {
            id : Number(e.target.getAttribute('user_id')) ,
            value : e.target.value >= 10 ? 9.9 : e.target.value
        }
        this.props.dispatch(modify_Efficiency(obj))
    }

    on_ModifyDetailed = () => {
        const e = {
            state:true,
            obj : this.props.obj
        }
        this.props.dispatch(import_obj(e))
    }

    render () {
        const { avatar } = this.props.obj
        const { name } = this.props.obj
        const { user_id } = this.props
        const { style } = this.props
        const typesetting = !this.props.obj.typesetting ? '' : this.props.obj.typesetting
        const form = !this.props.obj.form ? '' : this.props.obj.form
        const detail = !this.props.obj.detail ? '' : this.props.obj.detail
        const whole = !this.props.obj.whole ? '' : this.props.obj.whole
        const efficiency = !this.props.obj.efficiency ? '' : this.props.obj.efficiency
        const isShare = this.props.obj.share === 1 ? true : false
        const comprehensive = this.props.obj.comprehensive ? this.props.obj.comprehensive : 0

        return (
            
                <div className={ style ? 'AssessmentListMemberOption Select' : 'AssessmentListMemberOption' } 
                key="AssessmentListMemberOption">
                <div className="AssessmentListMemberAvatar" onClick = { this.on_ModifyDetailed } > <img src = { avatar } alt = { name } /> </div>
                <p className="AssessmentListMemberName"> { name } </p>
                <ul className="AssessmentListMemberBase">
                    <li>
                        <span></span>
                        <p>排版</p>
                        <input type="text" value = { typesetting } 
                        maxLength = "3"
                        placeholder = "0"
                        user_id = { user_id } onChange = { this.onModify_typesetting } />
                    </li>
                    <li>
                        <span></span>
                        <p>形式</p>
                        <input type="text" value = { form }  
                        maxLength = "3"
                        placeholder = "0"
                        user_id = { user_id } onChange = { this.onModify_form } />
                    </li>
                    <li>
                        <span></span>
                        <p>细节</p>
                        <input type="text" value = { detail } 
                        maxLength = "3"
                        placeholder = "0"
                        user_id = { user_id } onChange = { this.onModify_detail } />
                    </li>
                    <li>
                        <span></span>
                        <p>整体</p>
                        <input type="text" value = { whole } 
                        maxLength = "3"
                        placeholder = "0"
                        user_id = { user_id } onChange = { this.onModify_whole } />
                    </li>
                </ul>
                <b className="AssessmentListMemberBorder"></b>
                <ul className="AssessmentListMemberShare">
                    <li>
                        <span></span>
                        <p>效率</p>
                        <input type="text" value = { efficiency }
                        maxLength = "3"
                        placeholder = "0"
                        user_id = { user_id } onChange = { this.onModify_efficiency } />
                    </li>
                    <li>
                        <span></span>
                        <p>月会分享</p>
                        <div className="AssessmentListIsShare" onClick = { e => this.onToggle_share(this.props.obj) }>
                            <p> {isShare ? '有' : '无'} </p>
                            <b className= { isShare ? 'shareIcon' : 'hide'} > √ </b>
                        </div>
                    </li>
                    <li className="comprehensive">
                        <span></span>
                        <p>月会综合得分</p>
                        <div>{ comprehensive }</div>
                    </li>
                </ul>
                <div className="AssessmentListMemberModify" onClick = { e => this.onClick_modifity(user_id) } >修改</div>
                <div className="AssessmentListMemberConfirmPoint" 
                onClick = { e => this.submit_point(user_id) } >确定评分</div>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return state
}

AssessmentListMemberOption = connect(mapStateToProps)(AssessmentListMemberOption)

export default AssessmentListMemberOption