import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { Dialog } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import DialogActions from '@material-ui/core/DialogActions';
import MuiAlert from '@material-ui/lab/Alert';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {  FormatColorReset } from '@material-ui/icons';
import {  makeStyles } from '@material-ui/core/styles';
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

const Dealadd = (item) => {
  const [data, setData] = React.useState({
    error: '',
    data: [],
    temp: [],
    fields: [],
    errors: [],
    invenduselected: '',
    partnerselected:'',
    Invendulist:[],
    partnerlist:[],
    InvenduChoisie:[],
    partnerChoisie:[],
    error: null,
    partnerId: "",
    restaurant:null,
    name: "",
    typePar: "",
    commission_ratePar: "",
    discountPar: "",
    startingdate:"",
    expireddate:""
  });

  

  const [partneridselected, setPartneridselected] = useState('')
  const [partenaireId, setPartenaireId] = useState(0)
  const [partnerstarting, setPartnerstarting] = useState('')
  const [partnerexpired, setPartnerexpired] = useState('')

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  const [image, setImage] = useState('')
  const [urlphoto, setUrlphoto] = useState('')
  const [loading, setLoading] = useState(FormatColorReset)



  const handleChange = (event) => {
    const name = event.target.name;
    setData({
      ...data,
      [name]: event.target.value,
    });
  };
  const [dealdata, setDealdata] = React.useState({
    imageurl: "",
    discount: "",
    PriceAfterDiscount: null,
    PriceBeforeDiscount: null,
    description: "",
    deal_description: "",
    restaurant_id: "",

  });


  const handleValidation =() =>{
    const fields= data.fields;
    const errors={};
    let formIsValid = true;

    

        //priceBefore
        if(!fields["priceBefore"]){
          formIsValid = false;
          errors["priceBefore"] = "lat cannot be empty";
       }     
       if(typeof fields["priceBefore"] !== "undefined"){
          if(!fields["priceBefore"].match(/^[0-9]+$/) && fields["priceBefore"].indexOf('.') == -1 ){
          formIsValid = false;
             errors["priceBefore"] = "price must be float";
          }        
       }

        //priceAfter
        if(!fields["priceAfter"]){
          formIsValid = false;
          errors["priceAfter"] = "lng cannot be empty";
       }     
       if(typeof fields["priceAfter"] !== "undefined"){
          if(!fields["priceAfter"].match(/^[0-9]+$/) && fields["priceAfter"].indexOf('.') == -1){
          formIsValid = false;
             errors["priceAfter"] = "price must be float";
          }        
       }

        //description
        if(!fields["description"]){
          formIsValid = false;
          errors["description"] = "description cannot be empty";
       }  

        //dealDescription
        if(!fields["dealDescription"]){
          formIsValid = false;
          errors["dealDescription"] = "description cannot be empty";
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
      
  
          alert("Form submitted and deal was added , click ok ");
       }
       else{

        setOpen4(true);      
          // alert("Form has errors. click ok and correct items")
        
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
    // uploadedimage.push(file);
    setImage(file.secure_url)
    setLoading(false)
    setUrlphoto(uploadedimage)

  }
  const ChangePartner = (e) => {
    let newdataa = data.partnerlist.filter(item => { return item.name == e })
    console.log("le nom est :",e);
    setPartneridselected(e)
    setPartenaireId(parseInt(newdataa[0].restaurant_id))
    console.log(parseInt(newdataa[0].restaurant_id))
    setPartnerstarting(newdataa[0].startinghours)
    setPartnerexpired(newdataa[0].expiryhours)
    setData({
      ...data,
      partnerChoisie: newdataa
    })

    getInvendu(parseInt( newdataa[0].restaurant_id));
    console.log("item is :", newdataa[0].restaurant_id);

  }
  console.log('le nom de partner est :',partneridselected);
 
  const ChangeInvendu = (e) => {
    let newdata = data.Invendulist.filter(item =>{return item.nom  == e})
    setData({
      ...data,
      invenduselected: e,
      InvenduChoisie: newdata,
      discountPar: newdata[0].discount
    })
    setDealdata({
      ...dealdata,
      imageurl: newdata[0].image,
      discount:newdata[0].discount,
      PriceAfterDiscount: newdata[0].PriceAfterDiscoun,
      PriceBeforeDiscount: newdata[0].PriceBeforeDiscount,
      deal_description: newdata[0].description,
      description: e
    })
    
  }

  const getData = async () => {
    const url = `${config.URL}/activedeals` ;
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
  const getInvendu = async (id) => {
    const url = `${config.URL}/Invendus/${id}`;
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        setData({
          ...data,
          Invendulist: res,
        });
      })
      .catch(error => {
        setData({
          ...data,
          error: 'Error Loading content',
        })
      })
  };
  const getPartner = async () => {
    const url = `${config.URL}/restaurants`;
    await fetch(url)
      .then(res => res.json())

      .then(res => {
        console.log("resultat est :", res)
        setData({
          ...data,
          partnerlist: res,
        });
      })


      .catch(error => {
        setData({
          ...data,
          error: 'Error Loading content',
        })
      })

  };

  const addDeal = () => {
    axios.post(`${config.URL}/deals/dealcreate`, {
      restaurant_id: partenaireId,
      imageurl: urlphoto,
      discount:dealdata.discount,
      PriceAfterDiscount: data.fields["priceBefore"],
      PriceBeforeDiscount: data.fields["priceAfter"],
      description: data.fields["description"],
      deal_description: data.fields["dealDescription"],
      startingdate: data.startingdate,
      expirydate: data.expireddate, 
      startinghours: partnerstarting,
      expiryhours: partnerexpired,
    })
      .then(() => {
        console.log("added successfully");
      })
      .catch(error => {
        console.log(" problem in posting " + error)

      });

  }
  
    
    
    const bouttonadddeal = () => {
      getPartner();
      setOpen(true);
    }

  const handleClose1 = () => {
    setOpen(false);

  };
  const handleClose2 = () => {
    setOpen2(false);

  };


  const global = () => {
    addDeal();
   handleClose2();
   handleClose1();
   

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
      <Button style={{ backgroundColor: '#008037', borderRadius: '5px', marginLeft: '20px' }} variant="outline-success" onClick={() => bouttonadddeal()} >add offre </Button>
      <Dialog
        open={open}
        onClose={handleClose1}

      >
        <DialogTitle >Enter new offre</DialogTitle>
        <DialogContent>
        <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}>partner_id :</p>
            <FormControl  style={{marginLeft:'70px'}} variant="filled" className={classes.formControl}>
            <Select
                native
                value={partneridselected}
                onChange ={val => ChangePartner(val.target.value)}
                inputProps={{
                  name: 'partnerId',
                  id: 'filled-age-native-simple3',
                }}
              >
                 <option aria-label="None" value="" />
                {
                  data.partnerlist.map(item => {
                    return <option value={item.name}>{item.name}</option>
                  })
                }
                
              </Select>
            </FormControl>
            
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}>offres list :</p>
            <FormControl style={{marginLeft:'80px'}} variant="filled" className={classes.formControl}>
              <Select
                native
                value={data.invenduselected}
                onChange={val => {ChangeInvendu(val.target.value)}}
                inputProps={{
                  name: 'partnerId',
                  id: 'filled-age-native-simple3',
                }}
              >
                 <option aria-label="None" value="" />
                {
                  data.Invendulist.map(item => {
                    return <option value={item.nom}>{item.nom}</option>
                  })
                }
                
              </Select>
            </FormControl>
          </div>
           <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>image url :</p>
            <input
            style={{marginLeft:"70px", marginTop:"50px"}}
             type="file"
              name="file"
              placeholder="Upload an image"
              onChange={(e) => { uploadImage(e) }}
            />
            {
              loading ? (
                <h3  style={{marginLeft:"20px", marginTop:"40px"}}>Image....</h3>
              ) : (
                <img src={image} style={{ width: '100px' }} />
              )
            }
          </div>

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>discount:</p>
            <TextField  style={{ marginLeft: '60px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="discount"  value={dealdata.discount} variant="filled" />
              {/* <span style={{color: "red"}}>{data.errors["priceAfter"]}</span> */}
          </div>
         
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>price after:</p>
            <TextField  style={{ marginLeft: '40px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="price after" name="priceAfter" onChange={(e)=> handleChangee(e.target.value,"priceAfter")} value={data.fields["priceAfter"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["priceAfter"]}</span>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>price before :</p>
            <TextField  style={{ marginLeft: '25px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="price before" name="priceBefore" onChange={(e)=> handleChangee(e.target.value,"priceBefore")} value={data.fields["priceBefore"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["priceBefore"]}</span>
          </div>

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>description :</p>
            <TextField  style={{ marginLeft: '30px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="description" name="description" onChange={(e)=> handleChangee(e.target.value,"description")} value={data.fields["description"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["description"]}</span>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>deal description :</p>
            <TextField  style={{ width: '300px',marginTop: '25px',padding: '15px'}}
              label="deal description" name="dealDescription" onChange={(e)=> handleChangee(e.target.value,"dealDescription")} value={data.fields["dealDescription"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["dealDescription"]}</span>
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

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }} >starting hour :</p>
            <TextField style={{ marginLeft: '20px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="starting hour" disabled variant="filled" value={partnerstarting} />
          </div >

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }} >expired hour :</p>
            <TextField style={{ marginLeft: '20px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="expired hour" disabled variant="filled" value={partnerexpired} />
          </div >

          
          

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

export default Dealadd;