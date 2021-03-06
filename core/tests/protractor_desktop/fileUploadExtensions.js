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
 * @fileoverview End-to-end tests for rich-text components involving file
 * upload.
 */

var forms = require('../protractor_utils/forms.js');
var general = require('../protractor_utils/general.js');
var users = require('../protractor_utils/users.js');
var workflow = require('../protractor_utils/workflow.js');
var waitFor = require('../protractor_utils/waitFor.js');

var ExplorationEditorPage =
  require('../protractor_utils/ExplorationEditorPage.js');
var ExplorationPlayerPage =
  require('../protractor_utils/ExplorationPlayerPage.js');

describe('rich-text components', function() {
  var explorationEditorPage = null;
  var explorationEditorMainTab = null;
  var explorationPlayerPage = null;

  beforeEach(function() {
    explorationEditorPage = new ExplorationEditorPage.ExplorationEditorPage();
    explorationEditorMainTab = explorationEditorPage.getMainTab();
    explorationPlayerPage = new ExplorationPlayerPage.ExplorationPlayerPage();
  });

  it('should display math expressions correctly', async function() {
    await users.createUser(
      'richTextuser@fileUploadExtensions.com',
      'fileUploadRichTextuser');
    await users.login('richTextuser@fileUploadExtensions.com');

    await workflow.createExploration();

    await explorationEditorMainTab.setContent(async function(richTextEditor) {
      await richTextEditor.appendBoldText('bold');
      await richTextEditor.appendPlainText(' This is a math expression');
      // TODO(Jacob): Add test for image RTE component.
      await richTextEditor.addRteComponent('Math', 'x^2 + y^2');
    });

    await explorationEditorPage.navigateToPreviewTab();

    await explorationPlayerPage.expectContentToMatch(
      async function(richTextChecker) {
        await richTextChecker.readBoldText('bold');
        await richTextChecker.readPlainText(' This is a math expression');
        await richTextChecker.readRteComponent('Math', 'x^2 + y^2');
      });

    await explorationEditorPage.discardChanges();
    await users.logout();
  });

  afterEach(async function() {
    await general.checkForConsoleErrors([
      // TODO(pranavsid98): This error is caused by the upgrade from Chrome 60
      // to Chrome 61. Chrome version at time of recording this is 61.0.3163.
      'chrome-extension://invalid/ - Failed to load resource: net::ERR_FAILED',
    ]);
  });
});
