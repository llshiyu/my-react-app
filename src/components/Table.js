import React from 'react';

class Table extends React.Component {
    render() {
        return (
            <table border="1">
                <thead>
                <tr>
                    <td>用户名</td>
                    <td>密码</td>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.value.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.username}</td>
                                <td>{item.password}</td>
                            </tr>
                        )

                    })
                }
                </tbody>

            </table>
        )
    }
}

export default Table;