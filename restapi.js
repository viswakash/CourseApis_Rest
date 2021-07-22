const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());

const courses = [
  {id:1, name:'course1'},
  {id:2, name:'course2'},
  {id:3, name:'course3'},
];


app.get('/', (req,res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req,res) => {
  res.send([1,2,3]);
});


app.post('/api/course',(req,res)=>{
const{error}=validateCourse(req.body);
if(error){
  res.status(400).send(result.error.details[0].message);
  return;
}
  const course ={
  id:course.length+1,
  name:req.body.name
  };
  courses.push(course);
  res.send(course);
});


app.put('/api/courses/:id',(req,res)=>{
//Look up the course
//If not exsisting,retun 404
const course=courses.find(c=>c.id===parseInt(req.params.id));
if(!course) return res.status(404).send('The course with given ID was ',res.send(course))

//Validate
//If invalid,return 400- Bad request
const{error}=validateCourse(req.body);
if(error){
  res.status(400).send(result.error.details[0].message);
  return;
}
//Update course
//Return the uploaded course
course.name=req.body.name;
res.send(course);
});

function validateCourse(course){
  const schema ={
    name:Joi.string().min(3).required()
  };
  return Joi.validate(course,schema);
}


app.delete('/api/courses/:id',(req,res)=>{
  const course=courses.find(c=>c.id===parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with given ID was ',res.send(course))
  
  const index=courses.indexOf(course);
  courses.splice(index,1);

  res.send(course);
});



app.get('/api/courses/:id',(req,res) => {
  const course=courses.find(c=>c.id===parseInt(req.params.id));
  if(!course) return res.status(404).send('The course with given ID was '
   ,res.send(course))
  })



const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Listening on port ${port}...'));
