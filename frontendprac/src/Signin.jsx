import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import Card from '@mui/material/Card';
function Signin(){
return <div >
    
    <center>
    <center style={{
        paddingTop:"100px",
        marginBottom:"20px"
    }}>
        <Typography variant={"h6"}>
        Welcome Back!
        </Typography>
        
    </center>

    <Card variant="outlined" style={{width: 400 ,
    padding : 10 }}>

 
    Username-<TextField 
id="username" 
label="username" 
variant="outlined" />
    <br />
   Password-<TextField 
id="password" 
label="password" 
variant="outlined" type='password' />
   <br /> 
   
   <Button variant="contained">Contained</Button>
   </Card>

    </center>
   
</div>
}

export default Signin;