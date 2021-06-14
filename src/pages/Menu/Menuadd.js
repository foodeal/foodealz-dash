import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { ContactSupportOutlined, FormatColorReset } from '@material-ui/icons';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dialog } from '@material-ui/core';
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
const Menuadd = (item) => {



  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [data, setData] = React.useState({
    error: '',
    data: [],
    temp: [],
    error: null,
    fields: [],
    errors: [],
    partnerselected: '',
    partnerlist: [],
    partnerChoisie: [],
    partnerId: "",
    items: [],
    discountPer:''

  });

  const [partneridselected, setPartneridselected] = useState('')
  const [partenaireId, setPartenaireId] = useState(0)
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
  const [basketdata, setBasketdata] = React.useState({

    nom: "",
    image: "",
    PriceBeforeDiscount: "",
    PriceAfterDiscoun: "",
  
    description: "",
    deal_description: "",
    restaurant_id: ""

  });

 



  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [open4, setOpen4] = React.useState(false);

 

  const handleClose2 = () => {
    setOpen2(false);

  };

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

        //nom
        if(!fields["nom"]){
          formIsValid = false;
          errors["nom"] = "nom cannot be empty";
       }  

        //description
        if(!fields["description"]){
          formIsValid = false;
          errors["description"] = "description cannot be empty";
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

      // setOpen3(true);
      global();
  
          alert("Form submitted and menu was added , click ok ");
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

const ChangePartner = (e) => {
  let newdataa = data.partnerlist.filter(item => { return item.name == e })
  setPartneridselected(e)
  setPartenaireId(parseInt(newdataa[0].restaurant_id))
  
  setData({
    ...data,
    partnerselected:e ,
    partnerChoisie: newdataa,

  })

}

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
  const global = () => {
    addBasket();
    handleClose2();
    handleClose1 ();
  };
  const handleClose1 = () => {
    setOpen(false);

  };
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };
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


  const addBasket = () => {
    
    axios.post(`${config.URL}/Invendu/register`, {

      nom: data.fields["nom"],
      image: urlphoto,
      PriceBeforeDiscount: data.fields["priceBefore"],
      PriceAfterDiscoun: data.fields["priceAfter"],
      discount: data.discountPer,
      description: data.fields["description"],
      restaurant_id: parseInt(partenaireId),


    }

    ).then((res) => {
      getData();


    })
      .catch(error => {
        console.log("l'erreur de l'ajout est :",error)
      });
  }

  const classes = useStyles();
  const bouttonaddoffre = () => {
    getPartner();
    setOpen(true);
  }



  return (
    <div >
      <Button style={{backgroundColor: '#008037', borderRadius: '5px', marginLeft:'20px'}} variant="outline-success" onClick={() => bouttonaddoffre()} >add Menu </Button>
      <Dialog
        open={open}
        onClose={handleClose1}

      >
        <DialogTitle >Enter new Menu</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            hello world
          </DialogContentText> */}

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}>  nom:</p>

            <TextField  style={{ marginLeft: '50px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="nom" defaultValue={data.resto} name="nom" onChange={(e)=> handleChangee(e.target.value,"nom")} value={data.fields["nom"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["nom"]}</span>

          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}> image :</p>

            <input
            style={{marginLeft:"50px", marginTop:"50px"}}
             type="file"
              name="file"
              placeholder="Upload an image"
              onChange={(e) => { uploadImage(e) }}
            />
            {
              loading ? (
                <h3  style={{marginLeft:"20px", marginTop:"40px"}}> Image....</h3>
              ) : (
                <img src={image} style={{ width: '100px' }} />
              )
            }

          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}> price before</p>

            <TextField  style={{ width: '300px',marginTop: '25px',padding: '15px'}}
              label="price before" defaultValue={data.item1} name="priceBefore" onChange={(e)=> handleChangee(e.target.value,"priceBefore")} value={data.fields["priceBefore"]} variant="filled" />
<span style={{color: "red"}}>{data.errors["priceBefore"]}</span>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}> price after :</p>
            <TextField  style={{ width: '300px',marginTop: '25px',padding: '15px'}}
              label="price after" defaultValue={data.item4} name="priceAfter" onChange={(e)=> handleChangee(e.target.value,"priceAfter")} value={data.fields["priceAfter"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["priceAfter"]}</span>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'30px' }}> discount :</p>
            <FormControl style={{marginLeft:'25px'}} variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">discount</InputLabel>
              <Select
                native
                value={data.discountPer}
                onChange={handleChange}
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

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}> description :</p>
            <TextField  style={{ width: '300px',marginTop: '25px',padding: '15px'}}
              label="description" defaultValue={data.item3} name="description" onChange={(e)=> handleChangee(e.target.value,"description")} value={data.fields["description"]} variant="filled" />
              <span style={{color: "red"}}>{data.errors["description"]}</span>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}>partner_id :</p>
            <FormControl style={{ marginLeft: '20px' }} variant="filled" className={classes.formControl}>

              <Select
                native
                value={partneridselected}      
                onChange={val => { ChangePartner(val.target.value) }}
             
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




        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}  style={{backgroundColor: '#008037', borderRadius: '5px'}}>
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

export default Menuadd;