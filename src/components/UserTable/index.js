import React, { Component } from 'react';

const UserTable = (props) => {

    function getAge(dob_ms) {
        var ageDif_ms = Date.now() - dob_ms;
        var ageDate = new Date(ageDif_ms);
        return Math.abs(ageDate.getUTCFullYear() - 1970) + ' years';
    }
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
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.list.map(user => (
                    <tr key={user.phone}>
                        <td ><a href="#">{user.first_name + ' ' + user.last_name}</a></td>
                        <td >{new Date(user.dob).toLocaleDateString()}</td>
                        <td >{getAge(user.dob)}</td>
                        <td >{user.email}</td>
                        <td >{user.phone}</td>
                        <td >{user.active.toString()}</td>
                        <td >delete edit</td>

                    </tr>
                ))}
            </tbody>
        </table >
    )
}

export default UserTable;