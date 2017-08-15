apanaApp.controller('accessToken', function ($location,$rootScope,globalFactory) {
  var hash, splitted, params, param, key, value, authorized;
  console.log('accessToken controller was here!');
  hash = $location.path().substr(1);

  splitted = hash.split('&');
  params = {};

  for (var i = 0; i < splitted.length; i++) {
    param  = splitted[i].split('=');
    key    = param[0];
    value  = param[1];
    params[key] = value;
    $rootScope.accesstoken=params;
  }

  console.log('accesstoken params: ', params);

  globalFactory.accesstoken = $rootScope.accesstoken;

  $location.path("/connections"); //TODO instead use a 'logging you in' page

});
