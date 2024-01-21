import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { useState } from 'react';


function Addcourse(){
    const [title,setTitle]= useState("")
    const [description,setDescription]= useState("")
    const [image,setImage]=useState("")
    
return <div >
    
    <center>
    <center style={{
        paddingTop:"100px",
        marginBottom:"20px"
    }}>
        <Typography variant={"h6"}>
        Add Course 
        </Typography>
        
    </center>

    <Card variant="outlined" style={{width: 400 ,
    padding : 10 }}>

 
    <TextField 
    onChange={(e)=>(setTitle(e.target.value))}

label="title" 
variant="outlined" />
    <br />
   <TextField 
   onChange={(e)=>(setDescription(e.target.value))}

label="description" 
variant="outlined"  />
   <br /> 
   <TextField 
   onChange={(e)=>(setImage(e.target.value))}

label="image" 
variant="outlined"  />
   <br /> 
   
   <Button variant="contained" 
   onClick={()=>{
    
    function callback2(data){
        if(data){
            alert("Course Addded Successfully");
            console.log(data);
        }
    
    }
    function callback1(res){
        res.json().then(callback2);
        }
    
    fetch("http://localhost:3000/admin/courses",{
        method:"POST",
        body: JSON.stringify({
            title:title,
            description:description,
            imageLink:image,
            published:true
        }),
        headers:{
            "Content-type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("token")
        }
    }).then(callback1)
    
   }}
   >Add It</Button>
   </Card>

    </center>
   
</div>
}

export default Addcourse;