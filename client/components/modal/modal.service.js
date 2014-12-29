'use strict';

angular.module('readerboardPlannerApp')
  .factory('Modal', function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';



      if (scope.modal.newSetData)
        scope.newSet = scope.modal.newSetData;
      if (scope.modal.itemData) {
        scope.itemData = scope.modal.itemData;
      }


      angular.extend(modalScope, scope);

      return $modal.open({
        windowClass: modalClass,
        templateUrl: scope.modal.template,
        size: scope.modal.size,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del, thisItem) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
              id = args[0]._id,
              name = args[0].title,
              deleteModal;

            thisItem.id = id;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                template: 'components/modal/modal.html',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                itemData: thisItem,
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function(event) {
              del.call(args[0]._id);
            });
          };
        }
      },

      create: function(createNewSet, newSet) {

        /**
         * Open a creation modal
         *
         */


        createNewSet = createNewSet || angular.noop;

        return function() {
          var createModal;

          createModal = openModal({
            modal: {
              dismissable: true,
              title: 'Create new set',
              template: 'components/modal/editor/createModal/createModal.html',
              controller: './editor/createModal/CreateModelCtrl',
              size: 'lg',
              newSetData: newSet,
              buttons: [{
                classes: 'btn-success',
                text: 'Create',
                enabled: false,
                click: function(e) {
                  createModal.close(e);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                enabled: true,
                click: function(e) {
                  createModal.dismiss(e);
                }
              }]
            }
          }, 'modal-default');



          createModal.result.then(function(event) {
            createNewSet.apply();
          });
        };
      },

      edit: function(editSet, thisSet) {

        /**
         * Open a creation modal
         *
         */


        editSet = editSet || angular.noop;

        return function() {
          var editModal;

          editModal = openModal({
            modal: {
              dismissable: true,
              title: 'Edit set',
              template: 'components/modal/editor/editModal/editModal.html',
              controller: './editor/editModal/EditModelCtrl',
              size: 'lg',
              newSetData: thisSet,
              buttons: [{
                classes: 'btn-success',
                text: 'Save',
                enabled: false,
                click: function(e) {
                  editModal.close(e);
                }
              }, {
                classes: 'btn-default',
                text: 'Cancel',
                enabled: true,
                click: function(e) {
                  editModal.dismiss(e);
                }
              }]
            }
          }, 'modal-default');



          editModal.result.then(function(event) {
            editSet.apply();
          });
        };
      }

    };
  });
