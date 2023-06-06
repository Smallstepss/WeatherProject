const express=require("express");

const https=require("https");

const app=express();

const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));//server the entire directory

app.get("/",function(req,res)

{
  res.sendFile(__dirname+"/index.html");


});
app.post("/",function(req,res){


const query=req.body.city;
const appKey="bb984f5287be79250efe2fa90abd00a7"
const unit="metric"
const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID="+appKey+"&units="+unit;


https.get(url,function(response)
{
   console.log(response.statusCode);

    response.on("data",function(data){
    const weatherData=JSON.parse(data);
//  console.log(weatherData);
/*  const object= {
  name:"ethan",
  favfood:"icecream"
  }
console.log(JSON.stringify(object)); */
const temp=weatherData.main.temp;
//404 error const temp=weatherData.main.temp;
//TypeError: Cannot read properties of undefined (reading 'temp')
 //console.log(temp);
  //const temp = weatherData && weatherData.main && weatherData.main.temp;
const desc=weatherData.weather[0].description;
const location=weatherData.name;
const id=weatherData.weather[0].id;
const icon=weatherData.weather[0].icon;
console.log(icon);
const imgUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
//console.log(desc);
/* Done by me
res.send("<div>" +
"The weather is currently " + desc +
"<h1>The temperature of " +location+" is " + temp + " degree celscius</h1>" +
"</div>"
);
*/
//alternative
res.write('<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; height: 100vh; background:url(/rafael-garcin-StjPQ0n4wIA-unsplash.jpg); background-size:cover;">');
res.write(  '<p style="font-size: 2rem; color: #FAC213;">The weather is currently ' + desc + '</p>');
res.write('<h1 style="font-size: 2.5rem; color: #F77E21;">The temperature of ' +location+' is ' + temp + ' degree celscius</h1>');
res.write(`<img src="${imgUrl}"  alt="weatherImg" style="width: 200px; height: 200px; "/>`); //res.write("<img src="+imgUrl+"/>");
res.write('</div>');
res.send();









});
});
});

//res.send("server is up and running")

app.listen(3000,function()
{console.log("Server is running on port 3000.");
});
