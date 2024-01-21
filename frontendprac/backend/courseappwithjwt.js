const express = require('express');
const app = express();
const jwt=require('jsonwebtoken');
const cors =require('cors');

app.use(cors());

//jwt token consists of the payload which contains user details, header which constains the metadata ,sign which is combination of the secret key and the message

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const secretadmin = "Abrakadabra";//this secret code is only decoded by backend as only backend has access to it server side do not have access to it
const secretuser = "Ghanta";

function createjwtadmin(cont){
  const payload={username:cont.username};//Only sending the unique username 

  let ans= jwt.sign(payload,secretadmin,{expiresIn:'1h'});
  return ans;

}

function createjwtuser(cont){
  // const payload={username:cont.username};//Only sending the unique username 

  let ans= jwt.sign(cont,secretuser,{expiresIn:'1h'});
  return ans;

}

const Authenticatejwt = (req,res,next)=>{
  const authheader= req.headers.authorization;
  if(authheader){
    const token = authheader.split(' ')[1];

    jwt.verify(token,secretadmin,function(err,user){
      if(err){
        console.log(err);
      }
      else{
        // console.log(user);
        req.user=user;
        next();
      }
    });
  }
  else{
    res.status(401);
  }

};

const Authenticatejwtuser = (req,res,next)=>{
  const authheader= req.headers.authorization;
  if(authheader){
    const token = authheader.split(' ')[1];

    jwt.verify(token,secretuser,function(err,user){
      if(err){
        console.log(err);
      }
      else{
        // console.log(user);
        req.user=user;
        next();
      }
    });
  }
  else{
    res.status(401);
  }

};

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const admin = req.body;
  const existingAdmin = ADMINS.find(a => a.username === admin.username);
  // console.log(existingAdmin);
  if (existingAdmin) {
    res.status(403).json({ message: 'Admin already exists' });
  } else {
    ADMINS.push(admin);
    
    let token = createjwtadmin(admin);


    res.json({ message: 'Admin created successfully', "token": token});
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const admin=req.headers;
  const existingadmin= ADMINS.find(a => a.username === admin.username && a.password===admin.password);

  if(existingadmin){
    let token=createjwtadmin(admin);
    res.json({message:"Login Successful",token});
  }
  else{
    res.status(403).json({message:'Admin Authentication failed'});
  }


});

app.post('/admin/courses',Authenticatejwt, (req, res) => {
  // logic to create a course
  // console.log("hi");
  // res.json("hi");
  const coursedet= req.body;
  coursedet.id=COURSES.length+1;
  COURSES.push(coursedet);
  res.json({
    message:'Course created successfully',"courseid":coursedet.id
  })
  



});

app.put('/admin/courses/:courseId',Authenticatejwt, (req, res) => {
  // logic to edit a course
  const courseId= parseInt(req.params.courseId);//getting the course id from the url
  const existingcourse= COURSES.find(c=> c.id===courseId );//finding the existing course
  console.log(existingcourse);
  if (existingcourse) {
    Object.assign(existingcourse, req.body);//this inbuilt function exchanges the existing course data with req.body
    console.log(existingcourse);
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }

});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  res.json(COURSES);
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const user = {
    username: req.body.username,
    password: req.body.password,
    
  }
  const existinguser= USERS.find(a=> a.username===user.username);//Checking if the user already exists or not
  if(existinguser){
    res.status(403).json({ message: 'User already exists' });
  }
  else{
USERS.push(user);
let token = createjwtuser(user);// generating jwt token for this user

console.log(USERS);
res.json({ message: 'User created successfully', "token": token});
  }
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  const user=req.headers;
  const existinguser=USERS.find(a=> a.username===user.username && a.password===user.password);
  if(existinguser){
  let token = createjwtuser(user);
  res.json({message:"Login Successful",token});

  }
  else{
    res.status(403).json({
      message:"Login Failed"
    })
  }
});


app.get('/users/courses', (req, res) => {
  // logic to list all courses
  res.json({ courses: COURSES });

});

app.post('/users/courses/:courseId',Authenticatejwtuser, (req, res) => {
  // logic to purchase a course
  // console.log(req.user.password);

  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === courseId);//finding te course if its present or not
  if (course) {
    const user = USERS.find(u => u.username === req.user.username);// finding user so as to make a purchased course list 
    if (user) {
      if (!user.purchasedCourses) {
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);//pushing the course
      res.json({ message: 'Course purchased successfully' });
      console.log(user);
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
  
  

});

app.get('/admin/me',Authenticatejwt,(req,res) =>{

  res.json({
    username:req.user.username
  })

})


app.get('/users/purchasedCourses',Authenticatejwtuser, (req, res) => {
  // logic to view purchased courses
  // console.log(req.user);
  const user = USERS.find(u => u.username === req.user.username);
  if(user){
    res.json(user.purchasedCourses);
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});