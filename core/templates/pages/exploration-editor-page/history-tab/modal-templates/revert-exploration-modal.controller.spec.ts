// Copyright 2020 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Unit tests for RevertExplorationModalController.
 */

describe('Revert Exploration Modal Controller', function() {
  var $scope = null;
  var $uibModalInstance = null;
  var version = '1';
  var explorationId = 'exp1';

  beforeEach(angular.mock.module('oppia'));
  beforeEach(angular.mock.module(function($provide) {
    $provide.value('ExplorationDataService', {
      explorationId: explorationId
    });
  }));

  beforeEach(angular.mock.inject(function($injector, $controller) {
    var $rootScope = $injector.get('$rootScope');

    $uibModalInstance = jasmine.createSpyObj(
      '$uibModalInstance', ['close', 'dismiss']);

    $scope = $rootScope.$new();
    $controller('RevertExplorationModalController', {
      $scope: $scope,
      $uibModalInstance: $uibModalInstance,
      version: version
    });
  }));

  it('should init the variables', function() {
    expect($scope.version).toBe(version);
  });

  it('should get exploration url', function() {
    expect($scope.getExplorationUrl('0')).toBe('/explore/exp1?v=0');
    expect($scope.getExplorationUrl('1')).toBe('/explore/exp1?v=1');
    expect($scope.getExplorationUrl()).toBe('/explore/exp1?v=undefined');
  });
});
