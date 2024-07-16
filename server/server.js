require('dotenv').config();
const express = require('express'); //method, no path kasi asa node modules
const app = express();
const connectDb = require('./config/db');
const {errorHandler} = require('./middleware/errorMiddleware')

// connecting to database
connectDb();

// serve static files from public directory
app.use(express.static('public'))

app.get('/AWS',(req, res) => { // yung '/' ang route o directory na mag didisplay, ang '/' ay nasa localhost:5001/AWS lang
  res.status(200).json({message: "Hello AWSCCC"}); //standard

})

// post routes:
const postRouter = require('./routers/postRouter')
app.use('/posts', postRouter) 

// use error middleware
app.use(errorHandler)

//set up port
app.listen(5001, () => {
  console.log('Server is running in port 5001');
})


