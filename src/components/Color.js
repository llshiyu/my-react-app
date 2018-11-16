import React from 'react';

class Color extends React.Component {
    constructor(prop) {
        super(prop)
    }

    changeParentBackground = () => {
        this.props.parentStyle(this.props.color)
    };

    render() {
        return (
            <div style={{
                width: '200px',
                height: '100px',
                lineHeight: '100px',
                textAlign: 'center',
                cursor: 'pointer',
                padding: '0 4px',
                border: '1px solid #eee',
                marginTop: '20px',
                backgroundColor: this.props.color
            }}
                 onClick={this.changeParentBackground}>
                <span style={{fontSize: '14px', margin: '0'}}>我要父组件跟我颜色一致！</span>
            </div>
        )
    }
}

export default Color;