'use strict';
angular.module('mean.system').controller('CategoryConfigsController', ['$scope', '$rootScope', '$location', '$http', 'Global', 'Menus', 'ProductCategoryLists', 'ConfigService',
function($scope, $rootScope, $location, $http, Global, Menus, ProductCategoryLists, ConfigService) {
	$scope.categoryList = null;
	$scope.quantity = 1;
	$scope.findProductCategory = function() {
		$scope.defaultCategory = '54634e05a92d436556ae189a';
		ProductCategoryLists.query(function(productCategory) {
			$scope.categoryList = productCategory;
		});
	};

	$scope.selection = [];
	// toggle selection for a given category by id
	$scope.toggleSelection = function toggleSelection(categoryId) {
		var idx = $scope.selection.indexOf(categoryId);
		// is currently selected
		if (idx > -1) {
			$scope.selection.splice(idx, 1);
		}
		// is newly selected
		else {
			$scope.selection.push(categoryId);
		}
	};

	$scope.updateConfigs = function updateConfigs() {
		ConfigService.query({
			name : 'cat_slider'
		}, function(configs) {
			configs[0].value.categories = $scope.selection;
			configs[0].value.products_quantity = $scope.quantity;
			$http.put('/configs/' + configs[0]._id, configs[0]).success(function(response) {
				$location.url('/');
			});
		});
	};

}]).controller('PromotionsController', ['$scope', '$rootScope', '$location', '$http', 'Global', 'Menus', 'ConfigService','OfferService',
function($scope, $rootScope, $location, $http, Global, Menus, ConfigService, OfferService) {
	$scope.quantity = 1;
	$scope.selection = [];
	$scope.offers = [];
	$scope.images = [];
	$scope.offerImages = null;

	// toggle selection for a given offer by id
	$scope.toggleSelection = function toggleSelection(offerId) {
		var idx = $scope.selection.indexOf(offerId);
		// is currently selected
		if (idx > -1) {
			$scope.selection.splice(idx, 1);
		}
		// is newly selected
		else {
			$scope.selection.push(offerId);
		}
	};

	$scope.updatePromotions = function updatePromotions() {
		ConfigService.query({
			name : 'offer_zone'
		}, function(configs) {
			console.log(configs);
			configs[0].value.offers = $scope.selection;
			configs[0].value.offer_quantity = $scope.quantity;
			$http.put('/configs/' + configs[0]._id, configs[0]).success(function(response) {
				$location.url('/');
			});
		});
	};

	$scope.addNewOffer = function addNewOffer() {
		console.log($scope.images);
		console.log('printed scope images');
		if(typeof $scope.images[0] !== 'undefined'){
          $scope.offerImages =
            {
              name: $scope.images[0].name,
              src: $scope.images[0].src,
              size: $scope.images[0].size,
              type: $scope.images[0].type,
              created: Date.now()
            };
        } else {
          $scope.images = [];
        }
		
		
		var offer = new OfferService({
			title : this.title,
			images: $scope.offerImages,
			link : this.link,
			html : this.html
		});

		this.title = '';
		this.link = '';
		this.html = '';
		
		console.log(offer);
		
		$http.post('/offers/', offer).success(function(response) {
					$scope.offers.push(response);
				});
		
	};

	$scope.getOffers = function getOffers() {
		OfferService.query({offerList:null},function(savedOffers) {
			$scope.offers = savedOffers;
		});
	};
	
    $scope.uploadFileCallback = function(file) {
    $scope.errorMessages = [];
       console.log('length images'+ $scope.images.length);


      if ($scope.images.length === 0 && file.type.indexOf('image') !== -1) {
          $scope.errorMessages = '' ;
          $scope.images.push(file);
          $scope.addSlide(file.src);
          }
      else if ($scope.images.length === 1 && file.type.indexOf('image') !== -1) {
          $scope.errorMessages.push('More Than One Image Not Allowed');
          } else {
            $scope.errorMessages.push('File Type Not Allowed');
           //  $scope.images=[];
                  }

   console.log('length images at exit'+ $scope.images.length);
   console.log($scope.images);
    };	
    
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function(url) {
// var newWidth = 600 + slides.length;
       slides.push({
         image: url
       });
    };
    
    $scope.deleteImage = function() {
      $scope.images = [];
      $scope.errorMessages = ' ' ;
     $scope.slides = [];
     };    

}]);
