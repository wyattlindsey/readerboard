'use strict';
var _ = require('lodash');

describe('Main View', function() {

});

describe('Letter supply display', function() {
  var input = element(by.model('textInput'));
  var letterSupply = element(by.binding('readerBoardLetter.available'));

  beforeEach(function() {
    browser.get('/');
  });

  it('should decrement and increment letters as they are used and released', function() {
    input.sendKeys('aa');
    var avail = letterSupply.getText();
    expect(avail).toEqual('  4');
    input.clear();
    avail = letterSupply.getText();
    expect(avail).toEqual('  6');
  });

});

describe('Input and \'no more\' box', function() {
  var input = element(by.model('textInput'));
  var noMoreList = element.all(by.repeater('noMoreLetter in noMoreLetters'));

  beforeEach(function() {
    browser.get('/');
  });

  it('should show a letter is out in the \'no more\' box', function() {
    input.sendKeys('aaaaaaa');
    expect(noMoreList.getText()).toEqual(['A']);
  });

  it('should show multiple letters in the \'no more\' box with correct comma placement', function() {
    input.sendKeys('aaaaaaacccccccddddddd');
    expect(noMoreList.getText()).toEqual([ 'A ,', 'C ,', 'D' ]);
  });
});

describe('Input and Preview windows', function() {
  var input = element(by.model('textInput'));
  var preview = element(by.model('readerBoardText'));

  beforeEach(function() {
    browser.get('/');
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

  it('should not include letters in the preview if there are no more left', function() {
    input.sendKeys('aaaaaaa');  // only 6 in the set, but 7 entered
    var value = preview.getAttribute('value');
    expect(value).toBe('AAAAAA'); // should only have 6
  });

});


