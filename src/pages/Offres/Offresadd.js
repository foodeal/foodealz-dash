import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { Dialog } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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



const Offresadd = (item) => {

  const [data, setData] = React.useState({
    
    error: '',
    data: [],
    temp: [],
    error: null,
    activity: '',
    fields: [],
    errors: [],
    dealselected: '',
    partnerselected: '',
    deallist: [],
    partnerlist: [],
    dealChoisie: [],
    partnerChoisie: [],
    partnerId: "",
    discountPar: ""
   
  });
  
  const [partneridselected, setPartneridselected] = useState('')
  const [partenaireId, setPartenaireId] = useState(0)
  const [partnerstarting, setPartnerstarting] = useState('')
  const [partnerexpired, setPartnerexpired] = useState('')
  const [dealstarting, setDealstarting] = useState('')
  const [dealexpired, setDealexpired] = useState('')

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
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  const handleValidation =() =>{
    const fields= data.fields;
    const errors={};
    let formIsValid = true;

          
       

      //quantity
       if(!fields["quantity"]){
          formIsValid = false;
          errors["quantity"] = "qt cannot be empty";
       }     
       if(typeof fields["quantity"] !== "undefined"){
          if(!fields["quantity"].match(/^[0-9]+$/)){
          formIsValid = false;
             errors["quantity"] = "qt must be only numbers";
          }        
       }

         //quantitySold
         if(!fields["quantitySold"]){
          formIsValid = false;
          errors["quantitySold"] = "qtSold cannot be empty";
       }     
       if(typeof fields["quantitySold"] !== "undefined"){
          if(!fields["quantitySold"].match(/^[0-9]+$/)){
          formIsValid = false;
             errors["quantitySold"] = "qtSold must be only numbers";
          }        
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
  
          alert("Form submitted and offer was added , click ok ");
       }
       else{

        setOpen4(true);      
          
        
       }

}
 


const handleClose4 = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen4(false);
};


const handleChangee =(field, e) =>{
  let fields = data.fields;
  fields[e]=field;
    setData({
   ...data,
   fields: fields,
 });
  console.log( "les champs sont:" ,fields)
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
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));


  const [offredata, setOffredata] = React.useState({

    quantity: "",
    nbre_redeemed_deal: "",
    dealid: null,
    PartnerId: null,
   
  });


  const dealidchange = (e) => {
    setOffredata({
      ...offredata,
      dealid: e
    })
  }
 

  const ChangeDeal = (e) => {
    let newdata = data.deallist.filter(item => { return item.description == e })
    setDealstarting(newdata[0].startingdate)
    setDealexpired(newdata[0].expirydate)
    setData({
      ...data,
      dealselected: e,
      dealChoisie: newdata,

    })
    console.log("deal is :", newdata[0]);
    setOffredata({
      ...offredata,
      dealid: JSON.stringify(newdata[0].deal_id),

    })



  }

  const ChangePartner = (e) => {
    let newdataa = data.partnerlist.filter(item => { return item.name == e })
    setPartneridselected(e)
    setPartenaireId(parseInt(newdataa[0].restaurant_id))
    setPartnerstarting(newdataa[0].startinghours)
    setPartnerexpired(newdataa[0].expiryhours)
    console.log(parseInt(newdataa[0].restaurant_id))
    
    setData({
      ...data,
      partnerselected:e ,
      partnerChoisie: newdataa,

    })

    getDeal(parseInt( newdataa[0].restaurant_id));
    console.log("item is :", newdataa[0].restaurant_id);

  }
  console.log("le nom est :",data.partnerselected);

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
  const getDeal = async (id) => {
    const url = `${config.URL}/activedeals`;
    await fetch(url)
      .then(res => res.json())
      .then(res => {
        const newdata = res.filter(item => { return item.restaurant_id == id })
        setData({
          ...data,
          deallist: newdata,
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

  console.log("les partenaires sont :", JSON.stringify(data.partnerlist));

  const addOffre = () => {
    console.log(partenaireId);

    axios.post(`${config.URL}/deals/dealscheduled`, {
      restaurant_id: parseInt(partenaireId),
      quantity: parseInt( data.fields["quantity"]),
      nbre_redeemed_deal: parseInt( data.fields["quantitySold"]),
      startingdate: dealstarting ,
      expirydate:  dealexpired ,
      startingdate_hours: partnerstarting,
      expirydate_hours: partnerexpired,
      active: data.activity,
      deal_id: parseInt(offredata.dealid)
    })
      .then((res) => {

        console.log(res)
      })
      .catch(error => {
        console.log("l'erreur d'ajout est :", error)

      });

  }
  const handleClose1 = () => {
    setOpen(false);

  };

  const handleClose2 = () => {
    setOpen2(false);

  };

  const global = () => {
    addOffre();
    handleClose2();
    handleClose1();

  };

  const bouttonaddoffre = () => {
    getPartner();
    setOpen(true);
  }
  
  const classes = useStyles();
 

  return (
    <div >

      <Button style={{ backgroundColor: '#008037', borderRadius: '5px', marginLeft: '20px' }} variant="outline-success" onClick={() => bouttonaddoffre()} >add Offer </Button>



      <Dialog
        open={open}
        onClose={handleClose1}

      >
        <DialogTitle >Enter new Offer</DialogTitle>
        <DialogContent >

          

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}>partner_id :</p>
            <FormControl style={{ marginLeft: '40px' }} variant="filled" className={classes.formControl}>

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
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}>deals list :</p>
            <FormControl style={{ marginLeft: '60px' }} variant="filled" className={classes.formControl}>
              <Select
                native
                value={data.dealselected}
                
                onChange={val => { ChangeDeal(val.target.value) }}
                inputProps={{
                  name: 'dealId',
                  id: 'filled-age-native-simple3',
                }}
              >
                <option aria-label="None" value="" />
                {
                  data.deallist.map(item => {
                    return <option value={item.description}>{item.description}</option>
                  })
                }

              </Select>
            </FormControl>
          </div>
         
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>quantity :</p>
            <TextField style={{ marginLeft: '45px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="quantity" name="quantity" onChange={(e)=> handleChangee(e.target.value,"quantity")} value={data.fields["quantity"]} variant="filled" />
               <span style={{color: "red"}}>{data.errors["quantity"]}</span>
           
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>quantity sold :</p>
            
               <TextField style={{ marginLeft: '15px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="quantity sold"  name="quantitySold" onChange={(e)=> handleChangee(e.target.value,"quantitySold")} value={data.fields["quantitySold"]} variant="filled" />
               <span style={{color: "red"}}>{data.errors["quantitySold"]}</span>
           
          </div>
         
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }} >starting date :</p>
            <TextField style={{ marginLeft: '20px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="starting date" disabled variant="filled" value={dealstarting} />
          </div >

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }} >expired date :</p>
            <TextField style={{ marginLeft: '20px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="expired date" disabled variant="filled" value={dealexpired} />
          </div >

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

          
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '30px' }}> active or not :</p>

            <FormControl style={{ marginLeft: '30px' }} variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">active or not</InputLabel>
              <Select
                native
                value={data.activity}
                name='acitivity'
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

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }} >deal id :</p>
            <TextField style={{ marginLeft: '50px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="deal id" onChange={e => dealidchange(e.target.value)} variant="filled" value={offredata.dealid} />
          </div >

          
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
          {/* <Snackbar open={open3} autoHideDuration={8000} onClose={handleClose3} message=" All Forms are Valid and offer is added " /> */}
      <Snackbar open={open4} autoHideDuration={3000} onClose={handleClose4} message="There are invalid forms!" />
        </DialogActions>
      </Dialog>





    </div>

  )

};

export default Offresadd;