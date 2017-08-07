apanaApp.controller('loginController', function($location, $scope, $rootScope, $filter, $http, ipCookie, globalFactory){

    ////////////////////////////////////////////////////////////////////////////
    // Initialize Variables

    var get_auth_return, get_customer, absolute_url, _split1, url_split2, url_prefix, jwt_bearer_token, handle_api_auth_results, initialize_language, abu, auth_params, route_params, cookie_lang, page_load;
    abu = globalFactory.api_base_url_version;
    $scope.messages = [];
    $scope.page_title = 'Login'
    $scope.languages = globalFactory.languages;
    $scope.show_password_email_message = false;

    /////////////////////////////////////////
    // get oauth access token
    $scope.login_oauth2 = function() {
      // console.log('login_oauth2 firing off');
    	var client_id;
      if(url_split3 == 'vagrant.apana.us'){
        client_id = globalFactory.google_client_id_local_dev;
      }
      else{
        client_id = globalFactory.google_client_id_cloud_dev;
      }

    	var scope="email";
    	var redirect_uri=globalFactory.redirect_uri;
    	var response_type="token";
    	var url="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+
    	"&response_type="+response_type;
    	window.location.replace(url);
    };

    $scope.login_upw = function(){
      //$scope.username and $scope.password sent to auth route, and either returns 403 unauthorized or JWT bearer token
      // console.log('login_upw firing off');
      auth_params = globalFactory.auth_params;
      auth_params.grant_type = 'password';
      auth_params.username = $scope.username;
      auth_params.password = $scope.password;

      $http({
        method  : "POST",
        url     : globalFactory.api_base_url + 'oauth2/token',
        data    : auth_params,
        headers : globalFactory.api_headers
      }).then(
        function(response){
          // console.log('login_upw success', response);
          handle_api_auth_results('success', response.data);
        },
        function(error){
          // console.error('login_upw error', error);
          handle_api_auth_results('error', error);
        }
      );
    };

      get_oauth2_return = function(){
        if($rootScope.accesstoken){ // this is a return from login_oauth2
          $scope.show_auth_result = true;
          $scope.oauth_return = $rootScope.accesstoken;

          abu = globalFactory.api_base_url_version;

          auth_params = globalFactory.auth_params;
          auth_params.grant_type = 'google';
          auth_params.bearer_token = $scope.oauth_return.access_token;

          // console.log('auth_params: ', auth_params);

          $http({
            method  : "POST",
            url     : globalFactory.api_base_url + 'oauth2/token',
            data    : auth_params,
            headers : globalFactory.api_headers
          }).then(
            function(response){
              // console.log('http response',response);
              handle_api_auth_results('success', response.data);
            },
            function(error){
              // console.log('http error', error);
              handle_api_auth_results('error', error);
            }
          );
        }
      };

      handle_api_auth_results = function(type, resp_obj){ //type means, success or error
        if(type == 'success'){
          console.log('resp_obj', resp_obj);
          globalFactory.jwt_bearer_token = resp_obj.access_token;
          globalFactory.user = {id: resp_obj.user_id, email: resp_obj.email};
          globalFactory.expires = moment().add(resp_obj.expires_in, 'seconds');
          globalFactory.refresh_token = resp_obj.refresh_token;
          globalFactory.token_type = resp_obj.token_type;
          ipCookie('page_load_cookies', 'nope'); // forces the siteFactory cookies to reevaluate from scratch
          ipCookie('token', resp_obj.access_token);
          ipCookie('token_expire', globalFactory.expires.toString());
          console.log('handle_api_auth_results ipCookie(route_params_site_id): ', ipCookie('route_params_site_id'));
          globalFactory.establish_menu(); // filters excluded header menu items
          if(ipCookie('route_params_site_id'))
          {
            $location.path("/usage");
          }
          else
          {
            $location.path("/site_list");
          }
        }
        else{
          $scope.messages = [{
            msg: $filter('translate')("LOGIN_ALERT_NO_LOGIN"),
            type: 'danger'
          }];
        }
      };

      $scope.forgot_password = function()
      {
        if(! $scope.username)
        {
          $scope.username_warning = true;
          // var elem = 'username';
          // elem.focus();
        }
        else {
          $scope.username_warning = false;
          var recovery_params = {
            username: $scope.username,
            client_id: 'apana-angular-client',
            client_secret: 'pai`Cuogh7',
            domain: globalFactory.domain
          };

          $http({
            method  : "POST",
            url     : abu + 'user/sendrecovery',
            data    : recovery_params,
            headers : globalFactory.api_headers
          }).then(
            function(response){
              console.log('http response',response);

              $scope.show_password_email_message = true;
              $scope.show_password_email_failure = false;
            },
            function(error){
              console.log('http error', error);
              $scope.show_password_email_message = false;
              $scope.show_password_email_failure = true;


            }
          );
        }
      };

      ////////////////////////////////////////////////////////////////////////////
      // functions to run on page load

      page_load = function()
      {
        var domain = $location.host();
        globalFactory.domain = domain.substr(domain.indexOf('://') + 1, 1000); //needed for forgot password send email route
        get_oauth2_return();
      }

      page_load();

});
