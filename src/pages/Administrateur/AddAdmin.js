import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


const AddAdmin = () => {

    // const { register, handleSubmit, error } = useForm({
    //     resolver: yupResolver(schema),
    // });

    const [data, setData] = React.useState({
    
        error: '',
        data: [],
        temp: [],
        error: null,
        firstname:'',
        lastname:'',
        username:'',
        email:'',
        password:''
       
      });

      const addAdmin = () => {
        axios.post(`https://api.foodealzapi.com/Admin/register`, {

        firstname:data.firstname,
        lastname:data.lastname,
        username:data.username,
        mail:data.email,
        password:data.password,
        })
          .then((res) => {
            console.log("add done");
          })
          .catch(error => {
            console.log(" problem in posting " + error)
    
          });
    
      }

      const usernamechange = (e) => {
        setData({
          ...data,
          username: e
        })
      }

      const emailchange = (e) => {
        setData({
          ...data,
          email: e
        })
      }

      const passwordchange = (e) => {
        setData({
          ...data,
          password: e
        })
      }
      const firstnamechange = (e) => {
        setData({
          ...data,
          firstname: e
        })
      }

      const lastnamechange = (e) => {
        setData({
          ...data,
          lastname: e
        })
      }

    // const submitForm = () => {
      console.log(data.firstname);
      console.log(data.lastname);
        console.log(data.username);
        console.log(data.email);
        console.log(data.password);
    
    

    return (
        <div style={{marginLeft:"400px"}}>

            <h1>Add New Admin</h1>
            <form onSubmit={() =>{submitForm()}}>
            <div >
                    <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>First Name:</p>
                    <input style={{width:"250px", height:"30px"}} type="text" name="username" onChange={e => firstnamechange(e.target.value)} placeholder="enter username"  />
                 
                    
                </div>
                <div >
                    <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>Last Name:</p>
                    <input style={{width:"250px", height:"30px"}} type="text" name="username" onChange={e => lastnamechange(e.target.value)} placeholder="enter username"  />
                 
                    
                </div>
                <div >
                    <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>username:</p>
                    <input style={{width:"250px", height:"30px"}} type="text" name="username" onChange={e => usernamechange(e.target.value)} placeholder="enter username"  />
                 
                    
                </div>
                <div >
                    <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>email :</p>
                    <input style={{width:"250px", height:"30px"}} type="text" name="email" placeholder="enter email" onChange={e => emailchange(e.target.value)}   />
             
                    
                </div>
                <div >
                    <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>password :</p>
                    <input style={{width:"250px", height:"30px"}} type="text" name="password" placeholder="enter password" onChange={e => passwordchange(e.target.value)}  />
                   
                  
                </div>

              

            </form>
            <Button style={{marginTop:"40px", marginLeft:"50px", backgroundColor:"#008037", width:"100px"}} onClick={() => {addAdmin()}}> submit</Button>
        </div>

    );
}
export default AddAdmin;