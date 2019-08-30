const express =require('express');
const app=express();
const mongoose=require('mongoose');
const db=require('./config/keys').mongoUrl;
const user=require('./route/api/users');
const bodyParser=require('body-parser');
const passport=require('passport');
const passports=require('passport');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(db,{
    useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

  require('./config/passport')(passport);
 app.use(passport.initialize());

app.use('/api/users',user);
// app.use('/api/student',student);

  port=process.env.PORT||5000;

  app.listen(port,()=>{
      console.log(`server connected on the port at ${port}`);
  });