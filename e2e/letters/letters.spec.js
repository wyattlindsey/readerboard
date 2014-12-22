'use strict';
var _ = require('lodash');

describe('Letters View', function() {

});

describe('Create Modal main controls', function() {

  var characterInput = element(by.model('newLetter.character'));
  var qtyInput = element(by.model('newLetter.qty'));
  var addLetterButton = element(by.buttonText('add letter'));

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
    expect(qtyInput.getAttribute('value')).toEqual('100');
  });



  it('should not allow duplicates', function() {
    characterInput.sendKeys('a');
    characterInput.sendKeys('\t');
    qtyInput.sendKeys('2');
    addLetterButton.click();
    expect(characterInput.getAttribute('value')).toEqual('');
  });



});

describe('Create Modal availability list', function() {
  var characterInput = element(by.model('newLetter.character'));
  var qtyInput = element(by.model('newLetter.qty'));
  var addLetterButton = element(by.buttonText('add letter'));
  var letterAvailabilityList = element.all(by.repeater('letter in newSet'));

  beforeEach(function() {
    browser.get('/letters');
    element(by.buttonText('Create new set')).click();
    characterInput.sendKeys('a');
    characterInput.sendKeys('\t');
    qtyInput.sendKeys('2');
    addLetterButton.click();
    characterInput.sendKeys('b');
    characterInput.sendKeys('\t');
    qtyInput.sendKeys('3');
    addLetterButton.click();
  });

  it('should add newly created letters to the list', function() {
    expect(letterAvailabilityList.getText()).toEqual(['a\n2','b\n3']);
  });

  it('should delete items from the list', function() {
    browser.actions().
        mouseMove(element.all(by.css('.set-item')).last()).
        perform();
    element(by.repeater('letter in newSet').row(1)).$('.trash-icon').click();
    expect(letterAvailabilityList.getText()).toEqual(['a\n2']);
  });

  it('should show trash can for any item when not editing', function() {
    browser.actions().
      mouseMove(element.all(by.css('.set-item')).first()).
      perform();
    expect(element.all(by.css('.set-item .trash-icon')).first().isDisplayed()).toBeTruthy();
    browser.actions().
        mouseMove(element.all(by.css('.set-item')).last()).
        perform();
    expect(element.all(by.css('.set-item .trash-icon')).last().isDisplayed()).toBeTruthy();
  });

  it('should not show trash can when editing, except for the item being edited', function() {
    browser.actions().
        mouseMove(element.all(by.css('.set-item .list-character')).first()).
        perform();
    browser.actions().click().perform();
    browser.actions().
        mouseMove(element.all(by.css('.set-item')).first()).
        perform();
    expect(element.all(by.css('.set-item .trash-icon')).first().isDisplayed()).toBeTruthy();
    browser.actions().
        mouseMove(element.all(by.css('.set-item')).last()).
        perform();
    expect(element.all(by.css('.set-item .trash-icon')).last().isDisplayed()).toBeFalsy();
  });

});