import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useLocation, BrowserRouter as Router, useHistory } from "react-router-dom";
import { ContactSupportOutlined, FormatColorReset } from '@material-ui/icons';
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

const PartnersUpdate = (item, props) => {

  const [data, setData] = React.useState({
    error: '',
    data: [],
    temp: [],
    error: null,
    errors: [],
    typeres: '',
    discountPer: '',
    commission: '',
    donner: item.item.restaurant_id,
    item1: item.item.name,
    item2: item.item.mail,
    item3: item.item.password,
    item4: item.item.typePayment,
    item5: item.item.description,
    item6: item.item.address,
    item7: item.item.url,
    item8: item.item.phone,
    item9: item.item.latitude,
    item10: item.item.longitude,
    item11: item.item.type,
    item12: item.item.commission_rate,
    item13: item.item.logourl,
    item14: item.item.image,
    item15: item.item.discount,
    fields: [{ "name": item.item.name, "mail": item.item.mail, "description": item.item.description, "address": item.item.address, "site": item.item.url, "phone": item.item.phone, "latitude": item.item.latitude, "longitude": item.item.longitude , "type":item.item.type, "commissionRate":item.item.commission_rate, "discount":item.item.discount}],
  });



  

  const [formIsValid, setFormIsValid] = React.useState(false);

  const handleValidation = () => {
    const list =  [{ "name": data.item1, "mail": data.item2, "description": data.item5,
      "address": data.item6, "site": data.item7, "phone": data.item8,
       "latitude": data.item9, "longitude": data.item10, "type":data.item11, "commissionRate":data.item12, "discount": data.item15 }]
           const fields = list[0];

    
    const errors = {};
    let formIsValid = true;
    //Name
    if (!fields.name) {
      formIsValid = false;
      errors["name"] = "name cannot be empty";
    }



    //Email
    if (!fields.mail) {
      formIsValid = false;
      errors["mail"] = "mail cannot be empty";
    }

    if (typeof fields.mail !== "undefined") {
      const lastAtPos = fields.mail.lastIndexOf('@');
      const lastDotPos = fields.mail.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.mail.indexOf('@@') == -1 && lastDotPos > 2 && (fields.mail.length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["mail"] = "mail is not valid";
      }
    }
    //Phone
    if (!fields.phone) {
      formIsValid = false;
      errors["phone"] = "phone cannot be empty";
    }
    if (typeof fields.phone !== "undefined") {
      if (!fields.phone.toString().match(/^[0-9]+$/) && (fields.phone.toString().length) >= 8) {
        formIsValid = false;
        errors["phone"] = "phone incorrect";
      }
    }

    //latitude
    if (!fields.latitude) {
      formIsValid = false;
      errors["latitude"] = "lat cannot be empty";
    }
    if (typeof fields.latitude !== "undefined") {
      if (!fields.latitude.toString().match(/^[0-9]+$/) && fields.latitude.toString().indexOf('.') == -1) {
        formIsValid = false;
        errors["latitude"] = "lat must be float";
      }
    }

    //longitude
    if (!fields.longitude) {
      formIsValid = false;
      errors["longitude"] = "lng cannot be empty";
    }
    if (typeof fields.longitude !== "undefined") {
      if (!fields.longitude.toString().match(/^[0-9]+$/) && fields.longitude.toString().indexOf('.') == -1) {
        formIsValid = false;
        errors["longitude"] = "lng must be float";
      }
    }

    //address
    if (!fields.address) {
      formIsValid = false;
      errors["address"] = "address cannot be empty";
    }



    //description
    if (!fields.description) {
      formIsValid = false;
      errors["description"] = " description cannot be empty";
    }
    //site
    if (!fields.site) {
      formIsValid = false;
      errors["site"] = " site cannot be empty";
    }
     //type
     if (!fields.type) {
      formIsValid = false;
      errors["type"] = "type cannot be empty";
    }
     //commissionRate
     if (!fields.commissionRate) {
      formIsValid = false;
      errors["commissionRate"] = "commission cannot be empty";
    }
     //discount
     if (!fields.discount) {
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
    if (handleValidation()) {
      global(data.donner);
           alert("Form submitted and partner was updated, click ok ");
    }
    else {

      setOpen4(true);
    

    }

  }

  const handleChangee = (field, e) => {
    
    let diclist = []
    
    if (e == "name") {
      let list =  [{ "name": field, "mail": data.item2, "description": data.item5,
      "address": data.item6, "site": data.item7, "phone": data.item8,
       "latitude": data.item9, "longitude": data.item10,  "type":data.item11, "commissionRate":data.item12, "discount": data.item15 }]
       diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item1: field
      });
      
    }
    else if (e == "mail") {
 
      let list =  [{ "name": data.item1, "mail": field, "description": data.item5,
      "address": data.item6, "site": data.item7, "phone": data.item8,
       "latitude": data.item9, "longitude": data.item10 ,  "type":data.item11, "commissionRate":data.item12, "discount": data.item15 }]
       diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item2: field
      });
    }
    else if (e == "description") {
    
      let list =  [{ "name": data.item1, "mail": data.item2, "description": field,
      "address": data.item6, "site": data.item7, "phone": data.item8,
       "latitude": data.item9, "longitude": data.item10, "type":data.item11, "commissionRate":data.item12, "discount": data.item15 }]
       diclist.push(list)
       setData({
         ...data,
         fields: diclist,
         item5: field
       });
    }
    else if (e == "address") {
     
      let list =  [{ "name": data.item1, "mail": data.item2, "description": data.item5,
      "address": field, "site": data.item7, "phone": data.item8,
       "latitude": data.item9, "longitude": data.item10,  "type":data.item11, "commissionRate":data.item12, "discount": data.item15 }]
       diclist.push(list)
       setData({
         ...data,
         fields: diclist,
         item6: field
       });
    }
    else if (e == "site") {
      
      let list =  [{ "name": data.item1, "mail": data.item2, "description": data.item5,
      "address": data.item6, "site": field, "phone": data.item8,
       "latitude": data.item9, "longitude": data.item10,  "type":data.item11, "commissionRate":data.item12, "discount": data.item15 }]
       diclist.push(list)
       setData({
         ...data,
         fields: diclist,
         item7: field 
       });
    }
    else if (e == "phone") {
     
      let list =  [{ "name": data.item1, "mail": data.item2, "description": data.item5,
      "address": data.item6, "site": data.item7, "phone": field,
       "latitude": data.item9, "longitude": data.item10,  "type":data.item11, "commissionRate":data.item12, "discount": data.item15 }]
       diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item8: parseInt(field)
      });
    }

    else if (e == "latitude") {
     
      let list =  [{ "name": data.item1, "mail": data.item2, "description": data.item5,
      "address": data.item6, "site": data.item7, "phone": data.item8,
       "latitude": field, "longitude": data.item10,  "type":data.item11, "commissionRate":data.item12, "discount": data.item15 }]
       diclist.push(list)
       setData({
         ...data,
         fields: diclist,
         item9: parseFloat(field)
       });
    }

    else  if (e=="longitude") {
     
      let list =  [{ "name": data.item1, "mail": data.item2, "description": data.item5,
      "address": data.item6, "site": data.item7, "phone": data.item8,
       "latitude": data.item9, "longitude": field,  "type":data.item11, "commissionRate":data.item12, "discount": data.item15 }]
       diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item10: parseFloat(field)
      });
    }

    else  if (e=="type") {
      
      let list =  [{ "name": data.item1, "mail": data.item2, "description": data.item5,
      "address": data.item6, "site": data.item7, "phone": data.item8,
       "latitude": data.item9, "longitude": data.item10,  "type":field, "commissionRate":data.item12, "discount": data.item15 }]
       diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item11: field
      });
    }

    else  if (e=="commissionRate") {
   
      let list =  [{ "name": data.item1, "mail": data.item2, "description": data.item5,
      "address": data.item6, "site": data.item7, "phone": data.item8,
       "latitude": data.item9, "longitude": data.item10,  "type":data.item11, "commissionRate":field, "discount": data.item15 }]
       diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item12: field
      });
    }

    else  if (e=="discount") {
      
      let list =  [{ "name": data.item1, "mail": data.item2, "description": data.item5,
      "address": data.item6, "site": data.item7, "phone": data.item8,
       "latitude": data.item9, "longitude": data.item10,  "type":data.item11, "commissionRate":data.item12, "discount": field }]
       diclist.push(list)
      setData({
        ...data,
        fields: diclist,
        item15: field
      });
    }
  }



  console.log("le id des partenaires sont :", data.donner);
  const handleChange = (event) => {
    const name = event.target.name;
    setData({
      ...data,
      [name]: event.target.value,
    });
  };

  
  const [open, setOpen] = React.useState(false);
  const handleClose1 = () => {
    setOpen(false);

  };


  const [open2, setOpen2] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);


  const [partnerdata, setPartnerdata] = React.useState({
    partnerName: data.item1,
    partnerMail: data.item2,
    description: data.item5,
    address: data.item6,
    url: data.item7,
    phone: data.item8,
    latitude: data.item9,
    longitude: data.item10,


    logourl: data.item13,
    image: data.item14,



  });
  const [urlphoto, setUrlphoto] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(FormatColorReset)
  const [logo, setLogo] = useState('')
  const [urllogo, setUrlLogo] = useState('')


 
  const getData = async () => {
    const url = `${config.URL}/restaurants`;
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

    axios.put(`${config.URL}/restaurants/${id}`, {
      name: data.item1,
      mail: data.item2,
      description: data.item5,
      address: data.item6,
      url:data.item7,
      phone: parseInt(data.item8),
      latitude: parseFloat(data.item9),
      longitude: parseFloat(data.item10),
      type: data.item11,
      commission_rate: parseFloat(data.item12),
      logourl: urllogo,
      image: urlphoto,
      discount: data.item15
    })
      .then((res) => {
        console.log ("partner succesfully updated")
      })
      .catch(error => {
        console.log(error);
      });
  }


  const handleClose2 = () => {
    setOpen2(false);

  };

  

  const handleClose4 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen4(false);
  };

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
    
    setImage(file.secure_url)
    setLoading(false)
    setUrlphoto(uploadedimage)

  }

  const uploadLogo = async (e) => {
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
    setLogo(file.secure_url)
    setLoading(false)
    setUrlLogo(uploadedimage)

  }



  const global = (id) => {
    handleEdit(id);
    handleClose2();
    setOpen3(true);
    handleClose1();

  };
  
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
 
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
      alignContent: 'center',

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
        <DialogTitle >update partner</DialogTitle>
        <DialogContent>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>name :</p>
            <TextField style={{ marginLeft: '40px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="name" defaultValue={data.fields[0].name} name="name" onChange={(e) => handleChangee(e.target.value, "name")} value={data.fields.name}  variant="filled" />
            <span style={{ color: "red" }}>{data.errors["name"]}</span>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>mail :</p>
            <TextField style={{ marginLeft: '40px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="mail" defaultValue={data.fields[0].mail} name="mail" onChange={(e) => handleChangee(e.target.value, "mail")} value={data.fields.mail} variant="filled" />
            <span style={{ color: "red" }}>{data.errors["mail"]}</span>
          </div>

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>description :</p>
            <TextField style={{ width: '300px', marginTop: '25px', padding: '15px' }}
              label="description" defaultValue={data.fields[0].description} name="description" onChange={(e) => handleChangee(e.target.value, "description")} value={data.fields.description} variant="filled" />
            <span style={{ color: "red" }}>{data.errors["description"]}</span>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>address :</p>
            <TextField style={{ marginLeft: '20px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="address" defaultValue={data.fields[0].address} name="address" onChange={(e) => handleChangee(e.target.value, "address")} value={data.fields.address} variant="filled" />
            <span style={{ color: "red" }}>{data.errors["address"]}</span>
          </div>
          <div className={classes.ligne} >
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>site web :</p>
            <TextField style={{ marginLeft: '15px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="url de site web" defaultValue={data.fields[0].site} name="site" onChange={(e) => handleChangee(e.target.value, "site")} value={data.fields.site} variant="filled" />
            <span style={{ color: "red" }}>{data.errors["site"]}</span>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>phone :</p>
            <TextField style={{ marginLeft: '25px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="phone" defaultValue={data.fields[0].phone} name="phone" onChange={(e) => handleChangee(e.target.value, "phone")} value={data.fields[0].phone} variant="filled" />
            <span style={{ color: "red" }}>{data.errors["phone"]}</span>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>latitude :</p>
            <TextField style={{ marginLeft: '15px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="latitude" defaultValue={data.fields[0].latitude} name="latitude" onChange={(e) => handleChangee(e.target.value, "latitude")} value={data.fields.latitude} variant="filled" />
            <span style={{ color: "red" }}>{data.errors["latitude"]}</span>
          </div>

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>longitude :</p>
            <TextField style={{  width: '300px', marginTop: '25px', padding: '15px' }}
              label="longitude" defaultValue={data.fields[0].longitude} name="longitude" onChange={(e) => handleChangee(e.target.value, "longitude")} value={data.fields.longitude} variant="filled" />
            <span style={{ color: "red" }}>{data.errors["longitude"]}</span>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}>type :</p>
            <FormControl style={{ marginLeft: '45px' }} variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">type</InputLabel>
              <Select
                native
                value={data.fields.type}
                defaultValue={data.fields[0].type}
                onChange={(e) =>handleChangee(e.target.value, "type")}
                inputProps={{
                  name: 'typeres',
                  id: 'filled-age-native-simple1',
                }}
              >
                <option aria-label="None" value="" />
                <option value={"patisserie"}>patisserie</option>
                <option value={"restaurant"}>restaurant</option>
                <option value={"epicerie"}>epicerie</option>
              </Select>
            </FormControl>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}>commission rate :</p>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">commission rate</InputLabel>
              <Select
                native
                value={data.fields.commissionRate}
                defaultValue={data.fields[0].commissionRate}
                onChange={(e) =>handleChangee(e.target.value, "commissionRate")}
                inputProps={{
                  name: 'commission',
                  id: 'filled-age-native-simple2',
                }}
              >
                <option aria-label="None" value="" />
                <option value={0.1}>0.1</option>
                <option value={0.12}>0.12</option>
                <option value={0.15}>0.15</option>
              </Select>
            </FormControl>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '40px' }}>logo :</p>
            <input
            style={{marginLeft:"70px", marginTop:"40px"}}
             type="file"
              name="file"
              placeholder="Upload an image"
              onChange={(e) => { uploadLogo(e) }}
            />
            {
              loading ? (
                <h3 style={{marginLeft:"20px", marginTop:"30px"}}> Logo....</h3>
              ) : (
                <img src={logo} style={{ width: '100px' }} />
              )
            }
          </div>

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '40px' }}>image :</p>
            <input 
            style={{marginLeft:"70px", marginTop:"40px"}}
            type="file"
              name="file"
              placeholder="Upload an image"
              onChange={(e) => { uploadImage(e) }}
            />
            {
              loading ? (
                <h3 style={{marginLeft:"20px", marginTop:"30px"}}> Image....</h3>
              ) : (
                <img src={image} style={{ width: '100px' }} />
              )
            }
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}>discount :</p>
            <FormControl style={{ marginLeft: '20px' }} variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">discount</InputLabel>
              <Select
                native
                value={data.fields.discount}
                defaultValue={data.fields[0].discount}
                onChange={(e) =>handleChangee(e.target.value, "discount")}
                inputProps={{
                  name: 'discountPer',
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

        

        </DialogContent>
        <DialogActions>
          <Button style={{ backgroundColor: '#008037', borderRadius: '5px', marginLeft: '20px' }} onClick={handleClose1} >
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





    </div>

  )

};

export default PartnersUpdate;