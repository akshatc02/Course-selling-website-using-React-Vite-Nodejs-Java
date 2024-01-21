
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';

function Course(){
  let {courseId}=useParams();
  const [posts, setPosts] = useState([]);
    useEffect(
        ()=>{
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
        },[]
    );
let partcourse;
for(let i=0;i<posts.length;i++){
    if(posts[i].id==courseId){
    partcourse=posts[i];
    }
}

if(!partcourse){
    return <div>
        Loading............
    </div>
}

return <div style={{display:"flex",textAlign:"center",justifyContent:"center"}}>
    <CourseTable course={partcourse}></CourseTable>
    <UpdateCard posts={posts} course={partcourse} setPosts={setPosts}> </UpdateCard>
</div>

}

function CourseTable(props){
    const partcourse=props.course;
    return  <Card style={{border:"2px solid black",width:200,height:200,margin:10}}>
    <Typography textAlign={'center'} variant="h6"> {partcourse.title} </Typography> {"   "}
    <Typography textAlign={'center'} variant="subtitle1"> {partcourse.description} </Typography> {"   "}
    <img src={partcourse.imageLink} style={{width:200}}/>
    
    </Card>
}

function UpdateCard(props){
    const [title,setTitle]= useState("")
    const [description,setDescription]= useState("")
    const [image,setImage]=useState("")
    const partcourse=props.course
return <Card variant="outlined" style={{width: 400 ,
    padding : 10 }}>

<Typography>Update Course</Typography>
 
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
            
            let Updatedcourses=[];
            for(let i=0;i<props.posts.length;i++){
                if(props.posts[i].id==partcourse.id){
                    Updatedcourses.push({
                        id:partcourse.id,
                        title:title,
                        description:description,
                        imageLink:image
                    })
                }
                else{
                    Updatedcourses.push(props.posts[i]);
                }


            }
            props.setPosts(Updatedcourses);
        }
    
    }
    function callback1(res){
        res.json().then(callback2);
        }
    
    fetch("http://localhost:3000/admin/courses/"+partcourse.id,{
        method:"PUT",
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
   >Update</Button>
   </Card>
}

export default Course;