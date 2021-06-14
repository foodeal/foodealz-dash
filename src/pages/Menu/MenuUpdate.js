import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

import { useLocation, BrowserRouter as Router, useHistory } from "react-router-dom";
import { ContactSupportOutlined, FormatColorReset } from '@material-ui/icons';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dialog } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

import EditIcon from '@material-ui/icons/Edit';
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
const MenuUpdate = (item) => {


  const [data, setData] = React.useState({
    error: '',
    data: [],
    temp: [],
    errors: [],
    discountPer:"",
    error: null,
    donner: item.item.id,
    item1:item.item.nom,
    item2: item.item.image,
    item3: item.item.PriceBeforeDiscount,
    item4: item.item.PriceAfterDiscoun,
    item5: item.item.discount,
    item6: item.item.description,
    item7: item.item.restaurant_id,
    fields: [{ "priceBefore": item.item.PriceBeforeDiscount, "priceAfter": item.item.PriceAfterDiscoun , "discount": item.item.discount}],
    
  });
  console.log("les champs initiales sont", data.fields)

  const [image, setImage] = useState('')
  const [urlphoto, setUrlphoto] = useState('')
  const [loading, setLoading] = useState(FormatColorReset)

 
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

  const uploadImage = async (e) => {
    const files = e.target.files
    const dataa = new FormData()
    dataa.append('file', files[0])
    dataa.append('upload_preset', 'ablahorchi')
    setLoading(true)
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/da8pq7gcb/image/upload',
      {
        method: 'POST',
        body: dataa
      }
    )
    const file = await res.json()
    let uploadedimage = file.url
    // uploadedimage.push(file);
    setImage(file.secure_url)
    setLoading(false)
    setUrlphoto(uploadedimage)

  }

 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };

  const history = useHistory();
  const handleHistory = () => {
    history.push("/");
  }

  
  const [basketdata, setBasketdata] = React.useState({
    nom: data.item1,
    image: urlphoto,
    PriceBeforeDiscount: data.item3,
    PriceAfterDiscoun: data.item4,
   
    description: data.item6,
    restaurant_id: data.item7


  });
  

  const handleClose2 = () => {
    setOpen2(false);

  };

  const global = (id) => {
    handleEdit(id);
    handleClose2();
    handleClose1();
  };
  const handleClose1 = () => {
    setOpen(false);

  };
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  const handleValidation =() =>{
    
    const list = [{ "priceBefore": data.item3.toString(), "priceAfter":data.item4.toString(), "discount":data.item5 }]
    const fields = list[0];
    const errors={};
    let formIsValid = true;

    

         //priceBefore
         if(!fields.priceBefore){
          formIsValid = false;
          errors["priceBefore"] = "lat cannot be empty";
       }     
       if(typeof fields.priceBefore !== "undefined"){
          if(!fields.priceBefore.match(/^[0-9]+$/) && fieldspriceBefore.indexOf('.') == -1 ){
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

        //priceAfter
        if(!fields.discount){
          formIsValid = false;
          errors["discount"] = "discount cannot be empty";
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
    if(handleValidation()){

      
      global(data.donner);
  
          alert("Form submitted and menu was updated , click ok ");
       }
       else{

        setOpen4(true);      
   
        
       }

}



const handleChangee =(field, e) =>{
  let diclist = []

  if (e == "priceBefore") {
    let list = [{ "priceBefore": field, "priceAfter": data.item4.toString(), "discount":data.item5 }]
    diclist.push(list)
    setData({
      ...data,
      fields: diclist,
      item3: parseFloat(field)
    });
  } else if(e == "priceAfter")  {
    let list = [{ "priceBefore": data.item3.toString(), "priceAfter": field, "discount":data.item5}]
    diclist.push(list)
    setData({
      ...data,
      fields: diclist,
      item4: parseFloat(field)

    });
}
else if(e == "discount")  {
  let list = [{ "priceBefore": data.item3.toString(), "priceAfter": data.item4.toString(), "discount":field}]
  diclist.push(list)
  setData({
    ...data,
    fields: diclist,
    item5: field

  });
}
console.log(data.fields)
}

const handleClose3 = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen3(false);
};

const handleClose4 = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen4(false);
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
  const handleEdit = (id) => {


    axios.put(`${config.URL}/Invendus/${id}`, {

      PriceBeforeDiscount: data.item3,
      PriceAfterDiscoun: data.item4,
      discount: data.item5,

    })

      .then(() => {
        console.log("done successfully");

      })
      .catch(error => {
        console.log('updating error is :' + error);
      });
  };
  
  const classes = useStyles();

  return (
    <div >
   
        <Button style={{ marginLeft: '20px', marginTop: '50px', backgroundColor: '#008037' }} variant="outline-success" onClick={() => setOpen(true)}  >
          <EditIcon />

        </Button>

        <Dialog
          open={open}
          onClose={handleClose1}

        >
          <DialogTitle >Update Menu</DialogTitle>
          <DialogContent>
           
            <div className={classes.ligne}>
              <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}> price before</p>

              <TextField  style={{ marginLeft: '20px',width: '300px',marginTop: '25px',padding: '15px'}}
                label="price before" defaultValue={data.fields[0].priceBefore}  name="priceBefore" onChange={(e)=> handleChangee(e.target.value,"priceBefore")} value={data.fields.priceBefore} variant="filled" />
<span style={{color: "red"}}>{data.errors["priceBefore"]}</span>
            </div>
            <div className={classes.ligne}>
              <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}> price after :</p>
              <TextField  style={{ marginLeft: '20px',width: '300px',marginTop: '25px',padding: '15px'}}
                label="price after" defaultValue={data.fields[0].priceAfter}  name="priceAfter" onChange={(e)=> handleChangee(e.target.value,"priceAfter")} value={data.fields.priceAfter
                } variant="filled" />
                <span style={{color: "red"}}>{data.errors["priceAfter"]}</span>
            </div>
            <div className={classes.ligne}>
              <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}> discount :</p>
              <FormControl style={{marginLeft:'50px'}}variant="filled" className={classes.formControl}>
                <InputLabel ht mlFor="filled-age-native-simple">discount</InputLabel>
                <Select
                  native
                  value={data.fields.discount}
                  defaultValue={data.fields[0].discount}
                  onChange={(e) =>handleChangee(e.target.value, "discount")}
                  inputProps={{
                    name: 'discountPer',
                    id: 'filled-age-native-simple',
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





          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1} style={{ backgroundColor: '#008037', borderRadius: '5px' }}>
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
      {/* <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Menu is successfully updated!
</Alert>
      </Snackbar> */}
          </DialogActions>
        </Dialog>

        {/* <Snackbar open={open3} autoHideDuration={8000} onClose={handleClose3} message=" All Forms are Valid and menu is updated " /> */}
      <Snackbar open={open4} autoHideDuration={3000} onClose={handleClose4} message="There are invalid forms!" />


        

      





    </div>

  )

};


export default MenuUpdate;