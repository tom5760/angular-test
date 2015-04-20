'use strict';

angular.module('test.photos')
  .controller('PhotoCtrl', function ($log, PhotoService) {

    var self = this;

    this.loading = true;

    PhotoService.getPhotos()
      .then(function (photos) {
        self.photos = photos;
      }, function (error) {
        $log.error('Failed to get photos', error);
      })
      .finally(function () {
        self.loading = false;
      });
  });
