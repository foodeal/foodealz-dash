import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Link } from "react-router-dom";
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import Baskets from "./Menu";
import { useLocation, BrowserRouter as Router, useHistory } from "react-router-dom";
import Moment from 'moment';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dialog } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
    items: [],
    discountPer:''

  });
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

  const nomchange = (e) => {
    setBasketdata({
      ...basketdata,
      nom: e
    })
  }
  //  }
  const imagechange = (e) => {
    setBasketdata({
      ...basketdata,
      image: e
    })
  }
  const pricebeforechange = (e) => {
    setBasketdata({
      ...basketdata,
      PriceBeforeDiscount: e
    })
  }
  const priceafterchange = (e) => {
    setBasketdata({
      ...basketdata,
      PriceAfterDiscoun: e
    })
  }
 
  const descriptionchange = (e) => {
    setBasketdata({
      ...basketdata,
      description: e
    })
  }
  const idrestaurantchange = (e) => {
    setBasketdata({
      ...basketdata,
      restaurant_id: e
    })
  }



  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClick = () => {
    setOpen1(true);
  };

  const handleClose2 = () => {
    setOpen2(false);

  };

  const global = () => {
    addBasket();
    handleClose2();
    handleClick();
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
    const url = `https://api.foodealzapi.com/AllInvendus`;
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
  const addBasket = () => {
    
    axios.post(`https://api.foodealzapi.com/Invendu/register`, {

      nom: basketdata.nom,
      image: basketdata.image,
      PriceBeforeDiscount: basketdata.PriceBeforeDiscount,
      PriceAfterDiscoun: basketdata.PriceAfterDiscoun,
      discount: data.discountPer,
      description: basketdata.description,
      restaurant_id: basketdata.restaurant_id,


    }

    ).then((res) => {
      getData();


    })
      .catch(error => {
        console.log("l'erreur de l'ajout est :",error)
      });
  }

  const classes = useStyles();



  return (
    <div >
      <Button style={{backgroundColor: '#008037', borderRadius: '5px', marginLeft:'20px'}} variant="outline-success" onClick={() => setOpen(true)} >add Menu </Button>
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
              label="nom" defaultValue={data.resto} onChange={e => nomchange(e.target.value)} variant="filled" />

          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}> image :</p>

            <TextField  style={{ marginLeft: '30px',width: '300px',marginTop: '25px',padding: '15px'}}
              label="url de l'image" defaultValue={data.donner} onChange={e => imagechange(e.target.value)} variant="filled" />

          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}> price before</p>

            <TextField  style={{ width: '300px',marginTop: '25px',padding: '15px'}}
              label="price before" defaultValue={data.item1} onChange={e => pricebeforechange(e.target.value)} variant="filled" />

          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}> price after :</p>
            <TextField  style={{ width: '300px',marginTop: '25px',padding: '15px'}}
              label="price after" defaultValue={data.item4} onChange={e => priceafterchange(e.target.value)} variant="filled" />
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'30px' }}> discount :</p>
            <FormControl style={{marginLeft:'30px'}} variant="filled" className={classes.formControl}>
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
              label="description" defaultValue={data.item3} onChange={e => descriptionchange(e.target.value)} variant="filled" />
          </div>
          <div className={classes.ligne}>
            <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop:'50px' }}> id partner :</p>
            <TextField  style={{width: '300px',marginTop: '25px',padding: '15px'}}
              label="id partner" defaultValue={data.item5} onChange={e => idrestaurantchange(e.target.value)} variant="filled" />
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
          <Button onClick={() => global()} color="primary" >
            Yes
</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Menu is successfully added!
</Alert>
      </Snackbar>


        </DialogActions>
      </Dialog>

      <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        basket is successfully added!
</Alert>
    </Snackbar>





    </div>

  )

};

export default Menuadd;