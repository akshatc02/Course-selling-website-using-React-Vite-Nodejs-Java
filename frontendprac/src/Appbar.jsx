import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';


function Appbar() {
const[userEmail,setEmail]=useState("");

    

    useEffect(()=>{
        function callback2(data){
            if(data.username){
                setEmail(data.username);
            }
            }
            function callback1(res){
            return res.json().then(callback2)
            }

        fetch("http://localhost:3000/admin/me",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then(callback1)

    },[])

if(userEmail){
    return <div style={{
        display:"flex",
        justifyContent:'space-between',
        padding:4
    }}>
        <div>
            <Typography variant={"h5"}>Hi,{userEmail}</Typography>
        </div>

        <div>
            <Button onClick={()=>{
                localStorage.setItem("token",null);
                window.location='/';
            }}>Logout</Button>


            


        </div>

    </div>
}


    return <div style={{
        display:"flex",
        justifyContent:'space-between',
        padding:4
    }}>
        <div>
            <Typography variant={"h5"}>Coursera</Typography>
        </div>

        <div>
            <Button onClick={()=>{
                window.location="/Signup"
            }}>Signup</Button>


            <Button onClick={()=>{
                window.location="/Signin"
            }}>Login</Button>


        </div>

    </div>
}

export default Appbar;