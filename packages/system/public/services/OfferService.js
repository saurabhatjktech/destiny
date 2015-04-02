'use strict';

//Offer service used for offer's REST endpoint
angular.module('mean.system').factory('OfferService', ['$resource',
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




