
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
import { withStyles, makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import Menuadd from './Menuadd';
import MenuUpdate from './MenuUpdate';
import Mapcomponent from "./Mapcomponent";
import config from '../config.json';


const Menu = () => {


  const [data, setData] = React.useState({
    error: '',
    data: [],
    temp: [],
    error: null,
    search: '',

  });


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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


  const useStyles = makeStyles({
    table: {
      minWidth: 400,
      marginTop: 20,
    },
  });

  const getData = async () => {
    const url = `${config.URL}/AllInvendus`;
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        let object = {
          ...data,
          data: res,
          temp: res,

        };

        setData(
          object
        );
        console.log(object.data)

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



  const searchFilterFunction = (text) => {
    const newData = data.temp.filter((item) => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log(newData)
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
  const Field = {
    marginLeft: '20px',
    width: '500px',
    marginTop: '25px',
    padding: '15px',


  }
  const buttonstyle = {
    marginLeft: '20px',
    marginTop: '50px',
    backgroundColor: '#008037',
    width: '100px',
    borderRadius: '5px'
  }

  const handleRemove = async (id) => {
    console.log("iddesigné :" + id)
    try {
      return await axios.delete(`${config.URL}/Invendus/${id}`)
    }

    catch (error) { console.log("deleting error :" + error) }
  }

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const [open1, setOpen1] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen(false);

  };
  const global = async (id) => {
    console.log("clicked :" + id)
    handleRemove(id).then((res) => console.log("removing")).catch((error) => console.log("ilya problème"));
    handleClick();
    handleClose1();

  };



  const classes = useStyles();

  return (
    <div>
      <div style={Title1}>
        <h2>Menu</h2>
      </div>
      <div>


        <Menuadd item={item.id} handleClose={handleClose} handleClose1={handleClose1} />


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

                    <StyledTableCell align="right">invendu id</StyledTableCell>
                    <StyledTableCell align=""> nom</StyledTableCell>
                    <StyledTableCell align="right">image</StyledTableCell>
                    <StyledTableCell align="right">Price Before</StyledTableCell>
                    <StyledTableCell align="right">Price After</StyledTableCell>
                    <StyledTableCell align="right">discount</StyledTableCell>
                    <StyledTableCell align="right">description</StyledTableCell>
                    <StyledTableCell align="right">restaurant id</StyledTableCell>


                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, id) => {

                    return (
                      <StyledTableRow hover role="checkbox" >
                        {/* 
                        {item.deal.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((itemm, deal_id) => {
                          console.log("les deals sont :" + JSON.stringify(itemm.deal_id));
                          return (
                            <div> */}
                        <StyledTableCell align="right">
                          {item.id}
                        </StyledTableCell >
                        <StyledTableCell >
                          {item.nom}
                          {/* {JSON.stringify(itemm.deal_id)} */}
                        </StyledTableCell >
                        <StyledTableCell align="right">
                          {item.image}
                        </StyledTableCell >
                        <StyledTableCell align="right">
                          {item.PriceBeforeDiscount}
                        </StyledTableCell >
                        <StyledTableCell align="right">
                          {item.PriceAfterDiscoun}
                        </StyledTableCell >
                        <StyledTableCell align="right">
                          {item.discount}
                        </StyledTableCell >
                        <StyledTableCell align="right">
                          {item.description}
                        </StyledTableCell >
                        <StyledTableCell align="right">
                          {item.restaurant_id}
                        </StyledTableCell >
                        <StyledTableCell align="right">
                        <MenuUpdate item={item} handleClose={handleClose} handleClose1={handleClose1} />
                        </StyledTableCell >



                        <Mapcomponent item={item.id} handleClose={handleClose} handleClose1={handleClose1} />
                        {/* </div>
                          )

                        })
                        } */}
                      </StyledTableRow >
                    )

                  })
                  }




                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5,10, 25, 100]}
              component="div"
              count={data.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
        <div>

        </div>

      </div>
    </div >
  )
}
export default Menu;
