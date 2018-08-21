import React, { Component } from 'react';
import UserTable from './../../components/UserTable'

class Users extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        const users = JSON.parse(localStorage.getItem('users'));
        if (users) {
            this.setState({ users: users });
        } else {
            fetch('https://api.myjson.com/bins/pkisp')
                .then((response) => response.json())
                .then(json => { this.setState({ users: json.users }) })
                .then(json => { localStorage.setItem('users', JSON.stringify(this.state.users)) });
        }
    }

    deleteUser(user) {
        const index = this.state.users.indexOf(user);
        this.state.users.splice(index, 1);
        this.setState({ users: this.state.users });
        localStorage.setItem('users', JSON.stringify(this.state.users))
    }

    addUser(newUser) {
        this.state.users.push(newUser);
        this.setState({ "users": this.state.users });
        localStorage.setItem('users', JSON.stringify(this.state.users))
    }

    editUser(updatesUser, index) {
        let newUsers = [...this.state.users];
        newUsers[index] = updatesUser;
        this.setState({ users: newUsers });
        localStorage.setItem('users', JSON.stringify(this.state.users))
    }

    toggleState(user) {
        let newUsers = [...this.state.users];
        const index = newUsers.indexOf(user);
        newUsers[index].active = !newUsers[index].active;
        this.setState({ users: newUsers });
        localStorage.setItem('users', JSON.stringify(this.state.users))
    }

    render() {
        return (
            <div>
                <UserTable
                    list={this.state.users}
                    deleteUser={this.deleteUser.bind(this)}
                    handleEditPopupOpen={this.props.handleEditPopupOpen}
                    toggleState={this.toggleState} />
            </div>
        )
    }
}

export default Users;