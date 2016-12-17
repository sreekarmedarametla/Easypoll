//var mongo = require('../data/dbconnection');
var mongo=require('../data/mongo');

var mongoURL = "mongodb://localhost:27017/meanhotel";
module.exports.saveSurveyQuestions = function(req, res, next) {
    console.log("In the save Survey Quesions controller- node");
    //var headerExists = req.headers.authorization;
    /*if (headerExists) {
     //var token = req.headers.authorization.split(' ')[1]; //--> Authorization Bearer xxx
     jwt.verify(token, 's3cr3t', function(error, decoded) {
     if (error) {
     console.log(error);
     res.status(401).json('Unauthorized');
     } else {
     console.log("Working to save the survey questions");

     //req.user = decoded.username;
     next();
     }
     });
     } else {
     res.status(403).json('No token provided');
     }*/
    var json={};
    var surveyName={};
    var questions=[];
    var surveynames = [];
    var options=[];
    //json=req.body.questionArray;
    var obj=req.body.questionArray;
    json.obj=[];
    //json.obj.surveyName=surveyName=req.body.surveyName;
    console.log("JSON Object: ");
    /*for (var i in obj)
     {
     questions.push(obj[i].questionName);
     console.log("one: "+obj[i].questionName);

     }*/

    //console.log("abc: "+JSON.stringify(req.body.questionArray));
    //console.log("xyz: "+JSON.stringify(req.body.surveyName));
    options=JSON.stringify(req.body.questionArray[0].options);
    var questionname=JSON.stringify(req.body.questionArray[0].questionName);
    surveyName["survey_name"]=req.body.surveyName;
    //survey.surveyName=JSON.stringify(req.body.surveyname);
    var sName=req.body.surveyName;
    surveyName[sName]=req.body.questionArray;
    console.log("values in survey"+JSON.stringify(surveyName));
    console.log("options"+options[0]);
    console.log("question name"+questionname);


    /*console.log(options.length);
     console.log(questions.length);
     console.log(surveynames.length);*/
    console.log("user createSurveyjs: "+req.session.username);
    for(var i in surveynames ){
        for (var j in questions ){
            for(var k in options){
                surveynames[i].push(questions[j].push(options[k]));
                console.log(surveynames[i].questions[j].options[k]);

            }

        }

    }

    //json.surveyName.questions=questions;
    console.log("Survey Name: "+json.surveyName);
    console.log("JSON OBJECT RECEIVED "+JSON.stringify(json));




    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('users');
        console.log(coll);
        var checkTHflag = false;
        coll.findOne({"username":req.session.username}, function(err, user){
            if (user) {
                console.log("username found");
                console.log("Inserting into db the json object");
                coll.update({"username":req.session.username}, {$set:surveyName}, function(err, user){
                    if (user) {
                        console.log("Signup Successful ");
                        var link="http://ec2-35-164-117-192.us-west-2.compute.amazonaws.com/t:3000/#!/getdata?surveyName="+surveyName.survey_name+"&userName="+req.session.username;
                        var linkText = "Access your poll at this link: " + link;
                        console.log(link);
                        data={
                            "response":linkText
                        }
                        res.send(data);
                        //res.redirect('/');
                    } else {
                        console.log("check query, the handle is going into insert details but not giving a successful output");
                    }
                });
            } else {
                console.log("Username is not found");

            }
        });
    });
};