import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { withStyles, makeStyles } from '@material-ui/core/styles';




// let schema = yup.object().shape({
//     username: yup.string().required('please enter username'),
//     email: yup.string().email().required('email invallid'),
//     password: yup.string().min(4).max(8).required('password nvalid'),

// });



const TestValide = () => {

    // const { register, handleSubmit, error } = useForm({
    //     resolver: yupResolver(schema),
    // });



    // const submitForm = (data) => {
    //     console.log('data input are :', data);
    // };

    return (
        <div>

            <h2>Sign In</h2>
            <form >
                <div >
                    <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>username:</p>
                    <input type="text" name="username" placeholder="enter username" />
                    {/* <TextField style={{ marginLeft: '20px', width: '300px', marginTop: '25px', padding: '15px' }}
                        name="username" variant="filled"  /> */}
                    
                </div>
                <div >
                    <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>email :</p>
                    <input type="text" name="email" placeholder="enter email"  />
                    {/* <TextField style={{ width: '300px', marginTop: '25px', padding: '15px' }}
                        name="email" variant="filled"  /> */}
                    
                </div>
                <div >
                    <p style={{ fontSize: '15px', color: "#008037", fontWeight: "bold", marginTop: '50px' }}>password :</p>
                    <input type="text" name="password" placeholder="enter password"  />
                    {/* <TextField style={{ width: '300px', marginTop: '25px', padding: '15px' }}
                        name="password" variant="filled"  /> */}
                  
                </div>
            </form>
            <Button> submit</Button>
        </div>

    );
}
export default TestValide;