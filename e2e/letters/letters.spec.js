'use strict';
var _ = require('lodash');

describe('Letters View', function() {

});

describe('Create Modal', function() {

  var characterInput = element(by.model('newLetter.character'));
  var qtyInput = element(by.model('newLetter.qty'));
  var addLetterButton = element(by.buttonText('add letter'));
  var letterAvailabilityList = element.all(by.repeater('letter in letters'));

  beforeEach(function() {
    browser.get('/letters');
    element(by.buttonText('Create new set')).click();
  });

  it('should have the default character be blank', function() {
    expect(characterInput.getAttribute('value')).toEqual('');
  });

  it('should only allow one character at a time', function() {
    characterInput.sendKeys('aa');
    expect(characterInput.getAttribute('value')).toEqual('a');
  });

  it('should use the last character entered', function() {
    characterInput.sendKeys('ab');
    expect(characterInput.getAttribute('value')).toEqual('b');
  });

  it('should have the default quantity of 1', function() {
    expect(qtyInput.getAttribute('value')).toEqual('1');
  });

  it('should change quantities over 100 to 99', function() {
    qtyInput.sendKeys('500');
    expect(qtyInput.getAttribute('value')).toEqual('99');
  });

  it('should add newly created letters to the list', function() {
    characterInput.sendKeys('a');
    characterInput.sendKeys('\t');
    qtyInput.sendKeys('2');
    addLetterButton.click();
    characterInput.sendKeys('b');
    characterInput.sendKeys('\t');
    qtyInput.sendKeys('3');
    addLetterButton.click();
    expect(letterAvailabilityList.getText()).toEqual(['a\n2','b\n3']);
  });

  it('should not allow duplicates', function() {
    characterInput.sendKeys('a');
    characterInput.sendKeys('\t');
    qtyInput.sendKeys('2');
    addLetterButton.click();
    expect(characterInput.getAttribute('value')).toEqual('');
  });

});