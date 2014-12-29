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

        if (scope.modal.itemData)
          scope.thisSet = scope.modal.itemData;

        if (scope.modal.isNew)
          scope.isNew = true;

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
                del.call();
              });
            };
          }
        },

        edit: function(callback, thisSet, editModalType) {

          /**
           * Open a creation modal
           *
           */


          callback = callback || angular.noop;

          return function() {
            var args = Array.prototype.slice.call(arguments),
                editModal,
                modalTitle,
                isNew = false,                // when we're creating a new set vs editing an existing one
                primaryButtonLabel;

            switch (editModalType) {
              case 'create':
                primaryButtonLabel = 'Create';
                modalTitle = 'Create new set';
                isNew = true;
                break;
              case 'edit':
                thisSet = args[0];
                thisSet.id = args[0]._id;
                primaryButtonLabel = 'Save';
                modalTitle = 'Edit set';
                break;
              default:
                break;
            }

            editModal = openModal({
              modal: {
                dismissable: true,
                title: modalTitle,
                template: 'components/modal/editModal/editModal.html',
                controller: './editModal/EditModalCtrl',
                size: 'lg',
                isNew: isNew,
                itemData: thisSet,
                buttons: [{
                  classes: 'btn-success',
                  text: primaryButtonLabel,
                  enabled: false,
                  click: function(e) {
                    editModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  enabled: true,
                  click: function(e) {
                    $rootScope.$broadcast('refreshSetList');
                    editModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-default');



            editModal.result.then(function(event) {
              callback.apply();
            });
          };
        }

      };
    });
