import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useLocation, BrowserRouter as Router, useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import config from '../config';

const Title1 = {
  fontSize: '30px',
  color: '#008037',
  fontWeight: 'bold',
  marginLeft: '480px',
  justifyContent: 'center'
}
const Field = {
  marginLeft: '100px',
  width: '300px',
  marginTop: '25px',
  padding: '15px',


}
const buttonstyle = {
  marginLeft: '530px',
  marginTop: '50px',
  backgroundColor: '#008037',
  width: '120px',
  borderRadius: '5px'



}
const useStyles = makeStyles((theme) => ({
  ligne: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DealUpdate = (item, props) => {
 
  const [data, setData] = React.useState({
    error: '',
    data: [],
    temp: [],
    error: null,
    
    
    partnerId: "",
    name: "",
    typePar: "",
    commission_ratePar: "",
    discountPar: "",
    startingdate:"",
    expireddate:"",

    donner: item.item.deal_id,
    item1: item.item.imageurl,
    item2: item.item.discount,
    item3: item.item.PriceAfterDiscount,
    item4: item.item.PriceBeforeDiscount,
    item5: item.item.description,
    item6: item.item.deal_description,
    item7: item.item.startingdate,
    item8: item.item.expirydate,
    item9: item.item.restaurant_id,
    
  });
  console.log("le id des deals sont :",data.donner);
    const handleChange = (event) => {
    const name = event.target.name;
    setData({
      ...data,
      [name]: event.target.value,
    });
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose1 = () => {
    setOpen(false);

  };
  
  const [open1, setOpen1] = React.useState(false);

  const handleClick = () => {
    setOpen1(true);
  };
  
  const [dealdata, setDealdata] = React.useState({
    imageurl: data.item1,
    PriceAfterDiscount: data.item3,
    PriceBeforeDiscount: data.item4,
    description: data.item5,
    deal_description: data.item6,
    restaurant_id: data.item9,

  });

 

  const afterchange = (e) => {
    setDealdata({
      ...dealdata,
      PriceAfterDiscount: e
    })
  }
  const beforechange = (e) => {
    setDealdata({
      ...dealdata,
      PriceBeforeDiscount: e
    })
  }

  
  
  const getData = async () => {
    const url =  `https://api.foodealzapi.com/activedeals`;
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res)
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
  const handleEdit = (id) => {

    axios.put( `https://api.foodealzapi.com/updatedeals/${id}`, {
     
      discount:data.discountPar,
      PriceAfterDiscount: dealdata.PriceAfterDiscount,
      PriceBeforeDiscount: dealdata.PriceBeforeDiscount,
      startingdate: data.startingdate,
      expireddate: data.expireddate,
     
      
    })
      .then(() => {
        console.log("update successfully");
      })
      .catch(error => {
        console.log(" problem in updating " + error)

      });
  }

 
  const handleClose2 = () => {
    setOpen2(false);

  };
  

  const global = (id) => {
    handleEdit(id);
    handleClose2();
    handleClick();
    handleClose1();

  };
  // };
  const useStyles = makeStyles((theme) => ({
    ligne: {
      display: 'flex',
      flexDirection: 'row',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
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
      alignContent:'center',

    },
  }))(TableCell);

  return (
    <div >

        <Button style={{ marginLeft: '20px', marginTop: '50px', backgroundColor: '#008037' }} variant="outline-success" onClick={() => setOpen(true)}  >
          <EditIcon />

        </Button>


<Dialog
        open={open}
        onClose={handleClose1}

      >
        <DialogTitle >update offre</DialogTitle>
        <DialogContent>
        
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}>discount :</p>
            <FormControl style={{marginLeft:'50px'}} variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">discount</InputLabel>
              <Select
                native 
                value={data.discountPar}
                onChange={handleChange}
                inputProps={{
                  name: 'discountPar',
                  id: 'filled-age-native-simple3',
                }}
              >
                <option aria-label="None" value="" />
                <option value={"10%"}>10%</option>
                <option value={"20%"}>20%</option>
                <option value={"30%"}>30%</option>
                <option value={"40%"}>40%</option>
                <option value={"50%"}>50%</option>
                <option value={"60%"}>60%</option>
                <option value={"70%"}>70%</option>
                <option value={"80%"}>80%</option>
                <option value={"90%"}>90%</option>
              </Select>
            </FormControl>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>price after:</p>
            <TextField  style={{ marginLeft: '30px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="price after" defaultValue={dealdata.PriceAfterDiscount} onChange={e => afterchange(e.target.value)} variant="filled" />
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>price before :</p>
            <TextField  style={{ marginLeft: '15px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="price before" defaultValue={dealdata.PriceBeforeDiscount} onChange={e => beforechange(e.target.value)} variant="filled" />
          </div>

          
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>starting date :</p>
            <form className={classes.container} noValidate>
              <TextField
                style={{ marginTop: '40px', marginLeft: '40px' }}
                id="date1"
             
                label="starting date"
                type="datetime-local"
                name="starting date"
                value={data.startingdate}
                onChange={event => { console.log(event.target.value),setData({...data,startingdate:event.target.value })}}
                
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </div>
          <div className={classes.ligne} >
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>expired date :</p>
            <form className={classes.container} noValidate>
              <TextField
                style={{ marginTop: '40px', marginLeft: '40px' }}
                id="date2"
                label="expired date"
                type="datetime-local"
                name="expired date"
                defaultValue={data.expireddate}
                onChange={event => { console.log(event.target.value),setData({...data,expireddate:event.target.value })}}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </div>
          

        </DialogContent>
        <DialogActions>
          <Button style={{ backgroundColor: '#008037', borderRadius: '5px', marginLeft: '20px' }} onClick={handleClose1} >
            No
</Button>
          
          <Button style={{ backgroundColor: '#008037', borderRadius: '5px', marginLeft: '20px' }} onClick={() =>  setOpen2(true)} > valider </Button>
      <Dialog
        open={open2}
        onClose={handleClose2}

      >
        <DialogTitle >Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText >
            Are you sure you want to add this deal !!!!!
</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary">
            No
</Button>
          <Button onClick={() =>global(data.donner)} color="primary" >
            Yes
</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          deal is successfully updated!
</Alert>
      </Snackbar>
        </DialogActions>
      </Dialog>
      

      


    </div>

  )

};

export default DealUpdate;