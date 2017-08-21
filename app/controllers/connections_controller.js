apanaApp.controller('connectionsController', function($scope, $interval, $timeout, $sce, globalFactory, connectionsFactory){
  /////////////////////////////////////////////////////////////////////
  // check auth status and if not authorized, redirect to login page
  globalFactory.check_auth();

  //////////////////////////////////////////////////////////////////////
  // initialize Variables
  var get_sites, page_load, clear_messages, refresh_connections;

  $scope.cn = {};
  $scope.cn.site_select = {gateways: [], pucks: []};
  $scope.header = {messages: []};

  //////////////////////////////////////////////////////////////////////
  // controller functions

  get_sites = function(){
    connectionsFactory.get_sites()
    .then(function(response){
      $scope.cn.sites = response.data;
    })
    .catch(function(error){
      console.error('error getting sites: ', error);
      $scope.header.messages.push({
        type: 'danger',
        msg: 'Server error: can\'t get site list'
      });
    });
  };

  $scope.choose_site = function(){
    // console.log('$scope.cn.site', $scope.cn.site_id);

    for(var x=0, y=$scope.cn.sites.length; x<y; x++){
      var st = $scope.cn.sites[x];
      if(st.site_id == $scope.cn.site_id){
        $scope.site_select = angular.copy(st);
        break;
      }
    }

    var msg_a = $scope.site_select.site_name;
    var msg_b = $scope.site_select.site_address + ' ';
    msg_b += $scope.site_select.site_city + ' ';
    msg_b += $scope.site_select.site_state + ' ';
    msg_b += $scope.site_select.site_postalcode + '';

    $scope.header.notices = [{
      type: 'success',
      msg: msg_a,
      'msg_b': msg_b
    }];
    clear_messages();


    // connectionsFactory.get_site_status($scope.cn.site_id)
    // .then(function(response){
    //   $scope.cn.site_select = response.data;
    //   // console.log('$scope.cn.site_select', $scope.cn.site_select);
    //   if($scope.cn.site_select.gateways.length >0){
    //     $scope.choose_gateway($scope.cn.site_select.gateways[0], 0);
    //   }
    // })
    // .catch(function(error){
    //   console.error('error getting gateways: ', error);
    //   $scope.header.messages.push({
    //     type: 'danger',
    //     msg: 'Server error: can\'t get gateway list'
    //   });
    // });

    refresh_connections();
  };

  $scope.choose_gateway = function(gateway, index){
    $scope.cn.gateway_select = gateway;
    $scope.cn.gateway_select_index = index;
  };

  refresh_connections = function(){
    // console.log('$scope.cn.site_id', $scope.cn.site_id);
    if($scope.cn.site_id){
      connectionsFactory.get_site_status($scope.cn.site_id)
      .then(function(response){
        $scope.cn.site_select = response.data;
        // console.log('$scope.cn.site_select', $scope.cn.site_select);
        if($scope.cn.site_select.gateways.length >0){
          if(! $scope.cn.gateway_select_index)
          {
            $scope.choose_gateway($scope.cn.site_select.gateways[0], 0);
          }
          else{
            $scope.choose_gateway($scope.cn.site_select.gateways[$scope.cn.gateway_select_index], $scope.cn.gateway_select_index);
          }
        }
        if($scope.cn.site_select.pucks.length > 0){
          $scope.cn.site_select.pucks.forEach(function(pk,idx){
            pk.fresh = moment.duration(pk.stale_seconds, 'seconds').format('h:mm:ss');
          })
        }
      })
      .catch(function(error){
        console.error('error getting gateways: ', error);
        $scope.cn.site_select.gateways = [];
        $scope.cn.site_select.pucks = [];
        $scope.header.messages = [{
          type: 'danger',
          msg: 'Server error: can\'t get gateway list'
        }];
      });
    }
  };

  clear_messages = function()
  {
    $timeout( function(){
      $scope.header.messages = [];
      $scope.header.notices = [];
    }, 4000);
  };

  //////////////////////////////////////////////////////////////////////
  // page load functions

  page_load = function(){
    get_sites();
  };

  page_load();

  //////////////////////////////////////////////////////////////////////
  // $watch and interval functions

  $interval(function(){
    refresh_connections();
  }, 5000, 0, true);

});
