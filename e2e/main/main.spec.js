'use strict';

describe('Main View', function() {
  var page;

  var input = element(by.model('textInput'));
  var preview = element(by.model('readerBoardText'));

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po');
  });

  it('should allow text input', function() {
    input.sendKeys('abc');
    var value = input.getAttribute('value');
    expect(value).toBe('abc');
  });

  it('should coordinate text input and readerboard preview', function() {
    input.sendKeys('ABC');
    var value = preview.getAttribute('value');
    expect(value).toBe('ABC');
  });

  it('should not print characters outside of those in the set', function() {
    input.sendKeys('ü');
    var value = preview.getAttribute('value');
    expect(value).toBe('');
  });

  it('should capitalize lower case characters over in the preview window', function() {
    input.sendKeys('abc');
    var value = preview.getAttribute('value');
    expect(value).toBe('ABC');
  });


});
