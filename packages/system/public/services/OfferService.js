'use strict';

//Offer service used for offer's REST endpoint
angular.module('mean.products').factory('Offers', ['$resource',
  function($resource) {
    return $resource('offers/:offerId', {
      productId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);




