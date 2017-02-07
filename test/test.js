var assert = require('chai').assert;
var path = require('path');
var snapshot = require('../index.js');

describe('snapshot', function() {
    //--------------capture--------------------->
    it('.capture', function() {
        var url = "http://www.lianshang.com";
        var outfile = path.resolve('snapshot', 'snapshot.png');
        return snapshot
            .capture(url, outfile)
            .then(function(data) {
                console.log('\t' + JSON.stringify(data));
            })
            .catch(function() {
                console.log("失败");
                assert.equal(false, true);
            });
    });
});