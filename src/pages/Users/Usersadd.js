// import React, {useState, useEffect} from 'react';
// import { TextField } from '@material-ui/core';
// import { Button } from '@material-ui/core';
// import axios from 'axios';





// const Title1 = {
//   fontSize: '20px',
//   color: '#008037',
//   fontWeight: 'bold',
//   marginLeft: '20px',
//   justifyContent: 'center'
// }
// const Field = {
//   marginLeft: '20px',
//   width: '500px',
//   marginTop: '25px',
//   padding :'15px',
 

// }
// const buttonstyle = {
//   marginLeft: '150px',
//   marginTop: '50px',
//   backgroundColor: '#008037' ,
//   width: '80px',
//   borderRadius: '5px'
  
 
 
// }
// const Usersadd = () => {
// const [data, setData] = React.useState({
//   error: '',
//   data: [],
//   temp: [],
//   error: null,
//   userItems: []

// });

// const addUser = async () => {
//   let userItems = localStorage.getItem('useritem');

//   console.log(userItems)
//   axios.post('https://api.foodealzapi.com/users', userItems).then((res) => {
//     // res.header ('Access-Control-Allow-Origin','*'),
          
//     // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

//     console.log(res.data)
//   })
//     .catch(error => {
//       console.log(error)
//     });
//   //   userItems.map((item) => {

//   // })
//   // sessioncStorage.setItem('userItems', JSON.stringify([]));

//   setData({
//     ...data,

//   })
//   // navigation.jumpTo('Mes Couffins')
//   // navigation.goBack()
// }


//   return (
//     <div >
//       <div style={Title1}>
//         <h2> Enter new User</h2>
//       </div>
//       <div style={Field}>
//         <TextField 
//           label="Enter firstname" 

//           />
         
//         <TextField style={{marginLeft: '50px'}}
//           label="Enter lastname" 
        
//           />
        
//       </div >
     
//       <div style={Field}>
//         <TextField
//           label="Enter mail"
//          />
//       </div>
//       <div style={Field}>
//         <TextField
//           label="Enter phone"
          
          
//           />
      
//         <TextField style={{marginLeft: '50px'}}
//           label="Enter age"
          
//           />
           
//         <TextField style={{marginLeft: '50px'}}
//           label="Enter city" 
       
//           />
//       </div>
    
//       {/* <div >
//         <TextField style={{marginTop: '20px', marginLeft: '25px'}}
//           label="Enter password" />
//       </div> */}
     
//       <div style={buttonstyle}>
//         <Button variant="outline-success"  onClick={addUser}>Valider</Button>
//         </div>

//     </div>

//   )

// };

// export default Usersadd;