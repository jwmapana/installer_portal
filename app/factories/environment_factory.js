apanaApp.factory('environmentFactory', function(){
  ef = {};

  ef.google_client_id_local_dev = '966850093313-6po09nbe9adflkch52u6a2r8spjrb5o5.apps.googleusercontent.com';
  ef.google_client_id_cloud_dev = '966850093313-qtbl1hftldk02oopto3le3b4dm6irb50.apps.googleusercontent.com';

  ///////////////////////
  /////// Mock Dev backend
  // ef.api_base_url = 'http://admin-vagrant.apana.us:3000/';
  ef.api_base_url = 'https://admin-api-dev3.apana.us/v1/';

  /////// AWS dev backend
  // ef.api_base_url = 'https://site-api-dev3.apana.us/v1/';
  // ef.api_base_url_auth = 'https://site-api-dev3.apana.us/';
  ef.api_base_url_auth = 'https://admin-api-dev3.apana.us/';

  // ef.old_admin_base_url = 'https://wd.apana.us/admin/';
  ef.old_admin_base_url = 'https://dev3.apana.us/admin/';

  ef.auth_params = {
    client_id: 'apana-angular-client',
    client_secret: 'pai`Cuogh7'
  };

  return ef;
});
