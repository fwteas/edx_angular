app.controller('labController', [
    '$scope', '$timeout', '$q', '$http', 'gitHub',
    function ($scope, $timeout, $q, $http, gitHub) {
        $scope.model = {
            number: 0,
            result: 'Ready',
        };

        $scope.checkOddNumber = checkOddNumber;
        $scope.getRepos = getRepos;
        $scope.loadDetail = loadDetail;

        // function getRepos() {
        //     $http.get('https://api.github.com/orgs/angular/repos')
        //         .then(function (valid_res) {
        //             $scope.model.repos = valid_res.data;
        //         }, function (error_res) {
        //             $scope.model.repos = 'Error: ' + error_res.data.message;
        //         });
        // }
        
        function getRepos(search) {
            $scope.model.repos = gitHub.getAll({org:search});
        }

        // function loadDetail(name) {
        //     var url = 'https://api.github.com/repos/angular/' + name;
        //     $http.get(url)
        //         .then(function (response) {
        //             $scope.model.detail = response.data;
        //         }, function (response) {
        //             $scope.model.detail = { error: true, message: 'Error: ' + response.data.message };
        //         });
        // }

        function loadDetail(name) {
            $scope.model.detail = null;
            $scope.model.detail = gitHub.getDetail({ id: name,org:search });
        }

        function checkOddNumber(input) {
            $scope.model.result = 'Working...';
            checkOddNumberHandler(input).then(function (result) {
                $scope.model.result = 'Success: ' + result;
            }, function (result) {
                $scope.model.result = 'Error: ' + result;
            })
        }

        function checkOddNumberHandler(input) {
            var defer = $q.defer();

            $timeout(function () {
                if (isNumberOdd(input)) {
                    defer.resolve('Yes, an odd number');
                } else {
                    defer.reject('Not an odd number');
                }
            }, 1000);

            return defer.promise;
        }

        function isNumberOdd(input) {
            return !isNaN(input) && input % 2 == 1;
        }
    }
]);