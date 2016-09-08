var Helper = {
    
    each: function(loopable, callback, self, reverse) {
        // Check to see if null or undefined firstly.
        var i, len;
        if (self.isArray(loopable)) {
            len = loopable.length;
            if (reverse) {
                for (i = len - 1; i >= 0; i--) {
                    callback.call(self, loopable[i], i);
                }
            } else {
                for (i = 0; i < len; i++) {
                    callback.call(self, loopable[i], i);
                }
            }
        } else if (typeof loopable === 'object') {
            var keys = Object.keys(loopable);
            len = keys.length;
            for (i = 0; i < len; i++) {
                callback.call(self, loopable[keys[i]], keys[i]);
            }
        }
    },

    // setDefaultConfig: function() {
    //     var self = this;

    //     if (self.defaultConfig == null || self.defaultConfig === undefined) {
    //         return;
    //     } else {
    //         self.lastConfig = self.merge(Chart._options, Chart);
    //         self.each(self.lastConfig, function(value, index) {
    //             // var prefixCfg = self.setPrefix(index);
    //             self.setValue(self.lastConfig[index], index);
    //         }, self);
    //     }
    // }

    setValue: function(value, key) {
        var self = this;
        self[key] = value;
    },

    setPrefix: function(config) {
        var constPrefix = '_';
        if (config) {
            return constPrefix + config;
        }
    },

    isEmpty: function(value) {
        return value === null || value === undefined;
    },

    isObject: function(object) {
        return !Util.isEmpty(object) && typeof(object) === 'object';
    },

    isArray: function(array) {
        return Array.isArray(array) || Object.prototype.toString.call(array) === '[object Array]';
    },

    isFunction: function(func) {
        return !Util.isEmpty(func) && typeof(func) === 'function';
    },

    merge: function(obj1,obj2){
        var obj3 = {};
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        return obj3;
    },

};

var Util = {
    isEmpty: function(value) {
        return value === null || value === undefined;
    },
};

module.exports = Helper;