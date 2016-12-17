angular.module('meanhotel').controller('getDataController', getDataController);

function getDataController($http,$scope, $location, $window, AuthFactory, jwtHelper) {
    var vm = this;

    vm.isLoggedIn = function() {
        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };

    /*vm.login = function() {
        if (vm.username && vm.password) {
            var user = {
                username: vm.username,
                password: vm.password
            };*/
    $scope.showsurvey = false;
        var surveyName=$location.search().surveyName;
    var userName=$location.search().userName;
    //console.log("Survey Name: "+surveyName);
    var data={"surveyName": surveyName};
    $scope.surveyNameWhole=surveyName;
    $scope.surveyOwner=userName;
    console.log("SUrvey NAme in ANgular controller "+surveyName);
    $http({
        url: '/api/users/getdata',
        method: "GET",
        params: {surveyName: surveyName, userName: userName}
    }).then(function(res) {
        console.log("inside getDatacontroller");
         console.log(res);
        $scope.questions=res.data;
        $scope.Answers={};
        //access returned res here

    }, function(error) {
        //handle error here
    });
    $scope.ShowAnswers = function()
    {
        $scope.showsurvey = true;
        console.log("In show answers");
        console.log($scope.showsurvey);
        console.log("inside function");
        console.log($scope.Answers);
        $scope.Answers.surveyname=$scope.surveyNameWhole;
        $scope.surveyOwner=userName;
        console.log($scope.Answers);

        console.log($scope.surveyNameWhole);
        $http({
            url: '/api/users/postFormResponse',
            method: "post",
            data:$scope.Answers
        }).success(function(res) {
            console.log(res);


        }, function(error) {
            //handle error here
        });




    };


    /*$http.get('/api/users/getdata', data).then(function(response) {
        console.log("Angular route successful");
    }).catch(function(error) {
        console.log("Not hitting the route nodejs"+error);
    })*/


}
