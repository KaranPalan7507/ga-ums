import React, { Component } from 'react';
import UserTable from './../../components/UserTable'

class Users extends Component {
    state = {
        users: []
    }

    componentDidMount() {
        fetch('https://api.myjson.com/bins/pkisp')
            .then((response) => response.json())
            .then(json => { this.setState({ users: json.users }) })
    }

    deleteUser(index) {
        let newUsers = this.state.users.splice(index, 1);
        this.setState({ users: this.state.users });
    }

    addUser(newUser) {
        this.state.users.push(newUser);
        this.setState({ "users": this.state.users });
    }

    editUser(updatesUser, index) {
        this.state.users[index] = updatesUser;
        this.setState({ users: this.state.users });
    }

    toggleState(index) {
        let newUsers = [...this.state.users];
        newUsers[index].active = !newUsers[index].active;
        this.setState({ users: newUsers });
    }

    render() {
        return (
            <div>
                <UserTable
                    list={this.state.users}
                    deleteUser={this.deleteUser}
                    handleEditPopupOpen={this.props.handleEditPopupOpen}
                    toggleState={this.toggleState} />
            </div>
        )
    }
}

export default Users;