import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './UserTable.css';

class UserTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: true,
            users: []
        };
    }

    changeValue(e, type) {
        const value = e.target.value;
        const nextState = {};
        nextState[type] = value;
        this.setState(nextState);
    }

    componentWillReceiveProps(props) {
        this.setState({ users: props.list })
    }

    getAge(dob_ms) {
        var ageDif_ms = Date.now() - dob_ms;
        var ageDate = new Date(ageDif_ms);
        return Math.abs(ageDate.getUTCFullYear() - 1970) + ' years';
    }

    render() {
        return (
            <div>
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
                                <td >
                                    <IconButton aria-label="Delete User" color="primary" onClick={this.props.deleteUser.bind(this, index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </td>
                                <td>
                                    <IconButton aria-label="Edit User" color="primary" onClick={this.props.handleEditPopupOpen.bind(this, index)}>
                                        <EditIcon />
                                    </IconButton>
                                </td>
                                {user.active && <td>
                                    <Button variant="outlined" color="primary" onClick={this.props.toggleState.bind(this, index)}>
                                        Deactivate
                                </Button>
                                </td>}
                                {!user.active && <td>
                                    <Button variant="outlined" color="primary" onClick={this.props.toggleState.bind(this, index)}>
                                        Activate
                                </Button>
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div>
        );

    }
}

export default UserTable;