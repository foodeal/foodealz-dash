import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import TableCell from '@material-ui/core/TableCell';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useLocation, BrowserRouter as Router, useHistory } from "react-router-dom";
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
    typeres:'',
    discountPer:'',
    commission:'',

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
    item15: item.item.discount
  });
  console.log("le id des partenaires sont :",data.donner);
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
  const handleClose1 = () => {
    setOpen(false);

  };
  
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClick = () => {
    setOpen1(true);
  };
  
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

  const namechange = (e) => {
    setPartnerdata({
      ...partnerdata,
      partnerName: e
    })
  }

  const mailchange = (e) => {
    setPartnerdata({
      ...partnerdata,
      partnerMail: e
    })
  }

  const descriptionchange = (e) => {
    setPartnerdata({
      ...partnerdata,
      description: e
    })
  }
  const addresschange = (e) => {
    setPartnerdata({
      ...partnerdata,
      address: e
    })
  }
  const urlchange = (e) => {
    setPartnerdata({
      ...partnerdata,
      url: e
    })
  }
  const phonechange = (e) => {
    setPartnerdata({
      ...partnerdata,
      phone: e
    })
  }
  const latitudechange = (e) => {
    setPartnerdata({
      ...partnerdata,
      latitude: e
    })
  }
  const longitudechange = (e) => {
    setPartnerdata({
      ...partnerdata,
      longitude: e
    })
  }
  // const typechange = (e) => {
  //   setPartnerdata({
  //     ...partnerdata,
  //     type: e
  //   })
  // }
  // const commission_ratechange = (e) => {
  //   setPartnerdata({
  //     ...partnerdata,
  //     commission_rate: e
  //   })
  // }
  const logourlchange = (e) => {
    setPartnerdata({
      ...partnerdata,
      logourl: e
    })
  }
  const imagechange = (e) => {
    setPartnerdata({
      ...partnerdata,
      image: e
    })
  }
  // const discountchange = (e) => {
  //   setPartnerdata({
  //     ...partnerdata,
  //     discount: e
  //   })
  // }
  const getData = async () => {
    const url = `https://api.foodealzapi.com/restaurants`;
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

    axios.put(`https://api.foodealzapi.com/restaurants/${id}`, {
      name: partnerdata.partnerName,
      mail: partnerdata.partnerMail,
      description: partnerdata.description,
      address: partnerdata.address,
      url: partnerdata.url,
      phone: parseInt(partnerdata.phone),
      latitude: parseFloat(partnerdata.latitude),
      longitude: parseFloat(partnerdata.longitude),
      type: data.typeres,
      commission_rate: parseFloat(data.commission),
      logourl: partnerdata.logourl,
      image: partnerdata.image,
      discount: data.discountPer
    })
      .then((res) => {
        getData();
      })
      .catch(error => {
        console.log(error);
      });
  }

 
  const handleClose2 = () => {
    setOpen2(false);

  };

  

  const global = (id) => {
    handleEdit(id);
    handleClose2();
    handleClick();
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
        <DialogTitle >update partner</DialogTitle>
        <DialogContent>
        <div className={classes.ligne}>
        <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}>name :</p>
        <TextField style={{ marginLeft: '40px', width: '300px', marginTop: '25px', padding: '15px' }}
          label="name" defaultValue={data.item1} onChange={e => namechange(e.target.value)} variant="filled" />
      </div>
      <div className={classes.ligne}>
        <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}>mail :</p>
        <TextField style={{ marginLeft: '40px', width: '300px', marginTop: '25px', padding: '15px' }}
          label="mail" defaultValue={data.item2} onChange={e => mailchange(e.target.value)} variant="filled" />
      </div>
     
      <div className={classes.ligne}>
        <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold" , marginTop:'50px'}}>description :</p>
        <TextField style={{  width: '300px', marginTop: '25px', padding: '15px' }}
          label="description" defaultValue={data.item5} onChange={e => descriptionchange(e.target.value)} variant="filled" />
      </div>
      <div className={classes.ligne}>
        <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}>address :</p>
        <TextField style={{ marginLeft: '30px', width: '300px', marginTop: '25px', padding: '15px' }}
          label="address" defaultValue={data.item6} onChange={e => addresschange(e.target.value)} variant="filled" />
      </div>
      <div className={classes.ligne} >
        <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}>site web :</p>
        <TextField style={{ marginLeft: '25px', width: '300px', marginTop: '25px', padding: '15px' }}
          label="url de site web" defaultValue={data.item7} onChange={e => urlchange(e.target.value)} variant="filled" />
      </div>
      <div className={classes.ligne}>
        <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}>phone :</p>
        <TextField style={{ marginLeft: '30px', width: '300px', marginTop: '25px', padding: '15px' }}
          label="phone" defaultValue={data.item8} onChange={e => phonechange(e.target.value)} variant="filled" />
      </div>
      <div className={classes.ligne}>
        <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}>latitude :</p>
        <TextField style={{ marginLeft: '20px', width: '300px', marginTop: '25px', padding: '15px' }}
          label="latitude" defaultValue={data.item9} onChange={e => latitudechange(e.target.value)} variant="filled" />
      </div>

      <div className={classes.ligne}>
        <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}>longitude :</p>
        <TextField style={{ marginLeft: '10px', width: '300px', marginTop: '25px', padding: '15px' }}
          label="longitude" defaultValue={data.item10} onChange={e => longitudechange(e.target.value)} variant="filled" />
      </div>
      <div className={classes.ligne}>
        <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold" , marginTop:'30px'}}>type :</p>
        <FormControl style={{marginLeft:'60px'}} variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">type</InputLabel>
              <Select
                native
                value={data.typeres}
                onChange={handleChange}
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
        <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'30px' }}>commission rate :</p>
        <FormControl variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">commission rate</InputLabel>
              <Select
                native
                value={data.commission}
                onChange={handleChange}
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
        <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}>logo :</p>
        <TextField style={{ marginLeft: '50px', width: '300px', marginTop: '25px', padding: '15px' }}
          label="logo url" defaultValue={data.item13}  onChange={e => logourlchange(e.target.value)} variant="filled" />
      </div>

      <div className={classes.ligne}>
        <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}>image :</p>
        <TextField style={{ marginLeft: '40px', width: '300px', marginTop: '25px', padding: '15px' }}
          label="image" defaultValue={data.item14} onChange={e => imagechange(e.target.value)} variant="filled" />
      </div>
      <div className={classes.ligne}>
        <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'30px' }}>discount :</p>
        <FormControl style={{marginLeft:'40px'}} variant="filled" className={classes.formControl}>
              <InputLabel htmlFor="filled-age-native-simple">discount</InputLabel>
              <Select
                native
                value={data.discountPer}
                onChange={handleChange}
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
          <Button onClick={() => global(data.donner)} color="primary" >
            Yes
</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          partner is successfully updated!
</Alert>
      </Snackbar>
        </DialogActions>
      </Dialog>
     

      


    </div>

  )

};

export default PartnersUpdate;