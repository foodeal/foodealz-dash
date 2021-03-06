import React, { useState, useEffect } from "react";
// import {
//  UsersCard
// } from "./pages/Users";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, ThemeProvider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

import { Dialog } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import config from '../config.json';


const Offrescomponent = (item) => {

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  // const [data, setData] = React.useState({
  //   data:item
  // })
  console.log('id',item)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };
  const handleClose1 = () => {
    setOpen(false);

  };

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const handleClick = () => {
    setOpen1(true);
  };
  const handleRemove = async (id) => {
    console.log("iddesign?? :" + id)
    try {
      return await axios.delete( `${config.URL}/dealscheduled/${id}`)
    }

    catch (error) { console.log("deleting error :" + error) }
  }
  const global = async (id) => {
    console.log("clicked :" + id)
    handleRemove(id).then((res) => console.log("removing")).catch((error) => console.log("ilya probl??me"));
    handleClick();
    handleClose1();


  };


  return (

    <StyledTableCell align="right">

      <Button style={{ marginLeft: '20px', marginTop: '50px', backgroundColor: '#008037' }} variant="outline-success" onClick={() => setOpen(true)} >
        <ClearIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose1}

      >
        <DialogTitle >Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText >
            Are you sure you want to delete this item !!!!!
</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} color="primary">
            No
</Button>
          <Button onClick={() => global(item.item)} color="primary" >
            Yes
</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open1} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          basket is successfully deleted!
</Alert>
      </Snackbar>
    </StyledTableCell >



  );
};
export default Offrescomponent;