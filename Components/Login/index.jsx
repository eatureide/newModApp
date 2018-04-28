import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getToken , getOption} from './action'
import './Login.css'

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            user_switch : false ,
            passWord : '' ,
            loginState : '登录' ,
            canLogin : false
        }
    }

    switch_login = () => {
        this.setState({ user_switch : !this.state.user_switch })
    }

    input_Password = e => {
        const value = e.target.value
        this.setState ({ passWord : value })
    }

    on_Login = () => {
        this.setState({loginState:'登录中...'})
        fetch(`api/m_login?pwd=${this.state.passWord}`)
        .then(response => {
            if(response.status !== 200){
                alert('登陆失败，请刷新')
                window.location.reload()
            }
            return response.json()
        }).then(e => {
            const { status = '' } = e
            const { token = '' } = e
            const { msg = '' } = e
            if(status !== 1) { 
                alert(msg)  
                this.setState({loginState:'登录'})
            }
            return token
        }).then(token => {
            this.props.dispatch(getToken(token))
        })
    }

    on_getOption = () => {
        fetch(`api/get_option`).then(response => {
            if(response.status !== 200){
                alert('获取选项列表失败，请刷新')
                window.location.reload()
            }
            return response.json()
        }).then(e => {
            const { data = [] } = e
            return data
        }).then(data => {
            this.props.dispatch(getOption(data))
        })
    }

    on_keyDownLogin = () => { //回车登录
        let on_Login = this.on_Login
        document.onkeydown = e => { 
            const { getOption } = this.props
            let keyNum = window.event ? e.keyCode : e.which
            keyNum === 13 && getOption.length > 0 && on_Login()
        }
    }

    componentDidMount () {
        this.on_getOption()
        this.on_keyDownLogin()
    }

    render() {
        const { getOption } = this.props //选项列表
        return (
            <div className="Login_Box">
                <div className="Login">
                    <div className="LoginElement"><span></span></div>
                    <div className="LoginUser">
                        <span className={ this.state.user_switch ? 'LoginToggle UserLogin' : 'LoginToggle' } onClick = { this.switch_login } ></span>
                        <p className="LoginWelcome">欢迎登录魔笛内部考核系统</p>
                        <p className="LoginWelcomeAther">Design Department</p>
                        <div className={ this.state.user_switch ? 'LoginAdmin hide' : 'LoginAdmin'} >
                            <p className="LoginAdminElement">管理员</p>
                            <input type="password" maxLength="10" 
                            value = { this.state.passWord } placeholder="请输入密码" 
                            onChange = { this.input_Password }
                            className="LoginAdminPassWord" />
                            <button className={ getOption.length > 0 ? 'LoginButton':'hide' } onClick ={ this.on_Login }>{this.state.loginState}</button>
                        </div>
                        <div className={ this.state.user_switch ? 'LoginOtherUser' : 'LoginOtherUser hide' }>
                            <div className="LoginOtherUsercCode"></div>
                            <p className="LoginOtherUserTips">新员工注册请用微信扫描此码</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state
}

Login = connect(mapStateToProps)(Login)

export default Login