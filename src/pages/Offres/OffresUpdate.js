import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TableCell from '@material-ui/core/TableCell';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Dialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import config from '../config.json';


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
    activity: '',
    startingdate: '',
    expireddate: '',
    errors: [],
    startinghour: '',
    expiredhour: '',
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
    fields: [{ "quantity": (item.item.quantity).toString(), "quantitySold": (item.item.nbre_redeemed_deal).toString(), "active":item.item.active }],
  });

  console.log("les champs initiales sont", data.fields)

  

  
  const [open, setOpen] = React.useState(false);


  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
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

  const handleValidation = () => {
    const list = [{ "quantity": data.item1.toString(), "quantitySold": data.item2.toString(), "active":data.item7 }]
    const fields = list[0];
    // console.log()
    const errors = {};
    let formIsValid = true;

    //quantity
    if (!fields.quantity) {
      formIsValid = false;
      errors["quantity"] = "qt cannot be empty";
    }
    if (typeof fields.quantity !== "undefined") {
      if (!fields.quantity.toString().match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["quantity"] = "qt must be only numbers";
      }
    }

    //quantitySold
    if (!fields.quantitySold) {
      formIsValid = false;
      errors["quantitySold"] = "qtSold cannot be empty";
    }
    if (typeof fields.quantitySold !== "undefined") {
      if (!fields.quantitySold.toString().match(/^[0-9]+$/)) {
        formIsValid = false;
        errors["quantitySold"] = "qtSold must be only numbers";
      }
    }
    //active
    if (!fields.active) {
      formIsValid = false;
      errors["active"] = " active cannot be empty";
    }
    setData({
      ...data,
      errors: errors,
    });

    return formIsValid;


  };


  const contactSubmit = (e) => {
    console.log("validation test :")
    e.preventDefault()
    if (handleValidation()) {

      global(data.donner);

      alert("Form submitted and offer was updated , click ok ");
    }
    else {

      setOpen4(true);
      

    }

  }


  const handleClose4 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen4(false);
  };


  const handleChangee = (field, e) => {
    
    let diclist = []

    if (e == "quantity") {
      let list = [{ "quantity": field, "quantitySold": data.item2.toString(), "active":data.item7 }]
      diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item1: parseInt(field)
      });
    } else if(e == "quantitySold")  {
      let list = [{ "quantity": data.item1.toString(), "quantitySold": field, "active":data.item7 }]
      diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item2: parseInt(field)

      });
    }

     else if (e == "active") {
      let list = [{ "quantity": data.item1.toString(), "quantitySold": data.item2.toString(), "active":field}]
      diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item7: field

      });
    }

  }


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
  const handleEdit = (id) => {
console.log(data.item7)
    axios.put(`${config.URL}/dealsscheduled/${id}`, {

      quantity: parseInt(data.item1),
      nbre_redeemed_deal: parseInt(data.item2),
      active: data.item7,

    })
      .then(() => {
        console.log("updated successfully")
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
              <TextField style={{ marginLeft: '50px', width: '300px', marginTop: '25px', padding: '15px' }}
                label="quantity" defaultValue={data.fields[0].quantity} name="quantity" onChange={(e) => handleChangee(e.target.value, "quantity")} value={data.fields.quantity} variant="filled" />
              <span style={{ color: "red" }}>{data.errors["quantity"]}</span>
            </div>
            <div className={classes.ligne}>
              <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>quantity sold :</p>
              <TextField style={{ marginLeft: '20px', width: '300px', marginTop: '25px', padding: '15px' }}
                label="quantity sold" defaultValue={data.fields[0].quantitySold} name="quantitySold" onChange={(e) => handleChangee(e.target.value, "quantitySold")} value={data.fields.quantitySold} variant="filled" />
              <span style={{ color: "red" }}>{data.errors["quantitySold"]}</span>
            </div>
            

            <div className={classes.ligne}>
              <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}> active or not :</p> 

               <FormControl style={{ marginLeft: '40px' }} variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="filled-age-native-simple">active or not</InputLabel>
                <Select
                  native
                  value={data.fields.active}
                  defaultValue={data.fields[0].active}
                  onChange={(e) =>handleChangee(e.target.value, "active")}
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



          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1} style={{ backgroundColor: '#008037', borderRadius: '5px', marginLeft: '20px' }} >
              No
</Button>

            <Button style={{ backgroundColor: '#008037', borderRadius: '5px', marginLeft: '20px' }} onClick={() => setOpen2(true)} > valider </Button>
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
                <Button onClick={(e) => contactSubmit(e)} color="primary" >
                  Yes
</Button>
              </DialogActions>
            </Dialog>
            
            <Snackbar open={open4} autoHideDuration={3000} onClose={handleClose4} message="There are invalid forms!" />
          </DialogActions>
        </Dialog>


      </StyledTableCell>
    </div>
  )

};

export default OffresUpdate;