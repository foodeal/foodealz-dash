import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useLocation, BrowserRouter as Router, useHistory } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
    errors: [],
    
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
    fields: [{ "discount":item.item.discount , "priceBefore": (item.item.PriceBeforeDiscount).toString(), "priceAfter":item.item.PriceAfterDiscount.toString(), "startingDate":item.item.startingdate , "expiredDate":item.item.expirydate  }],
    
  });
  console.log("les chapms initiales sont", data.fields);
  
   

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
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

  const handleValidation =() =>{
    const list = [{  "discount":data.item2 , "priceBefore": (data.item4).toString(), "priceAfter":(data.item3).toString(), "startingDate":data.item7 , "expiredDate":data.item8  }]
    const fields = list[0];
    const errors={};
    let formIsValid = true;

    

        //priceBefore
        if(!fields.priceBefore){
          formIsValid = false;
          errors["priceBefore"] = "lat cannot be empty";
       }     
       if(typeof fields.priceBefore !== "undefined"){
          if(!fields.priceBefore.match(/^[0-9]+$/) && fields.priceBefore.indexOf('.') == -1 ){
          formIsValid = false;
             errors["priceBefore"] = "price must be float";
          }        
       }

        //priceAfter
        if(!fields.priceAfter){
          formIsValid = false;
          errors["priceAfter"] = "lng cannot be empty";
       }     
       if(typeof fields.priceAfter !== "undefined"){
          if(!fields.priceAfter.match(/^[0-9]+$/) && fields.priceAfter.indexOf('.') == -1){
          formIsValid = false;
             errors["priceAfter"] = "price must be float";
          }        
       } 

       //discount
    if (!fields.discount) {
      formIsValid = false;
      errors["discount"] = " discount cannot be empty";
    }


       setData({
     ...data,
     errors: errors,
   });

    //startingDate
    if(!fields.startingDate){
      formIsValid = false;
      errors["startingDate"] = "date cannot be empty";
   }     
  

   //expiredDate
   if(!fields.expiredDate){
    formIsValid = false;
    errors["expiredDate"] = "date cannot be empty";
 }     
 

   return formIsValid;


};

const contactSubmit = (e) => {
  console.log("validation test :")
    e.preventDefault()
    if(handleValidation()){

      // setOpen3(true);
      global(data.donner);
  
          alert("Form submitted and deal was updated , click ok ");
       }
       else{

        setOpen4(true);      
          // alert("Form has errors. click ok and correct items")
        
       }

}



const handleChangee =(field, e) =>{
    // let fields = data.fields;
    let diclist = []

    if (e == "priceBefore") {
      let list = [{ "discount":data.item2 , "priceBefore": field, "priceAfter":(data.item3).toString(), "startingDate":data.item7 , "expiredDate":data.item8  }]
      diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item4: parseFloat(field)
      });
    } else if(e == "priceAfter")  {
      let list = [{ "discount":data.item2 , "priceBefore": (data.item4).toString(), "priceAfter":field, "startingDate":data.item7 , "expiredDate":data.item8 }]
      diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item3: parseFloat(field)

      });
    }

     else if (e == "discount") {
      let list = [{  "discount":field , "priceBefore": (data.item4).toString(), "priceAfter":(data.item3).toString(), "startingDate":data.item7 , "expiredDate":data.item8}]
      diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item2: field

      });
    }

    else if (e == "startingDate") {
      let list = [{  "discount":data.item2 , "priceBefore": (data.item4).toString(), "priceAfter":(data.item3).toString(), "startingDate":field , "expiredDate":data.item8}]
      diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item7: field

      });
    }
    else if (e == "expiredDate") {
      let list = [{  "discount":data.item2 , "priceBefore": (data.item4).toString(), "priceAfter":(data.item3).toString(), "startingDate":data.item7 , "expiredDate":field}]
      diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item8: field

      });
    }


   
    console.log(data.fields)
}


const handleClose4 = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen4(false);
};

 

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
    const url =  `${config.URL}/activedeals`;
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

    axios.put( `${config.URL}/updatedeals/${id}`, {
     
      discount:data.item2,
      PriceAfterDiscount: data.item3,
      PriceBeforeDiscount: data.item4,
      startingdate: data.item7,
      expirydate: data.item8,
     
      
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
                value={data.fields.discount}
                defaultValue={data.fields[0].discount}
                onChange={(e) => handleChangee(e.target.value, "discount")}
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
              label="price after" defaultValue={data.fields[0].priceAfter}  name="priceAfter" onChange={(e)=> handleChangee(e.target.value,"priceAfter")} value={data.fields.priceAfter}  variant="filled" />
              <span style={{color: "red"}}>{data.errors["priceAfter"]}</span>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>price before :</p>
            <TextField  style={{ marginLeft: '15px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="price before" defaultValue={data.fields[0].priceBefore} name="priceBefore" onChange={(e)=> handleChangee(e.target.value,"priceBefore")} value={data.fields.priceBefore} variant="filled" />
              <span style={{color: "red"}}>{data.errors["priceBefore"]}</span>
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
                value={data.fields.startingDate}
                defaultValue={data.fields[0].startingDate}
                onChange={event => { console.log(event.target.value),handleChangee(event.target.value, "startingDate")}}
                
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
                defaultValue={data.fields[0].expiredDate}
                value={data.fields.expiredDate}
                onChange={event => { console.log(event.target.value),handleChangee(event.target.value, "expiredDate")}}
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
          <Button onClick={(e) => contactSubmit(e)} color="primary" >
            Yes
</Button>
        </DialogActions>
      </Dialog>
      {/* <Snackbar open={open3} autoHideDuration={8000} onClose={handleClose3} message=" All Forms are Valid and deal is updated " /> */}
      <Snackbar open={open4} autoHideDuration={3000} onClose={handleClose4} message="There are invalid forms!" />
        </DialogActions>
      </Dialog>
      

      


    </div>

  )

};

export default DealUpdate;