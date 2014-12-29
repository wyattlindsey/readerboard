'use strict';
var _ = require('lodash');

//describe('Letters View', function() {
//
//});
//
describe('Create Modal main controls', function() {

  var characterInput = element(by.model('newLetter.character'));
  var qtyInput = element(by.model('newLetter.qty'));
  var addLetterButton = element(by.buttonText('Add letter'));

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

  it('should only activate Add button when there is valid input', function() {
    expect(addLetterButton.isEnabled()).toEqual(false);
    characterInput.sendKeys('a');
    expect(addLetterButton.isEnabled()).toEqual(true);
    characterInput.sendKeys('\t');
    qtyInput.sendKeys('2');
    addLetterButton.click();
    characterInput.sendKeys('a');
    expect(addLetterButton.isEnabled()).toEqual(false);
  });

});

describe('Create Modal availability list', function() {
  var characterInput = element(by.model('newLetter.character'));
  var qtyInput = element(by.model('newLetter.qty'));
  var addLetterButton = element(by.buttonText('Add letter'));
  var letterAvailabilityList = element.all(by.repeater('letter in thisSet'));
  var setItem = element.all(by.css('.set-item'));
  var trashIcon = element.all(by.css('.set-item .trash-icon'));
  var createButton = element.all(by.buttonText('Create'));


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
        mouseMove((setItem).last()).
        perform();
    element(by.repeater('letter in thisSet').row(1)).$('.trash-icon').click();
    expect(letterAvailabilityList.getText()).toEqual(['a\n2']);
  });

  it('should show trash can for any item when not editing', function() {
    browser.actions().
      mouseMove((setItem).first()).
      perform();
    expect((trashIcon).first().isDisplayed()).toBeTruthy();
    browser.actions().
        mouseMove((setItem).last()).
        perform();
    expect((trashIcon).last().isDisplayed()).toBeTruthy();
  });

  it('should not show trash can when editing, except for the item being edited', function() {
    browser.actions().
        mouseMove(element.all(by.css('.set-item .list-character')).first()).
        perform();
    browser.actions().click().perform();
    browser.actions().
        mouseMove(setItem.first()).
        perform();
    expect(trashIcon.first().isDisplayed()).toBeTruthy();
    browser.actions().
        mouseMove((setItem).last()).
        perform();
    expect(trashIcon.last().isDisplayed()).toBeFalsy();
  });

  it('should make the Create button disabled if there are no items in the set', function() {
    expect(createButton.isEnabled()).toEqual([true]);

    browser.actions().
        mouseMove(setItem.first()).
        perform();
    element(by.repeater('letter in thisSet').row(0)).$('.trash-icon').click();

    browser.actions().
        mouseMove(setItem.first()).
        perform();
    element(by.repeater('letter in thisSet').row(0)).$('.trash-icon').click();

    expect(createButton.isEnabled()).toEqual([false]);
  });

});

describe('Letter set list functions', function() {

//  var characterInput = element.all(by.model('newLetter.character'));
//  var title = element.all(by.css('letter-set-title'));
//  var qtyInput = element.all(by.model('newLetter.qty'));
//  var titleInput = element.all(by.css('editable-input'));
//  var okButton = element.all(by.css('glyphicon-ok'));
//  var addLetterButton = element(by.buttonText('Add letter'));
//  var createButton = element.all(by.buttonText('Create'));
//  var listOfSets = element.all(by.repeater('set in sets'));
//
//
//
//  beforeEach(function() {
//    browser.get('/letters');
//    element(by.buttonText('Create new set')).click();
//    characterInput.sendKeys('a');
//    characterInput.sendKeys('\t');
//    qtyInput.sendKeys('2');
//    addLetterButton.click();
//    characterInput.sendKeys('b');
//    characterInput.sendKeys('\t');
//    qtyInput.sendKeys('3');
//    addLetterButton.click();
//
//  });

//  it('should add new set to list of sets', function() {
//    listOfSets.count().then(function(originalCount) {
//      var startCount = originalCount;
//      createButton.click();
//      expect(listOfSets.count()).toEqual(startCount + 1);
//    });
//  });

  it('should name the set after the name entered in the modal', function() {
//    expect(title.getAttribute('value')).toEqual('untitled');
//    okButton.click();

  });

});