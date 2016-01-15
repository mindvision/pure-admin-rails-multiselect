// NOTE: Sprockets automatically searches any immediate descendant of the vendor/assets folder
// (eg: vendor/assets/*) so we simply need to require the JS file within the package.

//= require js/jquery.multi-select
//= require jquery.quicksearch
//= require_tree .

if (!PureAdmin) {
  console.error('You must load the PureAdmin JavaScript first before loading this JavaScript.');
}

PureAdmin.inputs.multiselect = {
  init: function(context) {
    var multiselectInputs = $('.pure-admin-multiselect:not(.initialised)', context);

    var downArrowKey = 40;
    var filterDelay = 0;

    multiselectInputs.each(function() {
      var input = $(this);
      input.addClass('initialised');

      /* The server has provided these elements but they are hidden and in the wrong place.
       * Using the _extractMarkup function, the markup of these elements is taken and later
       * passed to the multiSelect library.
       */
      var filterMarkup = _extractMarkup($('.pure-admin-multiselect-filter-input'));
      var selectableHeaderMarkup = _extractMarkup($('.pure-admin-multiselect-header.selectable'));
      var selectionHeaderMarkup = _extractMarkup($('.pure-admin-multiselect-header.selection'));

      var selectableFooterMarkup = _extractMarkup($('.pure-admin-multiselect-footer.selectable'));
      var selectionFooterMarkup = _extractMarkup($('.pure-admin-multiselect-footer.selection'));

      input.multiSelect({
        selectableHeader: selectableHeaderMarkup + filterMarkup,
        selectionHeader: selectionHeaderMarkup + filterMarkup,

        selectableFooter: selectableFooterMarkup,
        selectionFooter: selectionFooterMarkup,

        afterInit: function(){
          var msObj = this;

          var selectableFilterInput = msObj.$selectableUl.prev();
          var selectionFilterInput = msObj.$selectionUl.prev();

          var selectableElements = '#' + msObj.$container.attr('id') +
            ' .ms-elem-selectable:not(.ms-selected)';
          var selectionElements = '#' + msObj.$container.attr('id') +
            ' .ms-elem-selection.ms-selected';

          msObj.selectableFilter = selectableFilterInput.
            quicksearch(selectableElements, { delay: filterDelay });
          msObj.selectableFilter.on('keydown', function(e) {
            // If the down arrow key is pressed, highlight the first filtered option.
            if (e.which === downArrowKey){
              msObj.$selectableUl.focus();
              msObj.$selectableUl.find('li:visible').first().addClass('ms-hover');
              return false;
            }
          });

          msObj.selectionFilter = selectionFilterInput.quicksearch(selectionElements, { delay: filterDelay });
          msObj.selectionFilter.on('keydown', function(e) {
            // If the down arrow key is pressed, highlight the first filtered option.
            if (e.which === downArrowKey){
              msObj.$selectionUl.focus();
              msObj.$selectionUl.find('li:visible').first().addClass('ms-hover');
              return false;
            }
          });
        },

        afterSelect: function(){
          _cacheFilter(this);
        },

        afterDeselect: function(){
          _cacheFilter(this);
        }
      });

      $('.pure-admin-multiselect-footer .add-all').click(function(e) {
        e.preventDefault();
        input.multiSelect('select_all');
      });

      $('.pure-admin-multiselect-footer .remove-all').click(function(e) {
        e.preventDefault();
        input.multiSelect('deselect_all');
      });
    });

    function _cacheFilter(msObj) {
      msObj.selectableFilter.cache();
      msObj.selectionFilter.cache();
    }

    /*
     * Given an element on the page, this function removes the element, ensures it is visible
     * then returns the markup used to create it.
     */
    function _extractMarkup(el) {
      return $('<div>').append(el.remove().show()).html();
    }
  }
};

