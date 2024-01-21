import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
function Getcourse() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/admin/courses', {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            setPosts(data);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    return (
        <div style={{display:"flex",flexWrap:'wrap',justifyContent:'center'}}>
           <Typography textAlign={'center'} variant="h6"> Courses: </Typography>
            
            {posts.length === 0 ? (
                <p>Loading...</p>
            ) : (
                posts.map(course => (
                    <Course key={course.id} course={course} />
                ))
            )}
        </div>
    );
    
    
}

export function Course(props){
return <Card style={{border:"2px solid black",width:200,height:200,margin:10}}>
    <Typography textAlign={'center'} variant="h6"> {props.course.title} </Typography> {"   "}
    <Typography textAlign={'center'} variant="subtitle1"> {props.course.description} </Typography> {"   "}
    <img src={props.course.imageLink} style={{width:200}}/>
    
</Card>
}

export default Getcourse;
