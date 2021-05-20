import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import { parse } from "papaparse";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import axios from 'axios';
import TableHead from '@material-ui/core/TableHead';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
// import {csv} from "d3";
const TestCSV = () => {

    

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [data, setData] = React.useState({
        error: '',
        data: [],
        result: [],
        error: null,

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

    const addArray = () => {
        axios.post(`https://prod.foodealzapi.com/Invendus/MultiAdd`, data.result)
          .then((res) => {
            console.log("add done");
          })
          .catch(error => {
            console.log(" problem in posting " + error)
    
          });
    
      }

    const onDrop = (e) => {
        e.preventDefault();
        console.log(e.dataTransfer.files);
        Array.from(e.dataTransfer.files).filter(
            (files) => files.type === "application/vnd.ms-excel"
        ).forEach(async (file) => {
            const text = await file.text();
            const donner = parse(text)
            let arrayy = []
            let postdata=[]
            for (let i = 1; i < donner.data.length; i++) {
               arrayy.push(donner.data[i])
               const postarry= {"nom": donner.data[i][0],"image":donner.data[i][1],"PriceBeforeDiscount":donner.data[i][2],"PriceAfterDiscoun":donner.data[i][3], "discount":donner.data[i][4],"description":donner.data[i][5], "restaurant_id":donner.data[i][6]}
               postdata.push(postarry)
            }
            console.log("les data sont", arrayy);
            setData({
                ...data,
                data: arrayy,
                result: postdata
            })
            await localStorage.setItem('result',donner.data)
        });
    }

   

    const useStyles = makeStyles((theme) =>({
        table: {
            minWidth: 400,
            marginTop: 20,
        },
       
    }));
    const classes = useStyles();

    return (
        <div>
            <h3 style={{ marginLeft: "20px" }} > Import offers from CSV</h3>
            <Button
                style={{ backgroundColor: "#008037", marginLeft: "20px" }}


                onDragOver={(e) => {
                    e.preventDefault();

                }}
                onDrop={(e) => { onDrop(e); console.log("data est :",data.data)
                }}
               


            > import file CSV </Button>
            <div >
            <Button
                style={{ backgroundColor: "#008037", marginLeft: "20px", marginTop:"20px" }}
                onClick={() =>{addArray()}}



            > add file CSV </Button>
            </div>
            <div>
                <paper>
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>nom</StyledTableCell>
                                    <StyledTableCell>image</StyledTableCell>
                                    <StyledTableCell>Price Before</StyledTableCell>
                                    <StyledTableCell>Price After</StyledTableCell>
                                    <StyledTableCell>discount</StyledTableCell>
                                    <StyledTableCell>description</StyledTableCell>
                                    <StyledTableCell>restaurant id</StyledTableCell>
                                   
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                                    return (
                                        <StyledTableRow hover role="checkbox">
                                            
                                            <StyledTableCell align="right">
                                                {item[0]}
                                            </StyledTableCell >
                                            <StyledTableCell align="right">
                                                {item[1]}
                                            </StyledTableCell >
                                            <StyledTableCell align="right">
                                                {item[2]}
                                            </StyledTableCell >
                                            <StyledTableCell align="right">
                                                {item[3]}
                                            </StyledTableCell >
                                            <StyledTableCell align="right">
                                                {item[4]}
                                            </StyledTableCell >
                                            <StyledTableCell align="right">
                                                {item[5]}
                                            </StyledTableCell >
                                            <StyledTableCell align="right">
                                                {item[6]}
                                            </StyledTableCell >
                                        

                                        </StyledTableRow>
                                    )
                                })

                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={data.data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    /> 
                </paper>
            </div>
        </div>

    )
};
export default TestCSV;
