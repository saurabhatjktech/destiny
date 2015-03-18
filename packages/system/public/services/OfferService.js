'use strict';

//Offer service used for offer's REST endpoint
angular.module('mean.system').factory('Offers', ['$resource',
  function($resource) {
    return $resource('offers/',  {
      offerList: '@offerList'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);




