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
        this.state = {
            open: false,
            first_name: null,
            last_name: null,
            email: null,
            mobile: null,
            dob: null,
            fn_error: false,
            ln_error: false,
            email_error: false,
            mobile_error: false,
            dob_error: false,
            edit: false,
            userIndex: null
        };
    }

    handleValidation(fieldName) {
        switch (fieldName) {
            case 'first_name':
                if (this.first_name === '') {
                    this.fn_error = true;
                } else {
                    this.fn_error = false;
                }
                this.setState({ 'fn_error': this.fn_error });
                break;
            case 'last_name':
                if (this.last_name === '') {
                    this.ln_error = true;
                } else {
                    this.ln_error = false;
                }
                this.setState({ 'ln_error': this.ln_error });

                break;
            case 'email':
                if (this.email === '') {
                    this.email_error = true;
                } else {
                    this.email_error = false;
                }
                this.setState({ 'email_error': this.email_error });
                break;
            case 'mobile':
                if (this.mobile === '') {
                    this.mobile_error = true;
                } else {
                    this.mobile_error = false;
                }
                this.setState({ 'mobile_error': this.mobile_error });
                break;
            case 'dob':
                if (this.dob === '') {
                    this.dob_error = true;
                } else {
                    this.dob_error = false;
                }
                this.setState({ 'dob_error': this.dob_error });
                break;
        }
    }

    onChange(event, fieldName) {
        switch (fieldName) {
            case 'first_name':
                this.first_name = event.target.value;
                break;
            case 'last_name':
                this.last_name = event.target.value;
                break;
            case 'email':
                this.email = event.target.value;
                break;
            case 'mobile':
                this.mobile = event.target.value;
                break;
            case 'dob':
                this.dob = event.target.value;
                break;
        }
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleAddUser() {
        const user = {
            "first_name": this.first_name,
            "last_name": this.last_name,
            "dob": new Date(this.dob).getTime(),
            "email": this.email,
            "phone": this.mobile,
            "active": false
        };
        this.props.addUser(user);
        this.handleClose();
    }

    handleEditPopupOpen = (index) => {
        this.editPopupOpen = true;
        this.userIndex = index;
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
                        margin="dense"
                        id="first_name"
                        label="First Name"
                        type="text"
                        required={true}
                        fullWidth
                        error={this.fn_error}
                        onChange={(event) => this.onChange(event, 'first_name')}
                        onBlur={() => this.handleValidation('first_name')} />
                    <TextField
                        margin="dense"
                        id="last_name"
                        label="Last Name"
                        type="text"
                        required={true}
                        fullWidth
                        error={this.ln_error}
                        onChange={(event) => this.onChange(event, 'last_name')}
                        onBlur={() => this.handleValidation('last_name')} />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        required={true}
                        fullWidth
                        error={this.email_error}
                        onChange={(event) => this.onChange(event, 'email')}
                        onBlur={() => this.handleValidation('email')} />
                    <TextField
                        margin="dense"
                        id="mobile"
                        label="Mobile"
                        type="number"
                        required={true}
                        fullWidth
                        error={this.mobile_error}
                        onChange={(event) => this.onChange(event, 'mobile')}
                        onBlur={() => this.handleValidation('mobile')} />
                    <TextField
                        label="Birthday"
                        type="date"
                        required={true}
                        error={this.dob_error}
                        onChange={(event) => this.onChange(event, 'dob')}
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
                    <Button onClick={this.handleAddUser.bind(this)} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}
export default UserPopUp;
