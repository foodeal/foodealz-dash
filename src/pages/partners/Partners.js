
import React, { useState, useEffect } from "react";
// import {
//  UsersCard
// } from "./pages/Users";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';
import Partnersadd from './Partnersadd';
import PartnersUpdate from './PartnersUpdate';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Partnercomponent from "./Partnercomponent";
import config from '../config';


const Partners = () => {


  const [data, setData] = React.useState({

    error: '',
    data: [],
    temp: [],
    error: null,
    search: null,
    array: [],


  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  const [visible, setVisible] = React.useState(false);

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,

    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  const useStyles = makeStyles({
    table: {
      minWidth: 400,
      marginTop: 20,
    },
  });

  
  
  
 
  const handleClose1 = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen1(true);
  };

  const global =async (id) => {
    handleClose1();
    handleClick();
    handleRemove(id).then((res) => console.log("sucessfully deleted")).catch((error) => console.log("ilya problème"))
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };

 
  

  const getData = async () => {
    const url = `https://api.foodealzapi.com/restaurants`;
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res);
       
        setData({
          ...data,
          data: res,
          temp: res,
        });
       
      })
      .catch(error => {
        setData({
          ...data,
          error: 'Error Loading content',
        })
      })
  };
  useEffect(() => {
    getData()
  }, [])



  const handleRemove = async (id) => {
   
try{
   return await axios.delete(`https://api.foodealzapi.com/restaurants/${id}`)

}

catch (error) { console.log("deleting error :" + error) }
   
  };
  
  const searchFilterFunction = (text) => {
    const newData = data.temp.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData({
      ...data,
      data: newData
    })
  };
  


  const Title1 = {
    fontSize: '20px',
    color: '#008037',
    fontWeight: 'bold',
    marginLeft: '20px',
    justifyContent: 'center'
  }

  const Search1 = {

    backgroundColor: 'white',
    marginLeft: '20px',
    marginTop: '20px',
    borderBottomWidth: 1,
    borderBottomColor: '#b4b4b4b4b4'
  }
  const item = {
    fontSize: '12px',
    flexDirection: 'row',
    marginLeft: '15px',
    fontWeight: 'bold'
  }

  const buttonstyle = {
    marginLeft: '20px',
    marginTop: '50px',
    backgroundColor: '#008037',
    width: '110px',
    borderRadius: '5px'
  }

  const classes = useStyles();

  return (
    <div>
      <div style={Title1}>
        <h2>Partners</h2>

        <Partnersadd item={item.restaurant_id} handleClose={handleClose} handleClose1={handleClose1} />

      </div>
      <div style={Search1} >
        <input type="text" placeholder=" Search Here..."
          contentEditable={true}
          onChange={e => searchFilterFunction(e.target.value)} />
      </div>
      <div style={item}>
        <Paper >
          <TableContainer >
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ alignItems: 'center' }} >partnerId</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">partnerName</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">partnerMail</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">partnerPhone</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">Paiement</StyledTableCell>

                  {/* <StyledTableCell style={{ alignItems: 'center' }} align="right">partnerPassword</StyledTableCell> */}
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">description</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">address</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right"> site web</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">latitude </StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">longitude </StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">Type </StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">commission rate </StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">logourl </StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">image </StyledTableCell>
                  {/* <StyledTableCell style={{ alignItems: 'center' }} align="right">accessToken </StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">refreshToken </StyledTableCell> */}
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">discount </StyledTableCell>
                  {/* <StyledTableCell style={{ alignItems: 'center' }} align="right">deal </StyledTableCell> */}
                  <StyledTableCell style={{ alignItems: 'center' }} align="right"> </StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right"> </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, restaurant_id) => {
                  return (
                    

                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={restaurant_id}>
                     
                       
                      <StyledTableCell>
                     

                        {item.restaurant_id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.mail}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.phone}
                      </StyledTableCell>
                      {/* <StyledTableCell align="right">
                  {item.password}
                </StyledTableCell> */}
                      <StyledTableCell align="right">
                        {item.typePayment}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.description}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.address}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.url}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.latitude}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.longitude}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.type}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.commission_rate}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.logourl}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.image}
                      </StyledTableCell>
                      {/* <StyledTableCell align="right">
                        {item.accessToken}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.refreshToken}
                      </StyledTableCell> */}
                      <StyledTableCell align="right">
                        {item.discount}
                      </StyledTableCell>
                      {/* <StyledTableCell align="right">
                        {item.deal}
                      </StyledTableCell> */}
                    
                    <StyledTableCell align="right">
                      <PartnersUpdate item={item} handleClose={handleClose} handleClose1={handleClose1} />
                      </StyledTableCell>
                      <Partnercomponent item={item.restaurant_id} handleClose={handleClose} handleClose1={handleClose1} />
                     
               
                    </StyledTableRow>
                  );
                })}
          </TableBody>
            </Table>
          </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5,10, 20,50, 100]}
          component="div"
          count={data.data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Paper>


    </div>

    </div >

  )

}
export default Partners;
