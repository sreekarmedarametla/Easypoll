angular.module('meanhotel').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory, $scope, $window, $http) {
  var vm = this;
  vm.title = 'MEAN Hotel App';
  hotelDataFactory.hotelList().then(function(response) {
    // console.log(response);
    vm.hotels = response.data;
  });

  $scope.updateOptions = function(){
    $scope.options = [];
    for(var i=1;i<=$scope.nooptions;i++){
      var name ="option_"+i;
      $scope.options.push({"name":name});
    }
  };

  $scope.questionArray= [];



  $scope.cancelButton = function () {
    $scope.surveyname = null;
    $scope.questionName = null;
    $scope.nooptions = null;
    $scope.showthis=true;
    console.log($scope);
    if ($scope.options.option_1){
      $scope.options.option_1 = null;
    }
    if ($scope.options.option_2){
      $scope.options.option_2 = null;
    }
    if ($scope.options.option_3){
      $scope.options.option_3 = null;
    }
    if ($scope.options.option_4){
      $scope.options.option_4 = null;
    }
  }

  $scope.nextButton = function () {
    $scope.question = {};
    $scope.question.questionName = $scope.questionName;
    $scope.question.options=[];
    if ($scope.options.option_1){
      $scope.question.options.push($scope.options.option_1)
    }
    if ($scope.options.option_2){
      $scope.question.options.push($scope.options.option_2)
    }
    if ($scope.options.option_3){
      $scope.question.options.push($scope.options.option_3)
    }
    if ($scope.options.option_4){
      $scope.question.options.push($scope.options.option_4)
    }
    $scope.questionArray.push($scope.question);

    //clearing the data in question page except surveyName
    $scope.questionName = null;
    $scope.nooptions = null;
    console.log($scope);
    if ($scope.options.option_1){
      $scope.options.option_1 = null;
    }
    if ($scope.options.option_2){
      $scope.options.option_2 = null;
    }
    if ($scope.options.option_3){
      $scope.options.option_3 = null;
    }
    if ($scope.options.option_4){
      $scope.options.option_4 = null;
    }

    console.log($scope.questionArray);

  }

  $scope.submitButton = function () {
    var surveyName=$scope.surveyname;

    $scope.question = {};
    $scope.question.questionName = $scope.questionName;
    $scope.question.options=[];
    if ($scope.options.option_1){
      $scope.question.options.push($scope.options.option_1)
    }
    if ($scope.options.option_2){
      $scope.question.options.push($scope.options.option_2)
    }
    if ($scope.options.option_3){
      $scope.question.options.push($scope.options.option_3)
    }
    if ($scope.options.option_4){
      $scope.question.options.push($scope.options.option_4)
    }
    $scope.questionArray.push($scope.question);
    $http.post('/api/users/surveySave', {"questionArray": $scope.questionArray, "surveyName": $scope.surveyname}).then(function(response) {
      if (response) {
        console.log(response);
        console.log(response.data);
        $scope.linkText=response.data.response;
        /*$window.sessionStorage.token = response.data.token;
        AuthFactory.isLoggedIn = true;
        var token = $window.sessionStorage.token;
        var decodedToken = jwtHelper.decodeToken(token);

        vm.loggedInUser = decodedToken.username;
        console.log("DEcoded token: "+JSON.stringify(decodedToken));*/
        console.log("Angular response recorded-success");
      }
    }).catch(function(error) {
      console.log(error);
    })



  }

  $scope.getPreviousForms=function () {
      $http({
          url: '/api/users/getPreviousSurveys',
          method: "GET"
      }).then(function(res) {
          console.log("inside Surveycontroller");
          console.log(res);
          $scope.surveyNames=res.data;


          //access returned res here

      }, function(error) {
          //handle error here
      });


  }

  $scope.getAllResponses=function (surveyName) {
    console.log("inside here");
    console.log(surveyName);





    $http({
      url: '/api/users/getSurveyResponse',
      method: "post",
      data:{
        "surveyName":surveyName
      }
    }).then(function(response) {
      console.log("inside Survey controller");
      console.log(response);
      $scope.surveyResponses=response.data;




      //access returned res here

    }, function(error) {
      //handle error here
    });

    $http({
      url: '/api/users/getdata',
      method: "GET",
      params: {surveyName: surveyName}
    }).then(function(res) {
      console.log(res.data);
      console.log(res.data[0].questionName);
      console.log(res.data[0].options);
      console.log(res.data[0].options[0]);
       var display={};

      /*for(var i=0;i<res.data[0].options.length;i++)
      {
        if(res.data[0].options[i]==$scope.surveyResponses[0].answer){
             if(!$scope.display.options[i])
             {
               $scope.display.options=1;
             }
             else {
               $scope.display.options=$scope.display.options+1;
             }

        }
      }
      */
      console.log(res.data[0].options.length);
      for(var i=0;i<res.data[0].options.length;i++)
      {
        if(res.data[0].options[i]==$scope.surveyResponses[0].answer){
          console.log("one");
          if(!display.options[i])
          {
            console.log("one");
            display.options[i]=1;
            console.log(display);
          }
          else {
            console.log("two");
            display.options[i]=display.options[i]+1;
            console.log(display);
          }

        }
      }
      console.log(display);



      console.log("till here");
      console.log("test"+display);
      console.log("till here");





      //access returned res here

    }, function(error) {
      //handle error here
    });









  }


}
