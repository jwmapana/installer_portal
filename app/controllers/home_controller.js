apanaApp.controller('homeController', function( $scope, $location, ipCookie, globalFactory ){

  // console.log('home controller rules!', globalFactory.jwt_bearer_token);

  if(ipCookie('token')){
    $location.path("/connections");
  }
  else{
    $location.path("/login");
  }
});
