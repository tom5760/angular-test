'use strict';

angular.module('test.model')
  .service('PhotoService', function ($q, $timeout) {

    /*** PRIVATE MEMBERS ***/

    var DELAY = 1500;

    var photos = [{
      id: 0,
      name: 'Turkish Van Cat',
      url: 'http://upload.wikimedia.org/wikipedia/commons/2/22/Turkish_Van_Cat.jpg'
    }, {
      id: 1,
      name: 'Gaia Basenji',
      url: 'http://upload.wikimedia.org/wikipedia/commons/1/13/Gaia_Basenji.jpg'
    }, {
      id: 2,
      name: 'Red Milk Snake',
      url: 'http://upload.wikimedia.org/wikipedia/commons/a/aa/Red_milk_snake.JPG'
    }];

    /*** PUBLIC METHODS ***/

    this.getPhotos = function () {
      // Use a promise to simulate a server request.
      var deferred = $q.defer();

      $timeout(function () {
        deferred.resolve(photos);
      }, DELAY);

      return deferred.promise;
    };
  });
