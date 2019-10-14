const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const getCandidate = require('./getCandidate');

var fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

var records = {};

app.get('/', function (req, res) {
       res.render('index')
    });

app.post('/', function (req, res) {

    var name = req.body.item;
    if (name !=''){
    
    var userdata = fs.readFileSync('records.json');
    userRecords = JSON.parse(userdata);
    //console.log(userRecords);

    var current = userRecords[name];
    if(current!=undefined) {
        res.render('alreadySeen',current);
    }else{
    var candidate = getCandidate.getPartnerName(name);

        if (candidate != name ){
        var currentData = {santa : name, kid : candidate};

        records[name] = currentData;
        var data = JSON.stringify(records,null,2);
        fs.writeFile('records.json',data,finished);
        
        console.log('santa: '+ name + ' kid: ' + candidate);
         res.render('showResult',{cand:candidate});

    function finished(err){
        if(err) {
            console.log(err);
        }
     } 
    } else {
      //  console.log('pick again');
        res.render('pickAgain');
    };
 }
} else {
    res.render('index');
 } 
});

app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});