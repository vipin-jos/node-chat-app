const path = require('path');
const express = require('express');

// this is for heroku. If the environment variable port exisits it assigns, else uses 3000
const port = process.env.PORT || 3000;

var app = express();

const publicPath = path.join(__dirname,'/../public');
// demonstrates benefit of path.join() function
console.log(__dirname+'/../public');
console.log(publicPath);

app.use(express.static(publicPath));

app.get('/',(req,res) => {
    res.render('index.html');
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

