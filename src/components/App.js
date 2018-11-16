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
            tableList: [],
            msg: '',
            color: '',
            childColor: '#fff',
            parentColor: '#fff'
        };
        // this.addCount = this.addCount.bind(this);
        this.reduceCount = this.reduceCount.bind(this);
    }

    componentDidMount() {
        // this.getList(this.state.form)
    }

    getList = (data) => {
        $.ajax({
            url: 'http://172.31.240.30:8081/getList',
            type: 'post',
            dataType: 'json',
            data: data,
            success: function (res) {
                if (res.data.length > 0) {
                    let newList = this.state.tableList ? this.state.tableList.concat(res.data) : res.data;
                    this.setState({
                        tableList: newList,
                        msg: ''
                    })
                } else {
                    this.setState({
                        msg: '两个input都不能为空'
                    })
                }

            }.bind(this),
            error: function (e) {
                console.log(e)
            }
        })
    };
    addCount = () => {
        this.setState({count: this.state.count + 1})
    };

    reduceCount() {
        this.setState({count: this.state.count - 1})
    }

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
    searchList = () => {
        this.getList(this.state.form)
    };
    onKeyUp = (e) => {
        e.keyCode === 13 && this.searchList()
    };
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
                <button onClick={this.searchList}>新增</button>
                {
                    this.state.tableList.length > 0 ? <Table value={this.state.tableList}></Table> : null
                }
                {
                    this.state.msg ? <span style={{color: '#ff0000'}}>{this.state.msg}</span> : null
                }
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