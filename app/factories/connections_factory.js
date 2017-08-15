apanaApp.factory('connectionsFactory', function($http, globalFactory){
  var cf = {};

  cf.get_sites = function(){
    return $http({
      method  : "GET",
      url     : globalFactory.api_base_url + 'installer/sites?access_token=' + globalFactory.jwt_bearer_token
    }).then(
      function(response){
        return response;
      }
    );
  };

  cf.get_site_status = function(site_id){
    return $http({
      method  : "GET",
      url     : globalFactory.api_base_url + 'installer/site_status?site_id=' + site_id + '&access_token=' + globalFactory.jwt_bearer_token
    }).then(
      function(response){
        return response;
      }
    );
  };

  return cf;
});
