import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Link } from "react-router-dom";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { AuthContext } from '../../context';
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';

import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card: {
    overflow: "visible"
  },
  session: {
    position: "relative",
    zIndex: 4000,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  background: {
    backgroundColor: theme.palette.primary.main
  },
  content: {
    padding: `40px ${theme.spacing(1)}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "1 0 auto",
    flexDirection: "column",
    minHeight: "100%",
    textAlign: "center"
  },
  wrapper: {
    flex: "none",
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto"
  },
  fullWidth: {
    width: "100%"
  },
  logo: {
    display: "flex",
    flexDirection: "column"
  },
  root: {
    width: '100%',
  },
}));


const Signin = () => {
  const classes = useStyles();
  const history = useHistory();
  const { signIn } = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    error: '',
    error: null,
    search: null,
    firstname:"",
    lastname:"",
    username: "",
    password: "",
    mail: ""
  });
  
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const controle = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (data.username == "" || data.password == "" ) {
      setOpen1(true)
    }
    else if (reg.test(data.username) === false) {
      setOpen2(true)

    }
    // else if (reg.test(data.firstname) === false) {
    //   setOpen2(true)

    // }
    // else if (reg.test(data.lastname) === false) {
    //   setOpen2(true)

    // }
    else {
      axios
        .post(`https://api.foodealzapi.com/Admin/login`, {
          mail: data.username,
          password: data.password,
        })
        .then(res => {
          if(res.data == "Invalid Password!"){
            setOpen4(true)
          }else{
            // history.push("/Dashbord");
            const foundUser = {
              username: res.data.id,
              userToken: res.data.xsrfToken,
            };
            signIn(foundUser)
          }

        })
        .catch(err => setOpen3(true));
    }

  }
  
 
 
  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen1(false);
  };
  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
  };
  const handleClose3 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen3(false);
  };
  const handleClose4 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen4(false);
  };
 

  return (
    <div className={classNames(classes.session, classes.background)}>
      <div className={classes.content}>
        <div className={classes.wrapper}>
          <Card>
            <CardContent>
              <form>
                <div
                  className={classNames(classes.logo, `text-xs-center pb-xs`)}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/static/images/Logo.png`}
                    alt=""
                    className="block"
                  />

                </div>
                <TextField
                  id="username"
                  label="Username"
                  className={classes.textField}
                  value={data.username}
                  onChange={event => { setData({ ...data, username: event.target.value }) }}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="Password"
                  className={classes.textField}
                  value={data.password}
                  onChange={event => { setData({ ...data, password: event.target.value }) }}
                  type="password"
                  fullWidth
                  margin="normal"
                />

                {/* <Link to="/Dashbord"> */}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => { controle() }}

                >
                  Login
                </Button>
                {/* </Link> */}

              </form>
            </CardContent>
          </Card>

        </div>
       
      </div>
      <Snackbar open={open1} autoHideDuration={1000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="error">
          Il faut remplir tous les champs
        </Alert>
      </Snackbar>
      <Snackbar open={open2} autoHideDuration={1000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error">
          Le format de mail est invalide
        </Alert>
      </Snackbar>
      <Snackbar open={open3} autoHideDuration={1000} onClose={handleClose3}>
        <Alert onClose={handleClose3} severity="error">
           Veuillez vérifier votre connexion!
        </Alert>
      </Snackbar>
      <Snackbar open={open4} autoHideDuration={1000} onClose={handleClose4}>
        <Alert onClose={handleClose4} severity="error">
           Mot de passe incorrecte!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Signin;
