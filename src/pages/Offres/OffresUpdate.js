import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TableCell from '@material-ui/core/TableCell';
import axios from 'axios';
import { useLocation, BrowserRouter as Router, useHistory } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import NativeSelect from '@material-ui/core/NativeSelect';
import { Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
   
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const OffresUpdate = (item, props) => {

  const [data, setData] = React.useState({
    error: '',
    data: [],
    temp: [],
    activity:'',
    startingdate:'',
    expireddate:'',
    startinghour:'',
    expiredhour:'',
    error: null,
    donner: item.item.id,
    item1: item.item.quantity,
    item2: item.item.nbre_redeemed_deal,
    item3: item.item.startingdate,
    item4: item.item.expirydate,
    item5: item.item.startingdate_hours,
    item6: item.item.expirydate_hours,
    item7: item.item.active,
    item8: item.item.restaurant_id,
    item9: item.item.deal_id,
  });

  
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

  
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClick = () => {
    setOpen1(true);
  };
  
  const [offredata, setOffredata] = React.useState({
    
    quantity: data.item1,
    nbre_redeemed_deal: data.item2,
    startingdate: data.item3,
    expirydate: data.item4,
    startingdate_hours: data.item5,
    expirydate_hours: data.item6,
    
    



  });

  

  const qtchange = (e) => {
    setOffredata({
      ...offredata,
      quantity: e
    })
  }
  const offresoldchange = (e) => {
    setOffredata({
      ...offredata,
      nbre_redeemed_deal: e
    })
  }
  const startingdatechange = (e) => {
    setOffredata({
      ...offredata,
      startingdate: e
    })
  }
  const expirydatechange = (e) => {
    setOffredata({
      ...offredata,
      expirydate: e
    })
  }
  const startingdate_hourschange = (e) => {
    setOffredata({
      ...offredata,
      startingdate_hours: e
    })
  }
  const expirydate_hourschange = (e) => {
    setOffredata({
      ...offredata,
      expirydate_hours: e
    })
  }
  // const activechange = (e) => {
  //   setOffredata({
  //     ...offredata,
  //     active: e
  //   })
  // }
 
  const getData = async () => {
    const url =  `https://api.foodealzapi.com/deals`;
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
  const handleEdit = (id) => {

    axios.put(`https://api.foodealzapi.com/dealsscheduled/${id}`, {
     
      quantity: parseInt(offredata.quantity),
      nbre_redeemed_deal: parseInt(offredata.nbre_redeemed_deal),
      // startingdate: data.startingdate,
      // expirydate: data.expirydate,
      // startingdate_hours: data.startingdate_hours,
      // expirydate_hours: data.expirydate_hours,
      active: data.activity,
     
    })
      .then(() => {
        console.log("done successfully")
      })
      .catch(error => {
        console.log(error);
      });
  }
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
  const handleClose2 = () => {
    setOpen2(false);

  };

  const global = (id) => {
    handleEdit(id);
    handleClose2();
    handleClick();
    handleClose1();
  }
  const handleClose1 = () => {
    setOpen(false);

  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };

  
  const classes = useStyles();

  return (
    <div >
       <StyledTableCell align="right">

                      
<Button style={{ marginLeft: '20px', marginTop: '50px', backgroundColor: '#008037' }} variant="outline-success" onClick={() => setOpen(true)}  >
  <EditIcon />

</Button>


       <Dialog
        open={open}
        onClose={handleClose1}

      >
        <DialogTitle >Update Offer</DialogTitle>
        <DialogContent>

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>quantity :</p>
            <TextField style={{ marginLeft: '50px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="quantity" defaultValue={data.item1} onChange={e => qtchange(e.target.value)} variant="filled" />
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>quantity sold :</p>
            <TextField style={{ marginLeft: '20px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="quantity sold" defaultValue={data.item2} onChange={e => offresoldchange(e.target.value)} variant="filled" />
          </div> 
          {/* <div className={classes.ligne}>
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
          <div className={classes.ligne}>
          <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>starting hour :</p>
            <form className={classes.container} noValidate>
              <TextField
              style={{ marginTop: '40px', marginLeft: '40px' }}
                id="time1"
                
                label="starting hour"
                type="time"
                defaultValue={data.startinghour}
                onChange={event => { console.log(event.target.value),setData({...data,startinghour:event.target.value })}}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </form>
          </div>
          <div className={classes.ligne}>
          <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>expired hour :</p>
            <form className={classes.container} noValidate>
              <TextField
              style={{ marginTop: '40px', marginLeft: '40px' }}
                id="time2"
                
                label="expired hour"
                type="time"
                defaultValue={data.expiredhour}
                onChange={event => { console.log(event.target.value),setData({...data,expiredhour:event.target.value })}}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </form>
          </div> */}
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}> active or not :</p>

            <FormControl style={{marginLeft:'40px'}}  variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">active or not</InputLabel>
              <Select
                native
                value={data.activity}
                onChange={handleChange}
                inputProps={{
                  name: 'activity',
                  id: 'filled-age-native-simple',
                }}
              >
                <option aria-label="None" value="" />
                <option value={"active"}>active</option>
                <option value={"not active"}>not active</option>

              </Select>
            </FormControl>
          </div>
          {/* <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }} >restaurant id :</p>
            <TextField style={Field}
              label="restaurant id" onChange={e => restaurant_idchange(e.target.value)} variant="filled" />
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }} >deal id :</p>
            <TextField style={Field}
              label="deal id" onChange={e => deal_idchange(e.target.value)} variant="filled" />
          </div > */}


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1} style={{ backgroundColor: '#008037', borderRadius: '5px', marginLeft: '20px' }} >
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
          <Button onClick={() => global(data.donner)} color="primary" >
            Yes
</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          offre is successfully updated!
</Alert>
      </Snackbar>
        </DialogActions>
      </Dialog>


     </StyledTableCell>
    </div>
  )

};

export default OffresUpdate;