import React from 'react';

class Table extends React.Component {
    render() {
        return (
            <table border="1">
                <thead>
                <tr>
                    <td>姓名</td>
                    <td>描述</td>
                </tr>
                </thead>
                <tbody>
                {
                    this.props.value.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.desc}</td>
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