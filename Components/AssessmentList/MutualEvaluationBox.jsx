import React, { Component } from 'react'
import { connect } from 'react-redux'
import { modify_Typesetting , modify_Form , modify_Detail , modify_Whole , modify_Efficiency ,toggle_share , closeAssessmentListMutualEvaluation , import_obj_index , modify_Comprehensive} from './action'
import { action_fetch } from '../Loading/action'

class MutualEvaluationBox extends Component {

    constructor (props) {
        super(props)
        this.index = this.props.getEvaluationIndex.import_obj_index
        this.menber = this.props.Menber
        this.state = {
            share_text : [
                { name:'组员互评',id:1 } ,
                { name:'月会分享',id:2 }
            ],
            currentIndex : 1
        }
    }

    on_toggleText = e => {
        this.setState({currentIndex:e})
    }

    onModify_typesetting = e => {
        let obj = {
            id : Number(e.target.getAttribute('data-id')) ,
            value : e.target.value >= 10 ? 9.9 : e.target.value
        }
        this.props.dispatch(modify_Typesetting(obj))
    }

    onModify_form = e => {
        const obj = {
            id : Number(e.target.getAttribute('data-id')) ,
            value : e.target.value >= 10 ? 9.9 : e.target.value
        }
        this.props.dispatch(modify_Form(obj))
    }

    onModify_detail = e => {
        const obj = {
            id : Number(e.target.getAttribute('data-id')) ,
            value : e.target.value >= 10 ? 9.9 : e.target.value
        }
        this.props.dispatch(modify_Detail(obj))
    }

    onModify_whole = e => {
        const obj = {
            id : Number(e.target.getAttribute('data-id')) ,
            value : e.target.value >= 10 ? 9.9 : e.target.value
        }
        this.props.dispatch(modify_Whole(obj))
    }

    onModify_efficiency = e => {
        const obj = {
            id : Number(e.target.getAttribute('data-id')) ,
            value : e.target.value >= 10 ? 9.9 : e.target.value
        }
        this.props.dispatch(modify_Efficiency(obj))
    }

    onToggle_share = e => {
        const obj = {
            id : e.user_id ,
            share : e.share === 1 ? 0 : 1
        }
        this.props.dispatch(toggle_share(obj))
    }

    closeAssessmentListMutualEvaluation = e => {
        this.props.dispatch(closeAssessmentListMutualEvaluation('CLOSEASSESSMENTLISTMUTUALEVALUATION'))
    }

    componentWillReceiveProps(nextProps){
        this.menber.user_id !== nextProps.getMenberList[0].user_id && (this.index = 0)
    }

    on_prev_next_menber = e => {
        const event = e.target.getAttribute('data-event')
        const { getMenberList } = this.props
        event === 'next' && this.index < getMenberList.length -1 && this.index ++
        event === 'prev' && this.index <= getMenberList.length -1 && this.index !== 0 && this.index--
        this.props.dispatch(import_obj_index(this.index))
    }

    parameter = obj => {
        let parameter = ''
        for(let key in obj) { parameter += `${key}=${obj[key]}` }
        return parameter
    }

    on_submit_point = () =>{
        const { Menber } = this.props
        const obj = {
            token : `${this.props.getToken}&` ,
            option_id : `${this.props.getOptionid}&` ,
            user_id : `${Menber.user_id}&` ,
            typesetting : `${Menber.typesetting}&` ,
            detail: `${Menber.detail}&` ,
            form: `${Menber.form}&` ,
            whole: `${Menber.whole}&` ,
            efficiency: `${Menber.efficiency}&` ,
            share: `${Menber.share}`
        }
        const body = this.parameter(obj)
        this.props.dispatch(action_fetch('FETCH_ING'))
        fetch(`https://modiarts.com/api/save?${body}`).then(response => {
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
                user_id : Menber.user_id ,
                value : comprehensive
            }
            this.props.dispatch(modify_Comprehensive(data))
            alert('评分成功')
            this.props.dispatch(action_fetch('FETCH_END'))
        }) 
    }
  
    render () {
        const { Menber } = this.props
        const comprehensive = Menber.comprehensive ? Menber.comprehensive : 0
        const avatar = Menber.avatar ? Menber.avatar : null
        const name = Menber.name ? Menber.name : ''
        const typesetting = Menber.typesetting ? Menber.typesetting : ''
        const form = Menber.form ? Menber.form : ''
        const detail = Menber.detail ? Menber.detail : ''
        const whole = Menber.whole ? Menber.whole : ''
        const efficiency = Menber.efficiency ? Menber.efficiency : ''
        const share = Menber.share
        const user_id = Menber.user_id
        const share_text = Menber.share_text ? Menber.share_text : []
        const reviews = Menber.reviews ? Menber.reviews : []
        console.log(share_text)

        return (
            <div className="MutualEvaluationBox">
                <b className="closeAssessmentListMutualEvaluation" onClick={ this.closeAssessmentListMutualEvaluation }> ✕ </b>
                <div className="LeftMenberMessage">
                    <div className="LeftMenberMessageAvatar">
                        <div className="Avatar" 
                        style={{'background':`url(${ avatar }) center no-repeat`}}>
                            <p> { name } </p>
                        </div>
                        <div className="Comprehensive">
                            <h2> { comprehensive } </h2>
                            <p>月会综合得分</p>
                        </div>
                    </div>
                    <ul className="LeftMenberMessageScoreList">
                        <li className="ScoreList">
                            <span></span>
                            <p>排版</p>
                            <input type="text" placeholder="0" 
                            value = { typesetting }
                            maxLength = "3"
                            data-id = { user_id }
                            onChange = { this.onModify_typesetting } />
                        </li>
                        <li className="ScoreList">
                            <span></span>
                            <p>形式</p>
                            <input type="text" placeholder="0" value = { form }
                             maxLength = "3"
                            data-id = { user_id }
                            onChange = { this.onModify_form } />
                        </li>
                        <li className="ScoreList">
                            <span></span>
                            <p>细节</p>
                            <input type="text" placeholder="0" value = { detail }
                            maxLength = "3"
                            data-id = { user_id }
                            onChange = { this.onModify_detail } />
                        </li>
                        <li className="ScoreList">
                            <span></span>
                            <p>整体</p>
                            <input type="text" placeholder="0" value = { whole }
                            maxLength = "3"
                            data-id = { user_id }
                            onChange = { this.onModify_whole } />
                        </li>
                    </ul>
                    <ul className="LeftMenberMessageScoreList-02">
                        <li>
                            <p>效率 <span>（完成的任务数）</span> </p>
                            <input type="text" placeholder="0"value={ efficiency }
                            maxLength = "3"
                            data-id = { user_id }
                            onChange = { this.onModify_efficiency } />
                        </li>
                        <li>
                            <p>月会分享</p>
                            <div className="LeftMenberMessageIsShare" 
                            data-id = { user_id }
                            onClick = { e => this.onToggle_share( Menber ) }>
                                <b className={ share === 1 ? 'show' : 'hide' }>√</b>
                            </div>
                        </li>
                    </ul>
                    <div className="LeftMenberOption">
                        <p data-event="prev" onClick = {this.on_prev_next_menber}> &lt; 上一个 </p>
                        <div className="LeftMenberOptionButton"
                        onClick ={ this.on_submit_point }>确定评分</div>
                        <p data-event="next" onClick = {this.on_prev_next_menber}> 下一个 &gt; </p>
                    </div>
                </div>
                <div className="RightMenberReviews">
                    <ul className="RightMenberTbale">
                        { 
                            this.state.share_text.map((item,key)=>{
                                return <li key = { item.id } className= { item.id === this.state.currentIndex ? 
                                    'reviewsCurr' : 'reviews'} onClick ={ e =>this.on_toggleText(item.id)}> {item.name} </li>
                            })
                        }
                    </ul>
                    <div className={this.state.currentIndex === 1 ? 'show':'hide'}>
                        <div className="RightMenberBox">
                            <ul className="RightMenberTips">
                                <li>姓名</li>
                                <li>排版</li>
                                <li>形式</li>
                                <li>细节</li>
                                <li>整体</li>
                                <li>平均分</li>
                            </ul>    
                        </div>  
                    </div>
                    <div className={this.state.currentIndex === 2 ? 'show':'hide'}>
                        {
                            share_text.map((item,key)=>{
                                return (
                                    <div className="body" key = { key }>
                                        <h3>{ item.title }</h3>
                                        <p>{ item.body }</p>
                                    </div>
                                )
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

MutualEvaluationBox = connect(mapStateToProps)(MutualEvaluationBox)

export default MutualEvaluationBox
