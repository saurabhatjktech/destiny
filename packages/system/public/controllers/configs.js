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

}]).controller('PromotionsController', ['$scope', '$rootScope', '$location', '$http', 'Global', 'Offers', 'Menus', 'ConfigService',
function($scope, $rootScope, $location, $http, Global, Offers, Menus, ConfigService) {
	$scope.quantity = 1;
	$scope.selection = [];
	$scope.offers = [];

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
		var offer = new Offers({
			title : this.title,
			image : this.image,
			link : this.link,
			html : this.html
		});
		
		this.title = '';
        this.image = '';
        this.link = '';
        this.html = '';
		
		$http.post('/offers/', offer).success(function(response) {
			$scope.offers.push(response);
		});
	};

	$scope.getOffers = function getOffers() {
		$http.get('/offers/').success(function(response) {
			$scope.offers = response;
		});
	};

}]);
