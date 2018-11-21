import React from 'react';
import './register.css';
import $ from "jquery";
import {Link} from "react-router-dom";

class Register extends React.Component{
    constructor(prop){
        super(prop);
        this.state={
            username:'',
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

    register(){
        if (this.state.username) {
            if (this.state.password) {
                this.setMsg('');
                this.registerAjax()
            } else {
                this.setMsg('请输入密码', 2);
            }
        } else {
            this.setMsg('请输入用户名', 1);
        }
    }
    registerAjax=()=>{
        let params = {
            username: this.state.username,
            password: this.state.password
        };
        $.ajax({
            url:'http://localhost:8082/addData',
            type: 'post',
            dataType: 'json',
            data:params,
            success:function (res) {
                if(res.meta.code===0){
                    this.setSuccMsg('注册成功')
                }else if(res.meta.code===200002){
                    this.setMsg(res.meta.message,1)
                }else{
                    this.setSuccMsg(res.meta.message)
                }
            }.bind(this)
        })
    };
    render(){
        return (
            <div className='register-box'>
                <h1>注册</h1>
                <form action='' className='register-form' onSubmit={this.formSubmit.bind(this)}>
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
                        <button className='button-register' onClick={this.register.bind(this)}>注册</button>
                        <Link to='/login'>返回</Link>
                    </div>
                    {this.state.succMsg?<div className='succ-msg'>{this.state.succMsg}</div>:''}
                </form>
            </div>
        )
    }
}

export default Register