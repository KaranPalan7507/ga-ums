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

    render() {
        return (
            <div>
                The length of users array - {this.state.users.length}
                <UserTable list={this.state.users} />

            </div>
        )
    }
}

export default Users;