import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import { parse } from "papaparse";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
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
        axios.post(`entrer url`, data.result)
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
               const postarry= {"Quantity": donner.data[i][1],"Quantity Sold":donner.data[i][2],"Starting date":donner.data[i][3],"Expired date":donner.data[i][4], "starting hour":donner.data[i][5],"expired hour":donner.data[i][6], "active":donner.data[i][7],"restaurant id":donner.data[i][8], "deal id":donner.data[i][9] }
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



    const useStyles = makeStyles({
        table: {
            minWidth: 400,
            marginTop: 20,
        },
    });
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
                onClick={() =>{addArray()}}


            > import file CSV </Button>
            <div>
                <paper>
                    <TableContainer>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell> Id</StyledTableCell>
                                    <StyledTableCell>Quantity</StyledTableCell>
                                    <StyledTableCell>Quantity Sold</StyledTableCell>
                                    <StyledTableCell>Starting date</StyledTableCell>
                                    <StyledTableCell>Expired date</StyledTableCell>
                                    <StyledTableCell>starting hour</StyledTableCell>
                                    <StyledTableCell>expired hour</StyledTableCell>
                                    <StyledTableCell>active</StyledTableCell>
                                    <StyledTableCell>restaurant id</StyledTableCell>
                                    <StyledTableCell>deal id</StyledTableCell>
                                   
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => {
                                    return (
                                        <StyledTableRow hover role="checkbox">
                                            <StyledTableCell >
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
                                            <StyledTableCell align="right">
                                                {item[7]}
                                            </StyledTableCell >
                                            <StyledTableCell align="right">
                                                {item[8]}
                                            </StyledTableCell >
                                            <StyledTableCell align="right">
                                                {item[9]}
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
