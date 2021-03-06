﻿function ClientMainCtrl($scope, $routeParams, $http, $location) {
    $scope.sorts = $routeParams.sorts;
    if (!$scope.sorts)
        $scope.sorts = "enterprise";//企业
    $scope.loadCurrentSortList = function () {
        switch ($scope.sorts) {
            case 'enterprise'://获取企业用户
                $http.post($sitecore.urls["SearchCustomerEntByOwnerId"], { pageIndex: $routeParams.pageIndex || 0, pageSize: 20 }).success(function (data) {
                    $scope.enterpriseclients = data.Data.Items;
                }).error(function (data, status, headers, config) {
                    $scope.enterpriseclients = [];
                });
                break;
            case 'personal'://获取个人用户
                $http.post($sitecore.urls["SearchCustomerPrivByOwnerId"], { pageIndex: $routeParams.pageIndex || 0, pageSize: 20 }).success(function (data) {
                    $scope.personalclients = data.Data.Items;
                }).error(function (data, status, headers, config) {
                    $scope.personalclients = [];
                });
                break;
        }
    };
    $scope.loadCurrentSortList();
    $scope.ShowAddEnterpriseForm = function () {
        $scope.$broadcast('EventAddEnterprise', this.enterpriseclientItem);
    };
    $scope.ShowAddPersonalForm = function () {
        $scope.$broadcast('EventAddPersonal', this.personclientItem);
    }
}
function AddClientCtrl($scope, $routeParams, $http, $location) {
    switch ($scope.sorts) {
        case 'enterprise':
            var formdata;
            $scope.$on("EventAddEnterprise", function (event, data) {
                formdata = data;
                if (formdata) {
                    $scope.EnterpriseItem = angular.copy(formdata);
                }
                else {
                    $scope.EnterpriseItem = { CustomerEntId: 0 };
                }
                $("#AddEnterpriseBox").modal('show');
            });
            $scope.AddEnterpriseSubmit = function () {
                if ($scope.AddEnterpriseForm.$valid) {
                    $scope.showerror = false;
                    $http.post($sitecore.urls["AddOrUpdateEnterPriseClient"], { customerEntId: $scope.EnterpriseItem.CustomerEntId, entName: $scope.EnterpriseItem.EntName, industy: $scope.EnterpriseItem.Industy, contactUsername: $scope.EnterpriseItem.ContactUsername, contactMobile: $scope.EnterpriseItem.ContactMobile, phone: $scope.EnterpriseItem.ContactPhone, email: $scope.EnterpriseItem.ContactEmail, qq: '', address: $scope.EnterpriseItem.Address, Detail: $scope.EnterpriseItem.Detail }).success(function (data) {
                        if (data.Error) {
                            alert(data.ErrorMessage);
                        }
                        else {
                            $("#AddEnterpriseBox").modal('hide');
                            $scope.loadCurrentSortList();
                        }
                    }).
                    error(function (data, status, headers, config) {
                        //$scope.product = {};
                    });
                }
                else {
                    $scope.showerror = true;
                }
            };
            break;
        case 'personal':
            var formdata;
            $scope.$on("EventAddPersonal", function (event, data) {
                formdata = data;
                if (formdata) {
                    $scope.PersonalItem = angular.copy(formdata);
                }
                else {
                    $scope.PersonalItem = { CustomerPrivateId: 0, Sex: 1 };
                }
                $("#AddPersonalBox").modal('show');
            });
            $scope.AddPersonalSubmit = function () {
                if ($scope.AddPersonalForm.$valid) {
                    $scope.showerror = false;
                    $http.post($sitecore.urls["AddOrUpdatePersonalClient"], { pivid: $scope.PersonalItem.CustomerPrivateId, name: $scope.PersonalItem.Name, sex: $scope.PersonalItem.Sex, birthday: $scope.PersonalItem.Birthday, contactMobile: $scope.PersonalItem.Mobile, phone: $scope.PersonalItem.Phone, email: $scope.PersonalItem.Email, qq: $scope.PersonalItem.Qq, address: $scope.PersonalItem.Address, detail: $scope.PersonalItem.Detail }).success(function (data) {
                        if (data.Error) {
                            alert(data.ErrorMessage);
                        }
                        else {
                            $("#AddPersonalBox").modal('hide');
                            $scope.loadCurrentSortList();
                        }
                    }).
                    error(function (data, status, headers, config) {
                        //$scope.product = {};
                    });
                }
                else {
                    $scope.showerror = true;
                }
            };
            break;
    }


};