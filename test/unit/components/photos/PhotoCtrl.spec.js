'use strict';

describe('photos.PhotoCtrl', function () {

  // Load the controller's module
  beforeEach(module('test.photos'));

  var $rootScope,
      $log,
      PhotoCtrl;

  var photoDeferred;

  var MockPhotoService;

  // Initialize the controller
  beforeEach(inject(function ($q, $controller, _$rootScope_, _$log_) {
    photoDeferred = $q.defer();

    MockPhotoService = jasmine.createSpyObj('PhotoService', ['getPhotos']);
    MockPhotoService.getPhotos.andReturn(photoDeferred.promise);

    PhotoCtrl = $controller('PhotoCtrl', {
      PhotoService: MockPhotoService
    });

    // Injector ignores leading and trailing underscores.  This is so that we
    // can directly store a reference to this service with the same name.
    $rootScope = _$rootScope_;
    $log = _$log_;
  }));

  it('should initially be in the loading state', function () {
    expect(PhotoCtrl.loading).toBe(true);
  });

  it('should stop loading if PhotoService resolves', function () {
    photoDeferred.resolve();
    $rootScope.$digest();
    expect(PhotoCtrl.loading).toBe(false);
  });

  it('should stop loading if PhotoService rejects', function () {
    photoDeferred.reject();
    $rootScope.$digest();
    expect(PhotoCtrl.loading).toBe(false);
  });

  it('should store the returned photos on the instance', function () {
    var photos = ['foo', 'bar', 'baz'];
    photoDeferred.resolve(photos);
    $rootScope.$digest();
    expect(PhotoCtrl.photos).toEqual(photos);
  });

  it('should log an error if PhotoService rejects', function () {
    expect($log.error.logs.length).toBe(0);
    photoDeferred.reject();
    $rootScope.$digest();
    expect($log.error.logs.length).toBe(1);
  });
});
