import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import {useForm} from 'react-hook-form';
import {yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup' ;
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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import moment from 'moment';
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



const Offresadd = (item) => {

  const [data, setData] = React.useState({
    
    error: '',
    data: [],
    temp: [],
    error: null,
    activity: '',
    dealselected: '',
    partnerselected: '',
    deallist: [],
    partnerlist: [],
    dealChoisie: [],
    partnerChoisie: [],
    partnerId: "",
    discountPar: "",
    startingdate: '',
    expireddate: '',
    startinghour: '',
    expiredhour: ''
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
    PartnerId: null

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
  const dealidchange = (e) => {
    setOffredata({
      ...offredata,
      dealid: e
    })
  }
  // const changeidpartner = (e) => {
  //   setOffredata({
  //     ...offredata,
  //     PartnerId: e
  //   })
  //   getDeal(parseInt(e))
  // }

  const ChangeDeal = (e) => {
    let newdata = data.deallist.filter(item => { return item.description == e })
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
    const url = `https://api.foodealzapi.com/deals`;
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
    const url = `https://api.foodealzapi.com/activedeals`;
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
    const url = `https://api.foodealzapi.com/restaurants`;
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
    console.log(offredata.PartnerId);

    axios.post(`https://api.foodealzapi.com/deals/dealscheduled`, {
      restaurant_id: parseInt(offredata.PartnerId),
      quantity: parseInt(offredata.quantity),
      nbre_redeemed_deal: parseInt(offredata.nbre_redeemed_deal),
      startingdate: data.startingdate,
      expirydate: data.expireddate,
      startingdate_hours: data.startinghour,
      expirydate_hours: data.expiredhour,
      active: data.activity,
      deal_id: parseInt(offredata.dealid),

    })
      .then((res) => {

        getData();
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
    handleClick();
    handleClose1();

  };

  const bouttonaddoffre = () => {
    getPartner();
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };
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
            <FormControl style={{ marginLeft: '30px' }} variant="filled" className={classes.formControl}>

              <Select
                native
                value={data.partnerselected}      
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
            <FormControl style={{ marginLeft: '40px' }} variant="filled" className={classes.formControl}>
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
            <input type="text" label="quantity" placeholder="enter total quantity"  ref={register}/>
            {/* <TextField style={{ marginLeft: '20px', width: '300px', marginTop: '25px', padding: '15px' }}
              name="quantityy"  onChange={e => qtchange(e.target.value)} variant="filled"  ref={register} /> */}
            {/* <p>{error.quantityy?.message}</p> */}
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>quantity sold :</p>
            <input type="text" label="quantity Sold" placeholder="enter quantity sold"  ref={register}/>
            {/* <TextField style={{ width: '300px', marginTop: '25px', padding: '15px' }}
              name="quantity_Sold"  onChange={e => offresoldchange(e.target.value)} variant="filled"  ref={register} /> */}
              {/* <p>{error.quantity_Sold.message}</p> */}
          </div>
         
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>starting date :</p>
            <form className={classes.container} noValidate>
              <TextField
                style={{ marginTop: '40px', marginLeft: '40px' }}
                id="date1"

                label="starting date"
                type="datetime-local"
                name="starting_date"
                
                value={data.startingdate}
              
                onChange={event => { console.log(event.target.value), setData({ ...data, startingdate: event.target.value }) }}

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
                name="expired_date"
               
                defaultValue={data.expireddate}
                
                onChange={event => { console.log(event.target.value), setData({ ...data, expireddate: event.target.value }) }}
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
              <Button onClick={() => global()} color="primary" >
                Yes
</Button>
            </DialogActions>
          </Dialog>
          <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              offre is successfully added!
</Alert>
          </Snackbar>
        </DialogActions>
      </Dialog>





    </div>

  )

};

export default Offresadd;