module.exports = function(app){
    var Filters = Object.getPrototypeOf(app).Filters = new app.Component("filters");
    //Filters.debug = true;
    Filters.createdAt      = "2.0.0";
    Filters.lastUpdate     = "2.7.0";
    Filters.version        = "1.1.0";
    // Filters.factoryExclude = true;
    // Filters.loadingMsg     = "This message will display in the console when component will be loaded.";
    // Filters.requires       = [];

    Filters.prototype.onCreate = function(){
        var filters = this;
        filters.$filters = filters.$el.find('.filter');
        filters.$container = $(filters.getData('container'));
        filters.$items = filters.$container.find(filters.getData('items'));
        filters.blnAutocomplete = (filters.blnAutocomplete !== undefined) ? filters.blnAutocomplete : filters.getData('autocomplete',false);
        filters.submit          = (filters.submit !== undefined)          ? filters.submit          : filters.getData('submit',false);
        filters.blnReset        = (filters.blnReset !== undefined)        ? filters.blnReset        : filters.getData('reset',false);

        if (filters.blnReset) {
            filters.$el.append('<span class="filters__reset"><i class="fa fa-times"></i></span>');
            $('.filters__reset').on('click',function(){
                filters.$filters.val('').trigger('change');
            });
        }
        if (filters.blnAutocomplete) {
            filters.$filters.each(function(i,filter){
                if (filter.nodeName == 'SELECT') {
                    if ($(filter).attr('data-label') != '')
                        $(filter).prepend('<option value="">'+$(filter).attr('data-label')+'</option>');
                    var arrFilters = [];
                    filters.$items.each(function(){
                        if($(this).attr('data-'+$(filter).attr('data-filter')))
                            arrFilters.push($(this).attr('data-'+$(filter).attr('data-filter')));
                    });
                    arrFilters = [ ...new Set(arrFilters.sort())];
                    $.each(arrFilters,function(){
                        $(filter).append('<option value="'+this+'">'+this+'</option>')
                    });
                    $(filter).trigger('change');
                }
            });
        }
        if (filters.submit && filters.$el.closest('form').length) {
            filters.$filters.filter('select').on('change',function(e){
                if (filters.$el.closest('form').length){
                    filters.$el.closest('form').trigger('submit');
                    return false
                }
            });
        } else {
            filters.$filters.on('change keyup',function(e){
                // console.log('filter change');
                filters.$items.removeClass('hidden');
                filters.$filters.each(function(i,filter){
                    var $filter = $(filter);
                    var target = $filter.attr('data-filter');
                    var value = $filter.val();
                    if (value != ""){
                        if (filter.nodeName == 'SELECT')
                            filters.$items.not('[data-'+target+'="'+value+'"]').addClass('hidden');
                        if (filter.nodeName == 'INPUT' && filter.getAttribute('type') == 'text')
                            filters.$items.not('[data-'+target+'*="'+value.toLowerCase()+'"]').addClass('hidden');
                    }
                });
            });
        }

    }
    return Filters;
}