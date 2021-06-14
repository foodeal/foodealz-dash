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
import moment from "moment";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';
import Offresadd from './Offresadd';
import OffresUpdate from './OffresUpdate';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Offrescomponent from "./Offrescomponent";
import config from '../config.json';

const Offres = () => {

  
  const [data, setData] = React.useState({

    error: '',
    offre: [],
    offre1: [],
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
    marginTop: 20 ,
  },
});

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const url = `${config.URL}/deals`;
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setData({
          ...data,
          offre: res,
          offre1: res,
        });
      })
      .catch(error => {
        setData({
          ...data,
          error: 'Error Loading content',
        })
      })
  };

  


  const handleRemove = async (id) => {
    
    try {
      return await axios.delete(`${config.URL}/dealscheduled/${id}`)
    }
    

    catch (error) { console.log("deleting error :" + error) }
  }
 
  const searchFilterFunction = (id) => {
    const newData = data.offre.filter((item) => {
      const itemData = `${item.id}`;
      const textData = id;
      return itemData.indexOf(textData) > -1;
    });
    setData({
      ...data,
      offre: newData
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
        <h2>Offres Actives</h2>

        <Offresadd item={item.id} handleClose={handleClose} handleClose1={handleClose1} />

      </div>
      <div style={Search1} >
        <input type="text" placeholder=" Search Here by id..."
          contentEditable={true}
          onChange={e => searchFilterFunction(e.target.value)} />
      </div>
      <div style={item}>
        <Paper >
          <TableContainer >
            <Table  className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ alignItems: 'center' }} >Id</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">Quantity</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">Quantity Sold</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">Starting date</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">Expired date</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">starting hour</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">expired hour</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right"> active</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">restaurant id </StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">deal id </StyledTableCell>
                  {/* <StyledTableCell style={{ alignItems: 'center' }} align="right">Type </StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">commission rate </StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">logourl </StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">image </StyledTableCell>
                  {/* <StyledTableCell style={{ alignItems: 'center' }} align="right">accessToken </StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">refreshToken </StyledTableCell> */}
                  {/* <StyledTableCell style={{ alignItems: 'center' }} align="right">discount </StyledTableCell> */}
                  {/* <StyledTableCell style={{ alignItems: 'center' }} align="right">deal </StyledTableCell> */}
                  {/* <StyledTableCell style={{ alignItems: 'center' }} align="right"> </StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right"> </StyledTableCell> */}
                </TableRow> 
              </TableHead>
              <TableBody>

                {data.offre.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, id) => {
                  return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={id}>
                      <StyledTableCell>

                        {item.id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.nbre_redeemed_deal}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {moment(item.startingdate).format('L')}
                      </StyledTableCell>
                    
                      <StyledTableCell align="right">
                        {moment(item.expirydate).format('L')}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.startingdate_hours}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.expirydate_hours}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.active}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.restaurant_id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.deal_id}
                      </StyledTableCell>
                      {/* <StyledTableCell align="right">
                        {item.type}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.commission_rate}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.logourl}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.image} */}
                      {/* </StyledTableCell> */}
                      {/* <StyledTableCell align="right">
                        {item.accessToken}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.refreshToken}
                      </StyledTableCell> */}
                    {/* //   <StyledTableCell align="right">
                    //     {item.discount}
                    //   </StyledTableCell> */}
                      {/* <StyledTableCell align="right">
                        {item.deal}
                      </StyledTableCell> */}
                       <OffresUpdate item={item} handleClose={handleClose} handleClose1={handleClose1} />
                     
                      <Offrescomponent item={item.id} handleClose={handleClose} handleClose1={handleClose1} />
               
                    </StyledTableRow>
                  );
                })}
          </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data.offre.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>


      </div>

    </div>

  )

}
export default Offres;
