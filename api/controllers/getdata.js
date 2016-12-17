var mongo=require('../data/mongo');

var mongoURL = "mongodb://localhost:27017/meanhotel";
module.exports.getdata = function(req, res, next) {
    console.log("In the getdata controller- node");
    //json.surveyName.questions=questions;
    //console.log("Survey Nameeee: "+JSON.stringify(req.params.surveyName));
    var sname=req.param("surveyName");
    var uname=req.session.username;
    console.log("Survey Name : "+req.param("surveyName"));
    console.log("User Name : "+uname);
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('users');
        console.log(coll);
        var checkTHflag = false;
        var sname=req.param("surveyName");
        coll.findOne( ({username: uname}
        ), function(err, user){
            if (user) {
                var sname=req.param("surveyName");
                console.log("SURVEYY NAME: "+sname);
                console.log("user complete: "+JSON.stringify(user));
                var query=user+"."+sname;
                console.log("usern: "+user);
                var val=JSON.stringify(user);
                var parsedvalues=JSON.parse(val);
                console.log("usern: "+user);
                console.log("usern: "+JSON.stringify(user[sname]));
                res.send(user[sname]);
                //console.log("Inserting into db the json object");
            } else {
                console.log("Username is not found");

            }
        });

    });
};