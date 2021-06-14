import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { Dialog } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import DialogActions from '@material-ui/core/DialogActions';
import MuiAlert from '@material-ui/lab/Alert';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { ContactSupportOutlined, FormatColorReset } from '@material-ui/icons';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
  marginLeft: '10px',
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
    flexDirection: 'row',
    marginTop: '30px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Partnersadd = (item) => {
  const [data, setData] = React.useState({
    error: '',
    data: [],
    temp: [],
    photo: "",
    error: null,
    fields: [],
    errors: [],
    partnerItems: [],
    name: "",
    typePar: "",
    startinghour: '',
    expiredhour: '',
    commission_ratePar: "",
    discountPar: ""
  });
  const [formIsValid, setFormIsValid] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);

  const [open4, setOpen4] = React.useState(false);

  const [image, setImage] = useState('')
  const [urlphoto, setUrlphoto] = useState('')
  const [logo, setLogo] = useState('')
  const [urllogo, setUrlLogo] = useState('')
  const [loading, setLoading] = useState(FormatColorReset)

  const handleValidation =() =>{
    const fields= data.fields;
    const errors={};
    let formIsValid = true;

       //Name
       if(!fields["name"]){
          formIsValid = false;
          errors["name"] = "name cannot be empty";
       }     
             
       

         //Email
       if(!fields["mail"]){
          formIsValid = false;
          errors["mail"] = "mail cannot be empty";
       }
 
       if(typeof fields["mail"] !== "undefined"){
          const lastAtPos = fields["mail"].lastIndexOf('@');
          const lastDotPos = fields["mail"].lastIndexOf('.');

          if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["mail"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["mail"].length - lastDotPos) > 2)) {
            formIsValid = false;
             errors["mail"] = "mail is not valid";
           }
      }  
      //Phone
       if(!fields["phone"]){
          formIsValid = false;
          errors["phone"] = "phone cannot be empty";
       }     
       if(typeof fields["phone"] !== "undefined"){
          if(!fields["phone"].match(/^[0-9]+$/) && (fields["phone"].length) >= 8){
          formIsValid = false;
             errors["phone"] = "phone incorrect";
          }        
       }

        //latitude
        if(!fields["latitude"]){
          formIsValid = false;
          errors["latitude"] = "lat cannot be empty";
       }     
       if(typeof fields["latitude"] !== "undefined"){
          if(!fields["latitude"].match(/^[0-9]+$/) && fields["latitude"].indexOf('.') == -1 ){
          formIsValid = false;
             errors["latitude"] = "lat must be float";
          }        
       }

        //longitude
        if(!fields["longitude"]){
          formIsValid = false;
          errors["longitude"] = "lng cannot be empty";
       }     
       if(typeof fields["longitude"] !== "undefined"){
          if(!fields["longitude"].match(/^[0-9]+$/) && fields["longitude"].indexOf('.') == -1){
          formIsValid = false;
             errors["longitude"] = "lng must be float";
          }        
       }

        //address
        if(!fields["address"]){
          formIsValid = false;
          errors["address"] = "address cannot be empty";
       }  

        //password
        if(!fields["password"]){
          formIsValid = false;
          errors["password"] = "pwd cannot be empty";
       }  

        //description
        if(!fields["description"]){
          formIsValid = false;
          errors["description"] = " description cannot be empty";
       }  
        //site
        if(!fields["site"]){
          formIsValid = false;
          errors["site"] = " site cannot be empty";
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

      global();
      
  
          alert("Form submitted  and partner was added, click ok ");
       }
       else{

        setOpen4(true);      
         
        
       }

}



const handleChangee =(field, e) =>{
    let fields = data.fields;
    fields[e]=field;
      setData({
     ...data,
     fields: fields,
   });
    console.log(fields)
}



  const handleChange = (event) => {
    const name = event.target.name;

    setData({
      ...data,
      [name]: event.target.value,
    });
  };
  const [partnerdata, setPartnerdata] = React.useState({
    partnerName: "",
    partnerMail: "",
    partnerPassword: "",
    description: "",
    address: "",
    url: "",
    phone: "",
    latitude: "",
    longitude: "",
    logourl: "",




  });
  console.log("url est :", urlphoto);



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

  const addPartner = () => {
    axios.post(`${global.url}/restaurants/register`, {
      name: data.fields["name"],
      mail: data.fields["mail"],
      password: data.fields["password"],
      description: data.fields["description"],
      address: data.fields["address"],
      url: data.fields["site"],
      phone: parseInt(data.fields["phone"]),
      latitude: parseFloat(data.fields["latitude"]),
      longitude: parseFloat(data.fields["longitude"]),
      type: data.typePar,
      commission_rate: parseFloat(data.commission_ratePar),
      logourl: urllogo,
      image: urlphoto,
      startinghours: data.startinghour,
      expiryhours: data.expiredhour,
      discount: data.discountPar
    })
      .then((res) => {
        console.log("successfully done")
      })
      .catch(error => {
        console.log(" problem in posting " + error)

      });

  }





  const handleClose1 = () => {
    setOpen(false);

  };

  const handleClose2 = () => {
    setOpen2(false);

  };
  const global = () => {
    addPartner();
    handleClose2();
    handleClose1();

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
    // uploadedimage.push(file);
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




  

  const handleClose4 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen4(false);
  };

  const classes = useStyles();

  return (
    <div >
      <Button style={{ backgroundColor: '#008037', borderRadius: '5px', marginLeft: '20px' }} variant="outline-success" onClick={() => setOpen(true)} >add Partner </Button>
      <Dialog
        open={open}
        onClose={handleClose1}

      >
        <DialogTitle >Enter new partner</DialogTitle>
        <DialogContent>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>name :</p>
            <TextField style={{ marginLeft: '30px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="name" name="name" onChange={(e)=> handleChangee(e.target.value,"name")} value={data.fields["name"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["name"]}</span>
              
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>mail :</p>
            <TextField style={{ marginLeft: '40px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="mail"  name="mail" onChange={(e)=> handleChangee(e.target.value,"mail")} value={data.fields["mail"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["mail"]}</span>
            
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>password :</p>
            <TextField style={{ marginLeft: '10px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="password"  name="password" onChange={(e)=> handleChangee(e.target.value,"password")} value={data.fields["password"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["password"]}</span>
          </div>

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>description :</p>
            <TextField style={{ width: '300px', marginTop: '25px', padding: '15px' }}
              label="description"  name="description" onChange={(e)=> handleChangee(e.target.value,"description")} value={data.fields["description"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["description"]}</span>
              
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>address :</p>
            <TextField style={{ marginLeft: '20px',width: '300px',marginTop: '25px',padding: '15px' }}
              label="address"  name="address" onChange={(e)=> handleChangee(e.target.value,"address")} value={data.fields["address"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["address"]}</span>
           
          </div>
          <div className={classes.ligne} >
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>site web :</p>
            <TextField style={{ marginLeft: '20px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="url de site web" name="site" onChange={(e)=> handleChangee(e.target.value,"site")} value={data.fields["site"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["site"]}</span>
            
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>phone :</p>
            <TextField style={{ marginLeft: '30px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="phone" name="phone" onChange={(e)=> handleChangee(e.target.value,"phone")} value={data.fields["phone"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["phone"]}</span>
              
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>latitude :</p>
            <TextField style={{ marginLeft: '20px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="latitude" name="latitude" onChange={(e)=> handleChangee(e.target.value,"latitude")} value={data.fields["latitude"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["latitude"]}</span>
              
          </div>

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>longitude :</p>
            <TextField style={{ marginLeft: '10px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="longitude" name="longitude" onChange={(e)=> handleChangee(e.target.value,"longitude")} value={data.fields["longitude"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["longitude"]}</span>
              
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}>type :</p>
            <FormControl style={{marginLeft:'50px'}} variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">type</InputLabel>
              <Select
                native
                value={data.typePar}
                onChange={handleChange}
                inputProps={{
                  name: 'typePar',
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
                value={data.commission_ratePar}
                onChange={handleChange}
                inputProps={{
                  name: 'commission_ratePar',
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
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '15px', marginRight: '50px' }}>image :</p>
            <input 
            style={{marginLeft:"10px", marginTop:"20px"}}
            type="file"
              name="file"
              placeholder="Upload an image"
              onChange={(e) => { uploadImage(e) }}
            />
            {
              loading ? (
                <h3 style={{marginLeft:"20px" }}> Image....</h3>
              ) : (
                <img src={image} style={{ width: '100px' }} />
              )
            }
           
          </div>

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>starting hour :</p>
            <form className={classes.container} noValidate>
              <TextField
                style={{ marginTop: '40px', marginLeft: '40px' }}
                id="time1"
                name="starting_hour"
               
                type="time"
                defaultValue={data.startinghour}
                
                onChange={event => { console.log(event.target.value), setData({ ...data, startinghour: event.target.value }) }}
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
                name="expired_hour"
                type="time"
                defaultValue={data.expiredhour}
                
                onChange={event => { console.log(event.target.value), setData({ ...data, expiredhour: event.target.value }) }}
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
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}>discount :</p>
            <FormControl style={{marginLeft:'20px'}} variant="filled" className={classes.formControl}>
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
    
      <Snackbar open={open4} autoHideDuration={3000} onClose={handleClose4} message="There are invalid forms!" />
       

        </DialogActions>
      </Dialog>
     

    </div>

  )

};

export default Partnersadd;