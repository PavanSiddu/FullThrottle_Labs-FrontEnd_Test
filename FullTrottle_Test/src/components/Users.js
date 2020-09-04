import React, { Component } from 'react';
import axios from 'axios';
import './User.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Calender from './Calender';


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            open: false,
            selectedUser: null
        }
        this.load_API();
    }
    load_API() {
        (async () => {
            this.setState({ users: (await axios.get('./Test_JSON.json')).data.members });
        })();
    }
    render() {
        let dialog = null;
        if (this.state.selectedUser) {
            const handleClose = () => {
                this.setState({ open: false });
            };
            dialog = (
                <div>
                    <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="customized-dialog-title">
                        <DialogTitle id="customized-dialog-title">User Name: {this.state.selectedUser.real_name}</DialogTitle>
                        <DialogContent>
                                <Calender active={this.state.selectedUser.activity_periods} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="primary">
                                Close
                 </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
        }
        const handleClickOpen = (user) => {
            return () => {
                this.setState({ open: true, selectedUser: user });
            }
        };
        const StyledTableCell = withStyles(theme => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
                fontSize: 25,
                fontStyle: 'italic'
            },
            body: {
                fontSize: 20,
            },
        }))(TableCell);
        const StyledTableRow = withStyles(theme => ({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.background.default,
                },
            },
        }))(TableRow);
        function createData(userId, userName, userInfo) {
            return { userId, userName, userInfo };
        }
        const rows = [];
        this.state.users.map((user) => {
            return (
                rows.push(createData(user.id, user.real_name,
                    <Button variant="contained" color="primary" onClick={handleClickOpen(user)}>User INFO</Button>)
                )
            )
        }
        )
        return (
            <div>
                <h1 className='h1'>Users Information</h1>
                <div className='table'>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>User Name</StyledTableCell>
                                    <StyledTableCell align="right" >Info</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <StyledTableRow key={row.userId}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.userName}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.userInfo}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                {dialog}
            </div>
        );
    }
}

export default Users;