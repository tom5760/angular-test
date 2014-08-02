'use strict';

describe('model.PhotoService', function () {

  // Load the service's module
  beforeEach(module('test.model'));

  var PhotoService;
  var $timeout;

  // Instantiate service
  beforeEach(inject(function (_$timeout_, _PhotoService_) {
    $timeout = _$timeout_;
    PhotoService = _PhotoService_;
  }));

  it('should return three photos when called', function () {
    var output;

    PhotoService.getPhotos().then(function (photos) {
      output = photos;
    });

    $timeout.flush();

    expect(output.length).toBe(3);
  });
});
