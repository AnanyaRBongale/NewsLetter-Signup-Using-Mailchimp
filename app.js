const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
  const firstname = req.body.fname;
  const secondname = req.body.lname;
  const email = req.body.email;

  const data = {
    members:[{
      email_address:email,
      status: "subscribed",
      merge_fields:{
        FNAME: firstname,
        LNAME: secondname
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = " https://us17.api.mailchimp.com/3.0/lists/118c2c6365";

  const options = {
    method: "POST",
    auth: "ananya:2be8baed8c6a87f0ffbf628035d5e677-us17"
  }

  const request = https.request(url, options, function(response){


if (response.statusCode === 200){
  res.sendFile(__dirname + "/success.html");
}else{
  res.sendFile(__dirname + "/failure.html");
}

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.listen(process.env.PORT || port, () => {
  console.log("running sucessfully");
});
