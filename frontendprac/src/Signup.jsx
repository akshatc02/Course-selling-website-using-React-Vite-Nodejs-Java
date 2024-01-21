import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useState } from 'react';
function Signup(){
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    
return <div >
    
    <center>
    <center style={{
        paddingTop:"100px",
        marginBottom:"20px"
    }}>
        <Typography variant={"h6"}>
        Welcome to Coursera
        </Typography>
        
    </center>

    <Card variant="outlined" style={{width: 400 ,
    padding : 10 }}>

 
    <TextField 
    onChange={(e)=>(setEmail(e.target.value))}
id="username" 
label="username" 
variant="outlined" />
    <br />
   <TextField 
   onChange={(e)=>(setPassword(e.target.value))}
id="password" 
label="password" 
variant="outlined" type='password' />
   <br /> 
   
   <Button variant="contained" 
   onClick={()=>{
    
    function callback2(data){
        localStorage.setItem("token",data.token);
    console.log(data);
    window.location='/';
    }
    function callback1(res){
        res.json().then(callback2);
        }
    
    fetch("http://localhost:3000/admin/signup",{
        method:"POST",
        body: JSON.stringify({
            username:email,
            password:password
        }),
        headers:{
            "Content-type":"application/json"
        }
    }).then(callback1)
    
   }}
   >Signup</Button>
   </Card>

    </center>
   
</div>
}

export default Signup;