import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class UserPopUp extends Component {

    constructor(props) {
        super(props);
        this.buttonText='Add';
        this.state = {
            open: false,
            first_name: null,
            last_name: null,
            email: null,
            mobile: null,
            dob: this.getDateString(),
            fn_error: false,
            ln_error: false,
            email_error: false,
            mobile_error: false,
            dob_error: false,
            edit: false,
            disabled: true,
        };
    }

    getDateString(date) {
        const dob = date ? new Date(date) : new Date();
        const yearStr = dob.getFullYear();
        const monthStr = (dob.getMonth() + 1).toString().length >= 2 ? dob.getMonth() + 1 : '0' + (dob.getMonth() + 1);
        const dateStr = (dob.getDate().toString()).length >= 2 ? dob.getDate() : '0' + dob.getDate();
        return yearStr + '-' + monthStr + '-' + dateStr;
    }

    handleValidation(fieldName) {
        switch (fieldName) {
            case 'first_name':
                if (this.state.first_name === '') {
                    this.fn_error = true;
                } else {
                    this.fn_error = false;
                }
                this.setState({ 'fn_error': this.fn_error });
                break;
            case 'last_name':
                if (this.state.last_name === '') {
                    this.ln_error = true;
                } else {
                    this.ln_error = false;
                }
                this.setState({ 'ln_error': this.ln_error });

                break;
            case 'email':
                if (this.validateEmail()) {
                    this.email_error = true;
                } else {
                    this.email_error = false;
                }
                this.setState({ 'email_error': this.email_error });
                break;
            case 'mobile':
                if (!this.state.mobile || this.state.mobile.length < 10) {
                    this.mobile_error = true;
                } else {
                    this.mobile_error = false;
                }
                this.setState({ 'mobile_error': this.mobile_error });
                break;
            case 'dob':
                if (this.state.dob === '') {
                    this.dob_error = true;
                } else {
                    this.dob_error = false;
                }
                this.setState({ 'dob_error': this.dob_error });
                break;
        }
        const disabled = this.fn_error || this.ln_error || this.email_error || this.mobile_error || this.dob_error;
        this.setState({ disabled: disabled });
    }

    validateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(String(this.state.email).toLowerCase());
    }

    handleFocus(fieldName) {
        switch (fieldName) {
            case 'first_name':
                this.setState({ first_name: this.state.first_name || '' });
                break;
            case 'last_name':
                this.setState({ last_name: this.state.last_name || '' });
                break;
            case 'email':
                this.setState({ email: this.state.email || '' });
                break;
            case 'mobile':
                this.setState({ mobile: this.state.mobile || '' });
                break;
            case 'dob':
                this.setState({ dob: this.state.dob || '' });
                break;
        }

    }

    onChange(event, fieldName) {
        switch (fieldName) {
            case 'first_name':
                this.setState({ first_name: event.target.value });
                break;
            case 'last_name':
                this.setState({ last_name: event.target.value });
                break;
            case 'email':
                this.setState({ email: event.target.value });
                break;
            case 'mobile':
                this.setState({ mobile: event.target.value });
                break;
            case 'dob':
                this.setState({ dob: event.target.value });
                break;
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.buttonText='Add';
        this.setState({
            open: false,
            first_name: null,
            last_name: null,
            dob: this.getDateString(),
            email: null,
            mobile: null,
            disabled: true
        });
    };

    handleAddUser() {
        const user = {
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
            "dob": new Date(this.state.dob).getTime(),
            "email": this.state.email,
            "phone": this.state.mobile,
            "active": false
        };
        this.props.addUser(user);
        this.handleClose();
    }

    handleEditPopupOpen = (user) => {
        this.editPopupOpen = true;
        this.buttonText='Update';
        this.setState({
            first_name: user.first_name,
            last_name: user.last_name,
            dob: this.getDateString(user.dob),
            email: user.email,
            mobile: user.phone,
            disabled: false
        })
        this.handleClickOpen();
    }

    render() {

        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter User Details
                    </DialogContentText>
                    <TextField
                        margin="normal"
                        id="first_name"
                        label="First Name"
                        type="text"
                        required={true}
                        fullWidth
                        value={this.state.first_name || ''}
                        error={this.fn_error}
                        onChange={(event) => this.onChange(event, 'first_name')}
                        onFocus={() => this.handleFocus('first_name')}
                        onBlur={() => this.handleValidation('first_name')} />
                    <TextField
                        margin="normal"
                        id="last_name"
                        label="Last Name"
                        type="text"
                        required={true}
                        value={this.state.last_name || ''}
                        fullWidth
                        error={this.ln_error}
                        onChange={(event) => this.onChange(event, 'last_name')}
                        onFocus={() => this.handleFocus('last_name')}
                        onBlur={() => this.handleValidation('last_name')} />
                    <TextField
                        margin="normal"
                        id="name"
                        label="Email Address"
                        type="email"
                        required={true}
                        fullWidth
                        value={this.state.email || ''}
                        error={this.email_error}
                        onChange={(event) => this.onChange(event, 'email')}
                        onFocus={() => this.handleFocus('email')}
                        onBlur={() => this.handleValidation('email')} />
                    <TextField
                        margin="normal"
                        id="mobile"
                        label="Mobile"
                        type="number"
                        required={true}
                        fullWidth
                        value={this.state.mobile || ''}
                        error={this.mobile_error}
                        onChange={(event) => this.onChange(event, 'mobile')}
                        onFocus={() => this.handleFocus('mobile')}
                        onBlur={() => this.handleValidation('mobile')} />
                    <TextField
                        label="Birthday"
                        type="date"
                        required={true}
                        error={this.dob_error}
                        value={this.state.dob}
                        onChange={(event) => this.onChange(event, 'dob')}
                        onFocus={() => this.handleFocus('dob')}
                        onBlur={() => this.handleValidation('dob')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleAddUser.bind(this)} color="primary" disabled={this.state.disabled}>
                        {this.buttonText}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default UserPopUp;
