module.exports = function(app){
    var Filters = Object.getPrototypeOf(app).Filters = new app.Component("filters");
    //Filters.debug = true;
    Filters.createdAt      = "2.0.0";
    Filters.lastUpdate     = "2.0.0";
    Filters.version        = "1";
    // Filters.factoryExclude = true;
    // Filters.loadingMsg     = "This message will display in the console when component will be loaded.";
    // Filters.requires       = [];

    // Filters.prototype.onCreate = function(){
    // do thing after element's creation
    // }
    return Filters;
}