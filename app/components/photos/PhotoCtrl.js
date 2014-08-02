'use strict';

angular.module('test.photos')
  .controller('PhotoCtrl', function ($scope, $log, PhotoService) {

    $scope.loading = true;
    PhotoService.getPhotos()
      .then(function (photos) {
        $scope.photos = photos;
      }, function (error) {
        $log.error('Failed to get photos', error);
      })
      .finally(function () {
        $scope.loading = false;
      });
  });
