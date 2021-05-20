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
import { ContactSupportOutlined } from '@material-ui/icons';
import { useLocation, BrowserRouter as Router, useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import { getOverlappingDaysInIntervals } from 'date-fns';
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

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);



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

  const imagechange = (e) => {
    setDealdata({
      ...dealdata,
      imageurl: e
    })
  }
  const discountchange = (e) => {
    setDealdata({
      ...dealdata,
      discount: e
    })
  }

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

  const descriptionchange = (e) => {
    setDealdata({
      ...dealdata,
      description: e
    })
  }
  const dealdescrichange = (e) => {
    setDealdata({
      ...dealdata,
      deal_description: e
    })
  }
 
 
  // const changeidpartner = (e) => {
  //   setData({
  //     ...data,
  //     restaurant: e
  //   })
  //   getInvendu(parseInt(e))

  // }
  const ChangePartner = (e) => {
    let newdataa = data.partnerlist.filter(item => { return item.name == e })
    console.log("le nom est :",e);
    
    setData({
      ...data,
      partnerselected:e ,
      partnerChoisie: newdataa,

    })

    getInvendu(parseInt( newdataa[0].restaurant_id));
    console.log("item is :", newdataa[0].restaurant_id);

  }
  console.log('le nom de partner est :', data.partnerselected);
 
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
    const url = `https://api.foodealzapi.com/activedeals` ;
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
    const url = `https://api.foodealzapi.com/Invendus/${id}`;
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

  const addDeal = () => {
    axios.post(`https://api.foodealzapi.com/deals/dealcreate`, {
      restaurant_id: parseInt(data.restaurant),
      imageurl: dealdata.imageurl,
      discount:dealdata.discount,
      PriceAfterDiscount: dealdata.PriceAfterDiscount,
      PriceBeforeDiscount: dealdata.PriceBeforeDiscount,
      description: dealdata.description,
      deal_description: dealdata.deal_description,
      startingdate: data.startingdate,
      expireddate: data.expireddate,
     
      
    })
      .then(() => {
        console.log("added successfully");
      })
      .catch(error => {
        console.log(" problem in posting " + error)

      });

  }
  
    const handleClick = () => {
      setOpen1(true);
    };
    
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
   handleClick();
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
                value={data.partnerselected}
                onChange={val => {ChangePartner(val.target.value)}}
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
            </FormControl>-*+
            
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
            <TextField  style={{ marginLeft: '50px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="image url" onChange={e => imagechange(e.target.value)} variant="filled"  value={dealdata.imageurl}/>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>discount :</p>
            <TextField  style={{ marginLeft: '50px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="discount" onChange={e => discountchange(e.target.value)} variant="filled"  value={dealdata.discount}/>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>price after:</p>
            <TextField  style={{ marginLeft: '60px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="price after" onChange={e => afterchange(e.target.value)} variant="filled" value={dealdata.PriceAfterDiscount}/>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>price before :</p>
            <TextField  style={{ marginLeft: '50px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="price before" onChange={e => beforechange(e.target.value)} variant="filled" value={dealdata.PriceBeforeDiscount}/>
          </div>

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>description :</p>
            <TextField  style={{ marginLeft: '50px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="description" onChange={e => descriptionchange(e.target.value)} variant="filled" value={dealdata.description}/>
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>deal description :</p>
            <TextField  style={{ marginLeft: '20px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="deal description" onChange={e => dealdiscrichange(e.target.value)} variant="filled" value={dealdata.deal_description}/>
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
          <Button onClick={() => global()} color="primary" >
            Yes
</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          deal is successfully added!
</Alert>
      </Snackbar>

        </DialogActions>
      </Dialog>
     














    </div>

  )

};

export default Dealadd;