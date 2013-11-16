﻿function UserLoginMainCtrl($scope, $http, $location) {
    var loading = utilities.loading('登陆中...');
    $scope.CurrentUser = null;
    $scope.hasPermission = function (id) {
        if ($scope.CurrentUser && $scope.CurrentUser.userFuns && $scope.CurrentUser.userFuns.length) {
            for (var i = 0; i < $scope.CurrentUser.userFuns.length; i++) {
                if ($scope.CurrentUser.userFuns[i].IdsysFunction == id)
                    return true;
            }
        }
        return false;
    };
    $scope.UserLogin = function () {
        console.log(angular.toJson($scope.User));
        if ($scope.UserLoginForm.$valid) {
            $scope.showerror = false;
            loading.show();
            $http.post($sitecore.urls["userLogin"], { account: $scope.User.email, pwd: $scope.User.pwd }).success(function (data) {
                if (data.Error) {
                    alert(data.ErrorMessage);
                    loading.hide();
                }
                else {
                    $http.post($sitecore.urls["userCurrentUser"], {}).success(function (data) {
                        console.log(data);
                        if (data.Error) {
                            alert(data.ErrorMessage);
                        }
                        $scope.CurrentUser = data.Data;
                        if ($scope.hasPermission(27)) {
                            window.location.href = "boss.html";
                        }
                        else {
                            window.location.href = "index.html";
                        }
                    }).
                    error(function (data, status, headers, config) {
                        $scope.CurrentUser = {};
                    });

                }
                console.log(data);
            }).
            error(function (data, status, headers, config) {
                loading.hide();
            });
        }
        else {
            $scope.showerror = true;
        }
    }

    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            $scope.$apply(function () {
                $scope.UserLogin();
            });
        }
    });
}

function UserRegisterMainCtrl($scope, $http) {
    $scope.UserRegister = function () {
        console.log(angular.toJson($scope.User));
        if ($scope.UserRegisterForm.$valid) {
            $scope.showerror = false;
            $http.post($sitecore.urls["userRegister"], { username: $scope.User.name, account: $scope.User.email, pwd: $scope.User.pwd, entCode: $scope.User.enterprise }).success(function (data) {
                if (data.Error) {
                    alert(data.ErrorMessage);
                }
                else {
                    window.location.href = "index.html";
                }
                console.log(data);
            }).
            error(function (data, status, headers, config) {
                alert("error")
            });
        }
        else {
            $scope.showerror = true;
        }
    }

    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            $scope.$apply(function () {
                $scope.UserRegister();
            });
        }
    });
}

function EnterpriseRegisterMainCtrl($scope, $http) {
    $scope.EnterpriseRegister = function () {
        console.log(angular.toJson($scope.Enterprise));
        if ($scope.EnterpriseRegisterForm.$valid) {
            $scope.showerror = false;
            $http.post($sitecore.urls["enterpriseRegister"], { entName: $scope.Enterprise.name, account: $scope.Enterprise.email, pwd: $scope.Enterprise.pwd }).success(function (data) {
                if (data.Error) {
                    alert(data.ErrorMessage);
                }
                else {
                    window.location.href = "index.html";
                }
                console.log(data);
            }).
            error(function (data, status, headers, config) {
                alert("error")
            });
        }
        else {
            $scope.showerror = true;
        }
    }

    $(document).keyup(function (e) {
        if (e.keyCode == 13) {
            $scope.$apply(function () {
                $scope.EnterpriseRegister();
            });
        }
    });
}


function UserMainCtrl($scope, $http, $location) {
    $scope.GetCurrentUserInfo = function () {
        $http.post($sitecore.urls["GetCurrentUserInfo"], {}).success(function (data) {
            if (data.Error) {
                alert(data.ErrorMessage);
            } else {
                $scope.UserInfo = data.Data;
                if ($scope.UserInfo != null && $scope.UserInfo.Sex == 0) {
                    $scope.UserInfo.Sex = 1;
                }
                //$scope.parseAge(data.Data.Birthday)
                $scope.UserInfo.Age = 12;
            }
        }).error(function (data, status, headers, config) {
            alert('error');
        })
    };
    $scope.GetCurrentUserInfo();
    $scope.EditUserInfo = function (data) {
        if ($scope.EditUserForm.$valid) {
            $http.post($sitecore.urls["EditCurrentUserInfo"], { username: data.UserName, nickname: data.UserAccount, sex: data.Sex, age: data.Age }).success(function (data) {
                if (data.Error) {
                    alert(data.ErrorMessage);
                } else {
                    alert("修改成功");
                }
            }).error(function (data, status, headers, config) {
                alert('error');
            })
        }
    };
    //修改密码
    $scope.ChangePwdSumbit = function (data) {
        if ($scope.ChangePwdForm.$valid) {
            if (data.surepwd != data.newpwd) {
                $scope.ChangePwdForm.newpwd.$valid = false;
                $scope.showerror = true;
            } else {
                $scope.showerror = false;
                $http.post($sitecore.urls["UpdatePwd"], { oldpwd: data.oldpwd, newpwd: data.newpwd }).success(function (data) {
                    if (data.Error) {
                        alert(data.ErrorMessage);
                    }
                    console.log(data);
                }).
                error(function (data, status, headers, config) {
                    alert("error")
                });
            }
        }
        else {
            $scope.showerror = true;
        }
    };
    //修改邮箱
    $scope.ChangeEmailSubmit = function (data) {
        if ($scope.ChangeEmailForm.$valid) {
            $scope.showerror = false;
            $http.post($sitecore.urls["UpdateEmail"], { email: data.newemail, pwd: data.pwd }).success(function (data) {
                if (data.Error) {
                    alert(data.ErrorMessage);
                } else {
                    alert("修改成功");
                }
                console.log(data);
            }).
            error(function (data, status, headers, config) {
                alert("error")
            });

        }
        else {
            $scope.showerror = true;
        }
    }
}

function UserTimeShaftCtrl($scope, $http, $location) {
    $scope.LoadMyTimeShaft = function () {
        $http.post($sitecore.urls["SearchUserTimeMachine"], {}).success(function (data) {
            if (!data.Error) {
                $scope.UserTimeShafts = data.Data;
            } else {

            }
            console.log(data);
        }).
              error(function (data, status, headers, config) {
                  alert("error")
              });
    }
    $scope.LoadMyTimeShaft();
    $scope.ShowAddCompany = function () {
        $scope.$broadcast('EventAddCompany');
    }
}
function AddCompanyCtrl($scope, $http, $location) {
    $scope.$on("EventAddCompany", function (event) {
        $scope.AddComItem = { username: $scope.CurrentUser.UserName };
        $("#AddCompanyBox").modal('show');
    });
    $scope.AddCompanySubmit = function (data) {
        if ($scope.AddCompanyForm.$valid) {
            $scope.showerror = false;
            $http.post($sitecore.urls["EditeUserEntCode"], { username: data.username, entCode: data.enterpriseid }).success(function (data) {
                if (!data.Error) {
                    $("#AddEnterpriseBox").modal('hide');
                }
                else {
                    alert(data.ErrorMessage);
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
}
function StaffMangementCtrl($scope, $http, $location) {
    $scope.selectedRoleid = 0;
    $scope.SearchEntRole = function () {
        $http.post($sitecore.urls["SearchEntRole"], {}).success(function (data) {
            if (!data.Error) {
                $scope.SysRoles = data.Data;
                $scope.SelectedOptions = [];
                for (var i = 1; i < $scope.SysRoles.length; i++) {
                    $scope.SelectedOptions.push($scope.SysRoles[i])
                }
            } else { $scope.SysRoles = []; }
        }).error(function (data, status, headers, config) {
            $scope.SysRoles = [];
        });
    }
    $scope.SearchEntRole();
    $scope.SearchUserListByRoleId = function (RoleId) {
        if (RoleId != null) {
            $scope.selectedRoleid = RoleId;
            $http.post($sitecore.urls["SearchUserListByRoleId"], { roleId: RoleId }).success(function (data) {
                if (!data.Error) {
                    var Datas = data.Data;
                    var SelectItems = [];
                    for (var i = 0; i < data.Data.length; i++) {
                        for (var j = 0; j < $scope.SelectedOptions.length; j++) {
                            if (data.Data[i].RoleId == $scope.SelectedOptions[j].RoleId) {
                                SelectItems.push($scope.SelectedOptions[j]);
                            }
                        }
                    }
                    debugger;
                    $scope.SysUsers = { Datas: Datas, SelectItems: SelectItems };

                } else { $scope.SysUsers = []; }
            }).error(function (data, status, headers, config) {
                $scope.SysUsers = [];
            });
        }
    };
    $scope.SearchUserListByRoleId(0);
    $scope.ChangeUserRole = function (item,user) {
        debugger;
        $http.post($sitecore.urls["UpdateUserRole"], { userId: user.UserId, roleId: item.RoleId }).success(function (data) {
            if (!data.Error) {
                alert("修改成功");
            } else { }
        }).error(function (data, status, headers, config) {

        });
    }
}
function EnterPriseInfoCtrl($scope, $http, $location) {
    $scope.EditCurrentEntCode = function (data) {
        if ($scope.ChangeEnterprsieForm.$valid) {
            $scope.showerror = false;
            $http.post($sitecore.urls["EditeCurrentEntCode"], { entCode: data.EntCode }).success(function (data) {
                if (!data.Error) {
                    alert("修改成功！");
                } else { }
            }).error(function (data, status, headers, config) {
                $scope.SysUsers = [];
            });
        } else {
            $scope.showerror = true;
        }
    }
    $scope.EditCurrentUserName = function () {
        if ($scope.ChangeEnterprsieForm.Name.$valid) {
            alert(123);
            $scope.showerror = false;
            //$scope.Ntype = false;
        } else {
            $scope.showerror = true;
        }
    }
}