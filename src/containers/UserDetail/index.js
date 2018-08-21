import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ChevronBack from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom';


class UserDetail extends Component {
    state = {
        user: null
    }

    componentDidMount() {
        const email = this.props.match.params.id;
        const user = JSON.parse(localStorage.getItem("users") || "[]").filter(function (user) {
            return user.email === email;
        })[0];
        this.setState({ user: user });
    }

    navigateToHome() {

    }

    render() {
        const { user } = this.state;

        return (
            <div>
                <Link to="/">
                    <Button variant="contained" color="primary" onClick={this.navigateToHome} >
                        <ChevronBack />
                        Back
                    </Button>
                </Link>
                <h1>User Details</h1>
                {!user && <div>

                </div>}
                {user && <div>
                    <p>First Name - {user.first_name}</p>
                    <p>Last Name - {user.last_name}</p>
                    <p>Date of Birth  - {new Date(user.dob).toDateString()}</p>
                    <p>Email - {user.email}</p>
                    <p>Phone - {user.phone}</p>
                    {user.active && <p className="green-font">Status - Active </p>}
                    {!user.active && <p className="red-font">Status - Inactive</p>}

                </div>}
            </div >
        )
    }
}
export default UserDetail;