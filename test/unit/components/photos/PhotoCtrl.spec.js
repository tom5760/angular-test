'use strict';

describe('photos.PhotoCtrl', function () {

  // Load the controller's module
  beforeEach(module('test.photos'));

  var PhotoCtrl;
  var scope;
  var photoDeferred;
  var MockPhotoService;
  var $log;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($q, $controller, $rootScope, _$log_) {
    scope = $rootScope.$new();

    photoDeferred = $q.defer();

    MockPhotoService = jasmine.createSpyObj('PhotoService', ['getPhotos']);
    MockPhotoService.getPhotos.andReturn(photoDeferred.promise);

    PhotoCtrl = $controller('PhotoCtrl', {
      $scope: scope,
      PhotoService: MockPhotoService
    });

    // Injector ignores leading and trailing underscores.  This is so that we
    // can directly store a reference to this service with the same name.
    $log = _$log_;
  }));

  it('should initially be in the loading state', function () {
    expect(scope.loading).toBe(true);
  });

  it('should stop loading if PhotoService resolves', function () {
    photoDeferred.resolve();
    scope.$digest();
    expect(scope.loading).toBe(false);
  });

  it('should stop loading if PhotoService rejects', function () {
    photoDeferred.reject();
    scope.$digest();
    expect(scope.loading).toBe(false);
  });

  it('should store the returned photos on the scope', function () {
    var photos = ['foo', 'bar', 'baz'];
    photoDeferred.resolve(photos);
    scope.$digest();
    expect(scope.photos).toEqual(photos);
  });

  it('should log an error if PhotoService rejects', function () {
    expect($log.error.logs.length).toBe(0);
    photoDeferred.reject();
    scope.$digest();
    expect($log.error.logs.length).toBe(1);
  });
});
