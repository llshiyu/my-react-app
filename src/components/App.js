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
                name: '',
                desc: ''
            },
            delName: '',
            updateName: '',
            updateDesc: '',
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
        this.getList()
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


    getList = () => {
        $.ajax({
            url: 'http://localhost:8081/getList',
            type: 'get',
            dataType: 'json',
            data: {},
            success: function (res) {
                if (res.data.length > 0) {
                    // let newList = this.state.tableList ? this.state.tableList.concat(res.data) : res.data;
                    this.setState({
                        tableList: res.data,
                        msg: ''
                    })
                } else {
                    // this.setState({
                    //     msg: '两个input都不能为空'
                    // })
                }

            }.bind(this),
            error: function (e) {
                console.log(e)
            }
        })
    };

    nameChange = (e) => {
        let data = Object.assign({}, this.state.form, {name: e.target.value})
        this.setState(
            {form: data},
            function () {
                console.log('new value', this.state.form.name)
            }
        );
        console.log('old value', e.target.value, this.state.form.name)
    };
    descChange = (e) => {
        let data = Object.assign({}, this.state.form, {desc: e.target.value})
        this.setState({form: data});
    };
    searchAddData = () => {
        if (!this.state.form.name) {
            this.setState({
                msg: 'name不能为空'
            });
            return;
        }
        if (!this.state.form.desc) {
            this.setState({
                msg: 'desc不能为空'
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
            url: 'http://localhost:8081/addData',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (res) {
                this.setState({
                    succMsg: res.data,
                    form: {
                        name: '',
                        desc: ''
                    }
                });
                this.getList();

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
                url: 'http://localhost:8081/delData',
                type: 'post',
                dataType: 'json',
                data: {name: this.state.delName},
                success: (res) => {
                    this.setState({
                        succMsg: res.data,
                        delName: ''
                    });
                    this.getList()
                }
            })
        } else {
            this.setState({
                msg: '请输入要删除的name'
            })
        }
    };

    selectnameChange = (e) => {
        this.setState({
            selectName: e.target.value
        })
    };
    selectData = () => {
        if (this.state.selectName) {
            $.ajax({
                url: 'http://localhost:8081/selectData',
                type: 'post',
                dataType: 'json',
                data: {name: this.state.selectName},
                success: (res) => {
                    console.log(res)
                    if (res.total) {
                        this.setState({
                            tableList: res.data,
                            selectName: '',
                            succMsg: '成功'
                        })
                    } else {
                        this.setState({
                            succMsg: res.data
                        });
                    }
                }
            })
        } else {
            this.setState({
                msg: '请输入要查询的name'
            })
        }
    };

    updatenameChange = (e) => {
        this.setState({
            updateName: e.target.value
        })
    };
    updatedescChange = (e) => {
        this.setState({
            updateDesc: e.target.value
        })
    };
    updateData = () => {
        if (this.state.updateName) {
            if (this.state.updateDesc) {
                $.ajax({
                    url: 'http://localhost:8081/updateData',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        name: this.state.updateName,
                        desc: this.state.updateDesc
                    },
                    success: (res) => {
                        this.setState({
                            succMsg: res.data,
                            updateName: '',
                            updateDesc: ''
                        });
                        this.getList()
                    }
                })
            } else {
                this.setState({
                    msg: '请输入修改后的desc'
                })
            }
        } else {
            this.setState({
                msg: '请输入要修改的name'
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
                       value={this.state.form.name}/>
                <input type="text" onChange={this.descChange} onKeyUp={this.onKeyUp} placeholder='请输入描述'
                       value={this.state.form.desc}/>
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
                <input type="text" onChange={this.updatedescChange} placeholder='请输入修改后的desc'
                       value={this.state.updateDesc}/>
                <button onClick={this.updateData}>根据name修改desc</button>
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