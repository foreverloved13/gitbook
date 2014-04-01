define([
    "lodash",
    "jQuery",
    "utils/storage"
], function(_, $, storage) {
    // Get current level
    var getCurrentLevel = function() {
        return $(".book").data("level");
    };

    // Return all levels
    var getLevels = function() {
        var levels = $(".book-summary li[data-level]");
        return _.map(levels, function(level) {
            return $(level).data("level");
        });
    };

    // Return a map chapter -> number (timestamp)
    var getProgress = function() {
        // Current level
        var progress = storage.get("progress", {});

        // Levels
        var levels = getLevels();

        _.each(levels, function(level) {
            progress[level] = progress[level] || 0;
        });

        return progress;
    };

    // Change value of progress for a level
    var markProgress = function(level, state) {
        if (state == null) state = true;

        var progress = getProgress();
        progress[level] = state? Date.now() : 0;
    };

    // Show progress
    var showProgress = function() {
        var progress = getProgress();
        var $summary = $(".book-summary");

        _.each(progress, function(value, level) {
            $summary.find("li[data-level='"+level+"']").toggleClass("done", value > 0);
        });
    };

    return {
        'current': getCurrentLevel,
        'levels': getLevels,
        'get': getProgress,
        'mark': markProgress,
        'show': showProgress
    };
});