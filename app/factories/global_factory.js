apanaApp.factory('globalFactory', function($location, $http, $rootScope, ipCookie, environmentFactory){
  var gf = {};

  /////////////////////////////////////////////////
  //auth params
  // gf.redirect_uri = "http://vagrant.apana.us"; //for local development

  gf.google_client_id_local_dev = environmentFactory.google_client_id_local_dev;
  gf.google_client_id_cloud_dev = environmentFactory.google_client_id_cloud_dev;
  gf.redirect_uri = null; //gets set in the login controller, must also be present in google as allowable
  gf.accesstoken = null; //this is for oauth2
  gf.jwt_bearer_token = null; //this is for the REST api token
  gf.user = {
    id: null,
    name_first: '',
    name_last: '',
    role: '',
    email: ''
  };
  gf.expires = null;
  gf.refresh_token = null;
  gf.token_type = null;
  gf.domain = null;
  gf.menu_exclude = [];

  /////// AWS backend
  gf.api_base_url = environmentFactory.api_base_url;
  gf.api_base_url_version = environmentFactory.api_base_url_version;
  gf.api_base_url_auth = environmentFactory.api_base_url_auth;

  gf.api_headers = {
    "Content-Type": 'application/json',
    Accept: 'application/json'
  };
  gf.auth_params = {
    client_id: environmentFactory.auth_params.client_id,
    client_secret: environmentFactory.auth_params.client_secret
  };

  gf.check_auth = function()
  {
    //first check if there is a current token that hasn't expired
    if(gf.jwt_bearer_token){
      if(moment(gf.expires).isAfter(moment())){
        return true;
      }
      else{
        //don't need to check the cookie, it has the same expired token
        $location.path('/login');
      }
    }
    else if(ipCookie('token')){ //there's no current token, but the cookie has one; this may be a browser refresh event
      if(moment(ipCookie('token_expire')).isAfter(moment())){ //this really is a browser refresh event
        gf.jwt_bearer_token = ipCookie('token');
        gf.expires = ipCookie('token_expire');
        return true;
      }
      else{ //no current token, cookie token has expired - user must login
        ipCookie.remove();
        $location.path('/login');
        // return false;
      }
    }
    else{ // hasn't logged in before
      $location.path('/login');
      // return false;
    }
  };

  gf.logout = function(){
    var cookies = ipCookie();
    console.log('cookies: ', cookies);
    for(var ck in cookies){
      console.log('ck', ck);
      ipCookie.remove(ck);
    }
    $rootScope.accesstoken = '';
    $location.path('/').replace();
  };

  gf.reset_password = function()
  {
    gf.cur_path = "/" + window.location.pathname.split('/')[1];
    $location.path('/password_reset');
  }

  return gf;
});
