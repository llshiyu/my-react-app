import React from 'react';
import './login.css';
import $ from 'jquery';


class Login extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            username: '',
            password: '',
            msg: '',
            msgType: 1, // 1-用户名出错  2-密码出错
            succMsg:''
        }
    }

    usernameChange = (e) => {
        this.setState({
            username: e.target.value
        })
    };
    passwordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    };
    setMsg = (value, type) => {
        this.setState({
            msg: value,
            msgType: type
        });
    };
    setSuccMsg = (value)=>{
        this.setState({
            succMsg:value
        })
    };

    formSubmit(e) {
        e.preventDefault(); // 组织表单默认提交
    }

    login = () => {
        if (this.state.username) {
            if (this.state.password) {
                this.setMsg('');
                this.loginAjax()
            } else {
                this.setMsg('请输入密码', 2);
            }
        } else {
            this.setMsg('请输入用户名', 1);
        }
    };
    loginAjax = () => {
        let params = {
            username: this.state.username,
            password: this.state.password
        };
        $.ajax({
            url:'http://localhost:8082/login',
            type: 'post',
            dataType: 'json',
            data:params,
            success: (res)=> {
                if(res.meta.code===0){
                    this.setSuccMsg('登录成功');
                    this.props.history.push('/app');
                }else if(res.meta.code===200000){
                    this.setMsg(res.meta.message,1)
                }else if(res.meta.code===200001){
                    this.setMsg(res.meta.message,2)
                }else{
                    this.setSuccMsg(res.meta.message)
                }
            }
        })
    };
    goRegister(){
        this.props.history.push('/register');
    }
    render() {
        return (
            <div className='login-box'>
                <h1>登录</h1>
                <form action='' className='login-form' onSubmit={this.formSubmit.bind(this)}>
                    <div className="input-box">
                        <label htmlFor="username">用户名</label>
                        <input type="text" id='username' name='username' onChange={this.usernameChange}
                               value={this.state.username} placeholder='请输入用户名'/>
                    </div>
                    {this.state.msgType === 1 ? <div className="input-msg">{this.state.msg}</div> : ''}
                    <div className="input-box">
                        <label htmlFor="password">密码</label>
                        <input type="password" id='password' name='password' onChange={this.passwordChange}
                               value={this.state.password} placeholder='请输入密码'/>
                    </div>
                    {this.state.msgType === 2 ? <div className="input-msg">{this.state.msg}</div> : ''}
                    <div className="input-box">
                        <button className='button-login' onClick={this.login}>登录</button>
                        <button className='button-register' onClick={this.goRegister.bind(this)}>注册</button>
                    </div>
                    {this.state.succMsg?<div className='succ-msg'>{this.state.succMsg}</div>:''}
                </form>
            </div>

        )
    }
}

export default Login