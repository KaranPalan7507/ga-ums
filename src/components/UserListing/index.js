import React, { Component } from 'react';
import User from './../../containers/Users';
import UserPopUp from './../UserPopUp';
import Button from '@material-ui/core/Button';

class UserListing extends Component {

    constructor(props) {
        super(props);
        this.popUp = React.createRef();
        this.userList = React.createRef();
        this.editUserIndex = null;
    }

    showAddUserPopUp() {
        this.popUp.current.handleClickOpen();
    }

    showUserPopUp() {
        this.popUp.current.handleClickOpen();
    }

    showEditUserPopUp(user) {
        this.editUserIndex = this.userList.current.state.users.indexOf(user);
        this.popUp.current.handleEditPopupOpen(user);
    }

    addUser(user) {
        if (this.editUserIndex) {
            this.userList.current.editUser(user, this.editUserIndex);
            this.editUserIndex = null;
        } else {
            this.userList.current.addUser(user);
        }
        console.log(user);
    }

    render() {
        return (
            <div className="user-listing">
                <Button variant="contained" color="primary" onClick={this.showAddUserPopUp.bind(this)}>
                    Add User
                </ Button>

                <User
                    handleEditPopupOpen={this.showEditUserPopUp.bind(this)}
                    ref={this.userList} />
                <UserPopUp
                    addUser={(user) => this.addUser(user)}
                    ref={this.popUp} />
            </div>
        );
    }
}

export default UserListing;
