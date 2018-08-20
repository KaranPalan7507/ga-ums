import React, { Component } from 'react';
import './UserTable.css';

class UserTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ users: props.list })
    }

    getAge(dob_ms) {
        var ageDif_ms = Date.now() - dob_ms;
        var ageDate = new Date(ageDif_ms);
        return Math.abs(ageDate.getUTCFullYear() - 1970) + ' years';
    }

    toggleState(index) {
        let newUsers = [...this.state.users];
        newUsers[index].active = !newUsers[index].active;
        this.setState({});
    }


    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Age</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Status</th>
                        <th colSpan='3'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.users.map((user, index) => (
                        <tr key={index}>
                            <td ><a href="#">{user.first_name + ' ' + user.last_name}</a></td>
                            <td >{new Date(user.dob).toLocaleDateString()}</td>
                            <td >{this.getAge(user.dob)}</td>
                            <td >{user.email}</td>
                            <td >{user.phone}</td>
                            {user.active && <td className="green-font"> Active </td>}
                            {!user.active && <td className="red-font"> Inactive</td>}
                            <td >delete</td>
                            <td>edit</td>
                            {user.active && <td>
                                <button onClick={this.toggleState.bind(this, index)}>Deactivate</button>
                            </td>}
                            {!user.active && <td>
                                <button onClick={this.toggleState.bind(this, index)}>Activate</button>
                            </td>}
                        </tr>
                    ))}
                </tbody>
            </table >
        );

    }
}

export default UserTable;