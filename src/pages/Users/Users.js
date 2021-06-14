import React, { useState, useEffect } from "react";


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import { Link } from "react-router-dom";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { CropLandscapeOutlined } from "@material-ui/icons";
import config from '../config.json';

const Users = () => {
    const [data, setData] = React.useState({
        error: '',
        user: [],
        usser: [],
        error: null,
        search: null,
    
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
      const [userdata, setUserdata] = React.useState({
        firstname: "",
        lastname: "",
        mail: "",
        phone: "",
        age: "",
        city: "",
        password: ""
      });
      
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
    
    
      const getData = async () => {
        const url = `${config.URL}/users`;
    
        await fetch(url)
          .then(res => res.json())
          .then(res => {
            console.log(res);
            setData({
              ...data,
              user: res,
              usser: res,
             
    
            });
            console.log(data.user);
           
          
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
        const newData = data.usser.filter((item) => {
         console.log(item.firstname.toUpperCase(),"id",item.user_id)
          // const itemData = `${item.firstname.toUpperCase()}`;
          const textData = text.toUpperCase();
          console.log(textData)

          // return itemData.indexOf(textData) > -1;
    
        });

        // setData({
        //   ...data,
        //   user: newData
        // })
      };
      const Title1 = {
        fontSize: '20px',
        color: '#008037',
        fontWeight: 'bold',
        marginLeft: '20px',
        justifyContent: 'center'
      }
    
      const Search1 = {
    
        backgroundColor: '#b4b4b4b4b4',
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
        width: '100px',
        borderRadius: '5px'
      }
      const Field = {
        marginLeft: '20px',
        width: '500px',
        marginTop: '25px',
        padding: '15px',
    
    
      }
    
      const classes = useStyles();
    
    return (
<div>
      <div style={Title1}>
        <h2>Users</h2>

      </div>

     

      <div style={Search1} >
        <input type="text" placeholder=" Search Here..."
          contentEditable={true}
          onChange={e => searchFilterFunction(e.target.value)} />
      </div>
      <div style={item} >
        <Paper >
          <TableContainer >
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <StyledTableCell style={{ alignItems: 'center' }} >Id</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">Firstname</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">Lastname</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">Mail</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">reset</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">new</StyledTableCell>
                  {/* <StyledTableCell style={{ alignItems: 'center' }} align="right">idSocialMedia</StyledTableCell> */}
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">image</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">username</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">active</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">birthday</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">Age</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">logging_time</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">Phone</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">pays</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">City</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">sexe</StyledTableCell>
                  <StyledTableCell style={{ alignItems: 'center' }} align="right">hear about us</StyledTableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {data.user.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, user_id) => {
                  return (
                    <StyledTableRow hover role="checkbox" tabIndex={-1} key={user_id}>

                      <StyledTableCell>

                        {item.user_id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.firstname}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.lastname}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.mail}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.reset}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.new}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.image}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.username}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.active}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.birthday}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.age}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.logging_time}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.phone}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.pays}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.ville}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {item.hearAboutUs}
                      </StyledTableCell>
                   
                      <StyledTableCell align="right">
                        {item.sexe}
                      </StyledTableCell>

                    </StyledTableRow>
                  );
                })}


          </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[50, 100, 500]}
            component="div"
            count={data.user.length}
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

    );


}
export default Users;