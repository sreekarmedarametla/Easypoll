/**
 * Created by anush on 12/11/2016.
 */
var mysql=require('mysql');

function getConnection() {
    var connection = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'responses',
            port: 3306
        }
    );
    return connection;
}

module.exports.postFormData=function (req,res) {
    console.log("inside form method");

    console.log(req.body);
    // console.log(req.payload);
    // console.log(req.body.password);
    var questionName=[];
     questionName=Object.keys(req.body);
    console.log(questionName);
    var finalQuestionNames=[];
    for(var i=0;i<questionName.length-1;i++)
    {
        finalQuestionNames[i]=questionName[i];

    }
    console.log(finalQuestionNames);
    var insertionArray=[];

    for(var i=0;i<finalQuestionNames.length;i++)
    {
        var insertionObject={};
        insertionObject['surveyName']=req.body.surveyname;
        insertionObject['question']=finalQuestionNames[i];
        insertionObject['answer']=req.body[finalQuestionNames[i]];
        insertionObject['username']=req.session.username;
        insertionArray.push(insertionObject);

    }
    console.log(insertionArray);


   for(var k=0;k<insertionArray.length;k++ ) {
       var connection = getConnection();
       connection.query('INSERT INTO response SET ?', insertionArray[k], function (err, result) {
           if (err) {
               console.log(err);
               console.log("error");
           }
           else {
               console.log("succ");
               console.log(result);

           }

       });
   }



}

module.exports.getPreviousSurveys=function (req,res) {
  var getQuery= "select distinct surveyName  from response where username='"+req.session.username+"'";

    var connection = getConnection();
    connection.query(getQuery,function (err, result) {
        if (err) {
            console.log(err);
            console.log("error");
        }
        else {
            console.log("succ");
            console.log(result);
            res.send(result);

        }

    });


}


module.exports.getUserResponse=function (req,res) {
    console.log("inside this function");
    console.log(req.body);
    console.log(req.body.surveyName);
    var selectQuery="select question,answer from response where username='"+req.session.username+"' and  surveyName= '"+req.body.surveyName+"'";
    var connection = getConnection();
    connection.query(selectQuery,function (err, result) {
        if (err) {
            console.log(err);
            console.log("error");
        }
        else {
            console.log("succ");
            console.log(result);
            res.send(result);

        }

    });



}

