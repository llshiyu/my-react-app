import React from 'react';
import './App.css';
import Table from './Table';
import Color from './Color';
import $ from 'jquery';

class App extends React.Component {
    constructor(prop) {
        // 在这里调用super是因为在ES6中，子类的constructor中必须先调用super才能引用this，
        // 使用super(props)的目的是在constructor中可以使用this.props，
        // 因如果父组件却没有传参数给子组件，那就不需要使用this.props调取父标签传递的参数，
        // 所以super(props)可以去掉。在什么样的情况一定需要：
        // 比如外标签是<App name='testName'></App>，那么在App组件中的constructor中就可以通过this.props.name来获取。

        super(prop);
        this.state = {
            count: 0,
            form: {
                username: '',
                password: ''
            },
            delName: '',
            updateName: '',
            updatePwd: '',
            selectName: '',
            tableList: [],
            msg: '',
            succMsg: '',
            color: '',
            childColor: '#fff',
            parentColor: '#fff'
        };
        // this.addCount = this.addCount.bind(this);
        this.reduceCount = this.reduceCount.bind(this);
    }

    componentDidMount() {
        this.selectData()
    }

    addCount = () => {
        this.setState({count: this.state.count + 1})
    };

    reduceCount() {
        this.setState({count: this.state.count - 1})
    }

    colorChange = (e) => {
        this.setState({
            color: e.target.value
        })
    };
    changeChildBackground = () => {
        this.setState({
            childColor: this.state.color
        })
    };

    parentChange(color) {
        this.setState({
            parentColor: color
        })
    }

    nameChange = (e) => {
        let data = Object.assign({}, this.state.form, {username: e.target.value})
        this.setState(
            {form: data},
            function () {
                console.log('new value', this.state.form.username)
            }
        );
        console.log('old value', e.target.value, this.state.form.username)
    };
    pwdChange = (e) => {
        let data = Object.assign({}, this.state.form, {password: e.target.value})
        this.setState({form: data});
    };
    searchAddData = () => {
        if (!this.state.form.username) {
            this.setState({
                msg: '用户名不能为空'
            });
            return;
        }
        if (!this.state.form.password) {
            this.setState({
                msg: '密码不能为空'
            });
            return;
        }
        this.addData(this.state.form)
    };
    onKeyUp = (e) => {
        e.keyCode === 13 && this.searchAddData()
    };
    addData = (data) => {
        $.ajax({
            url: 'http://localhost:8082/addData',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (res) {
                if (res.meta.code === 0) {
                    this.setState({
                        succMsg: res.meta.message,
                        msg: ''
                    });
                    this.selectData();
                } else if (res.meta.code === 200002) {
                    this.setState({
                        succMsg: '',
                        msg: res.meta.message
                    });
                }
            }.bind(this),
            error: function (e) {
                console.log(e)
            }
        })
    };

    delnameChange = (e) => {
        this.setState({
            delName: e.target.value
        })
    };
    delData = () => {
        if (this.state.delName) {
            $.ajax({
                url: 'http://localhost:8082/delData',
                type: 'post',
                dataType: 'json',
                data: {username: this.state.delName},
                success: (res) => {
                    if (res.meta.code === 0) {
                        this.setState({
                            succMsg: res.meta.message,
                            msg: ''
                        });
                        this.selectData();
                    } else if (res.meta.code === 200005) {
                        this.setState({
                            succMsg: '',
                            msg: res.meta.message
                        });
                    }
                }
            })
        } else {
            this.setState({
                succMsg: '',
                msg: '请输入要删除的用户名'
            })
        }
    };

    selectnameChange = (e) => {
        this.setState({
            selectName: e.target.value
        })
    };
    selectData = () => {
        $.ajax({
            url: 'http://localhost:8082/selectData',
            type: 'post',
            dataType: 'json',
            data: {username: this.state.selectName},
            success: (res) => {
                if (res.meta.code === 0) {
                    this.setState({
                        tableList: res.data.data,
                        msg: ''
                    })
                } else if (res.meta.code === 200005) {
                    this.setState({
                        tableList: [],
                        msg: res.meta.message
                    });
                }
            }
        })
    };

    updatenameChange = (e) => {
        this.setState({
            updateName: e.target.value
        })
    };
    updatepwdChange = (e) => {
        this.setState({
            updatePwd: e.target.value
        })
    };
    updateData = () => {
        if (this.state.updateName) {
            if (this.state.updatePwd) {
                $.ajax({
                    url: 'http://localhost:8082/updateData',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        username: this.state.updateName,
                        password: this.state.updatePwd
                    },
                    success: (res) => {
                        if (res.meta.code === 0) {
                            this.setState({
                                succMsg: res.meta.message,
                                msg: ''
                            });
                            this.selectData()
                        } else if (res.meta.code === 200005) {
                            this.setState({
                                succMsg: '',
                                msg: res.meta.message
                            });
                        }

                    }
                })
            } else {
                this.setState({
                    succMsg: '',
                    msg: '请输入修改后的密码'
                })
            }
        } else {
            this.setState({
                succMsg: '',
                msg: '请输入要修改的用户名'
            })
        }
    };

    render() {
        return (
            <div className='box' style={{backgroundColor: this.state.parentColor}}>
                <button onClick={this.addCount}>+</button>
                <button onClick={this.reduceCount}>-</button>
                <span>{this.props.name}</span>
                <span>{this.state.count}</span>
                <br/>
                <input type="text" onChange={this.nameChange} onKeyUp={this.onKeyUp} placeholder='请输入姓名'
                       value={this.state.form.username}/>
                <input type="text" onChange={this.pwdChange} onKeyUp={this.onKeyUp} placeholder='请输入密码'
                       value={this.state.form.password}/>
                <button onClick={this.searchAddData}>新增</button>
                {
                    this.state.tableList.length > 0 ? <Table value={this.state.tableList}></Table> : null
                }
                {
                    this.state.msg ? <div style={{color: '#ff0000'}}>{this.state.msg}</div> : null
                }
                {
                    this.state.succMsg ? <div style={{color: '#50ff11'}}>{this.state.succMsg}</div> : null
                }
                <br/>
                <input type="text" onChange={this.delnameChange} placeholder='请输入要删除的name' value={this.state.delName}/>
                <button onClick={this.delData}>删除</button>
                <br/>
                <input type="text" onChange={this.selectnameChange} placeholder='请输入要查询的name'
                       value={this.state.selectName}/>
                <button onClick={this.selectData}>查询</button>
                <br/>
                <input type="text" onChange={this.updatenameChange} placeholder='请输入要修改的name'
                       value={this.state.updateName}/>
                <input type="text" onChange={this.updatepwdChange} placeholder='请输入修改后的Pwd'
                       value={this.state.updatePwd}/>
                <button onClick={this.updateData}>根据name修改Pwd</button>
                <br/>
                <input style={{width: '200px'}} type="text" placeholder='请输入颜色值，默认#ffffff' onChange={this.colorChange}
                       value={this.state.color}/>
                <button onClick={this.changeChildBackground}>改变子组件的背景色</button>
                <Color color={this.state.childColor} parentStyle={this.parentChange.bind(this)}></Color>
            </div>
        )
    }
}

export default App;