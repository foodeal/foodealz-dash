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
    partnerItems: [],
    name: "",
    typePar: "",
    commission_ratePar: "",
    discountPar: ""
  });

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

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
  const passwordchange = (e) => {
    setPartnerdata({
      ...partnerdata,
      partnerPassword: e
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

  const logourlchange = (e) => {
    setPartnerdata({
      ...partnerdata,
      logourl: e
    })
  }


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

  const addPartner = () => {
    axios.post(`https://api.foodealzapi.com/restaurants/register`, {
      name: partnerdata.partnerName,
      mail: partnerdata.partnerMail,
      password: partnerdata.partnerPassword,
      description: partnerdata.description,
      address: partnerdata.address,
      url: partnerdata.url,
      phone: parseInt(partnerdata.phone),
      latitude: parseFloat(partnerdata.latitude),
      longitude: parseFloat(partnerdata.longitude),
      type: data.typePar,
      commission_rate: parseFloat(data.commission_ratePar),
      logourl: partnerdata.logourl,
      image: urlphoto,
      discount: data.discountPar
    })
      .then((res) => {
        console.log("successfully done")
      })
      .catch(error => {
        console.log(" problem in posting " + error)

      });

  }

  const handleClick = () => {
    setOpen1(true);
  };



  const handleClose1 = () => {
    setOpen(false);

  };

  const handleClose2 = () => {
    setOpen2(false);

  };
  const global = () => {
    addPartner();
    handleClose2()
    handleClick();
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





  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
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
              label="name" onChange={e => namechange(e.target.value)} variant="filled" />
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>mail :</p>
            <TextField style={{ marginLeft: '40px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="mail" onChange={e => mailchange(e.target.value)} variant="filled" />
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>password :</p>
            <TextField style={{ marginLeft: '10px', width: '300px', marginTop: '25px', padding: '15px' }}
              label="password" onChange={e => passwordchange(e.target.value)} variant="filled" />
          </div>

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>description :</p>
            <TextField style={{ width: '300px', marginTop: '25px', padding: '15px' }}
              label="description" onChange={e => descriptionchange(e.target.value)} variant="filled" />
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '20px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>address :</p>
            <TextField style={{ marginLeft: '10px',width: '300px',marginTop: '25px',padding: '15px' }}
              label="address" onChange={e => addresschange(e.target.value)} variant="filled" />
          </div>
          <div className={classes.ligne} >
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>site web :</p>
            <TextField style={{ marginLeft: '20px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="url de site web" onChange={e => urlchange(e.target.value)} variant="filled" />
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>phone :</p>
            <TextField style={{ marginLeft: '30px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="phone" onChange={e => phonechange(e.target.value)} variant="filled" />
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>latitude :</p>
            <TextField style={{ marginLeft: '20px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="latitude" onChange={e => latitudechange(e.target.value)} variant="filled" />
          </div>

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>longitude :</p>
            <TextField style={{ marginLeft: '10px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="longitude" onChange={e => longitudechange(e.target.value)} variant="filled" />
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
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>logo :</p>
            <TextField style={{ marginLeft: '30px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="logo url" onChange={e => logourlchange(e.target.value)} variant="filled" />
          </div>

          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '15px', marginRight: '50px' }}>image :</p>
            <input type="file"
              name="file"
              placeholder="Upload an image"
              onChange={(e) => { uploadImage(e) }}
            />
            {
              loading ? (
                <h3>Loading....</h3>
              ) : (
                <img src={image} style={{ width: '100px' }} />
              )
            }
            {/* <TextField style={Field}
              label="image" onChange={e => imagechange(e.target.value)} variant="filled" /> */}
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
          <Button onClick={() => global()} color="primary" >
            Yes
</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          partner is successfully added!
</Alert>
      </Snackbar>

        </DialogActions>
      </Dialog>
     














    </div>

  )

};

export default Partnersadd;