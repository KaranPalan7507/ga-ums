import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import './UserTable.css';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Intro from './../Intro';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class UserTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: true,
            users: [],
            value: 'name',
            filteredUserArr: [],
            filterText: ''
        };
    }

    changeValue(e, type) {
        const value = e.target.value;
        const nextState = {};
        nextState[type] = value;
        this.setState(nextState);
    }

    componentWillReceiveProps(props) {
        this.setState({ users: props.list });
        this.setState({ filteredUserArr: props.list }, this.filterInputChange.bind(this, null, this.state.filterText));
    }

    getAge(dob_ms) {
        var ageDif_ms = Date.now() - dob_ms;
        var ageDate = new Date(ageDif_ms);
        return Math.abs(ageDate.getUTCFullYear() - 1970) + ' years';
    }

    filterByChange = event => {
        this.setState({ value: event.target.value }, this.filterInputChange.bind(this, null, this.state.filterText));
    };

    filterInputChange = (e, string = '') => {
        const filterText = string.length > 0 ? string : e ? e.target.value : '';
        let newUserArray;
        if (filterText.length > 0) {
            this.setState({ filterText: filterText });
            if (this.state.value === 'name') {
                newUserArray = this.state.users.filter(function (user) {
                    return user.first_name.startsWith(filterText);
                });
            } else {
                newUserArray = this.state.users.filter(function (user) {
                    return user.email.startsWith(filterText);
                });
            }
        } else {
            newUserArray = this.state.users;
        }
        this.setState({ filteredUserArr: newUserArray });

    }

    handleDeleteUser(user) {
        this.props.deleteUser(user);
    }

    handleEditUser(user) {
        this.props.handleEditPopupOpen(user);
    }

    render() {
        return (
            <div>
                <Paper className="filter">
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container
                                alignItems="center">
                                <Grid item xs={12} sm={4}>
                                    <FormLabel component="legend">Filter By</FormLabel>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <RadioGroup className="radio-group"
                                        aria-label="filter By"
                                        name="Search"
                                        value={this.state.value}
                                        onChange={this.filterByChange.bind(this)}
                                    >
                                        <FormControlLabel value="name" control={<Radio />} label="Name" />
                                        <FormControlLabel value="email" control={<Radio />} label="Email" />

                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        margin="normal"
                                        label="filter Text"
                                        type="text"
                                        onChange={(event) => this.filterInputChange(event)} />
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

                <Intro message="List of users" />
                {
                    this.state.filteredUserArr.length <= 0 &&
                    <Intro message="No User found" />
                }
                {
                    this.state.filteredUserArr.length > 0 && <table>
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
                            {this.state.filteredUserArr.map((user, index) => (
                                <tr key={index}>
                                    <td >
                                        <Link to={`/user/${user.email}`}>
                                            {user.first_name + ' ' + user.last_name}
                                        </Link></td>
                                    <td >{new Date(user.dob).toLocaleDateString()}</td>
                                    <td >{this.getAge(user.dob)}</td>
                                    <td >{user.email}</td>
                                    <td >{user.phone}</td>
                                    {user.active && <td className="green-font"> Active </td>}
                                    {!user.active && <td className="red-font"> Inactive</td>}
                                    <td >
                                        <IconButton
                                            aria-label="Delete User"
                                            color="primary"
                                            onClick={this.handleDeleteUser.bind(this, user)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </td>
                                    <td>
                                        <IconButton
                                            aria-label="Edit User"
                                            color="primary"
                                            onClick={this.handleEditUser.bind(this, user)}>
                                            <EditIcon />
                                        </IconButton>
                                    </td>
                                    {
                                        user.active && <td>
                                            <Button variant="outlined" color="primary" onClick={this.props.toggleState.bind(this, user)}>
                                                Deactivate
                                </Button>
                                        </td>
                                    }
                                    {!user.active && <td>
                                        <Button variant="outlined" color="primary" onClick={this.props.toggleState.bind(this, user)}>
                                            Activate
                                </Button>
                                    </td>}
                                </tr>
                            ))}
                        </tbody>
                    </table >
                }
            </div >
        );

    }
}

export default UserTable;