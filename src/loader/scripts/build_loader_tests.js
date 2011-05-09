#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    mods = {};

var json = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'js') + '/yui3.json'));

var wrapper = fs.readFileSync(__dirname + '/loader_template.js', 'utf8');

var testMod = function(v) {
    //Removes YUI core modules
    if ((v.indexOf('yui') === -1) && (v.indexOf('loader') === -1) && (v.indexOf('history') === -1)) {
        return true;
    }
    return false;
}

Object.keys(json).forEach(function(v) {
    if (testMod(v)) { //Removes YUI core modules
        mods[v] = 1;
        if (json[v].submodules) {
            Object.keys(json[v].submodules).forEach(function(k) {
                if (testMod(k)) { //Removes YUI core modules
                    mods[k] = 1;
                }
            });
        }
    }
});

var writeTest = function(key) {
    var str = '     "Testing local load ' + key + '": function(data) {\n';
    str += '            var p = path.join(__dirname, "../../../../");\n';
    str += '            var Y = yui3.configure({ debug: false, yuiPath: p }).useSync("' + key + '");\n';
    str += '            Assert.areEqual(Y.Env._missed.length, 0, "Modules found in Env._missed: " + JSON.stringify(Y.Env._missed));\n';
    str += '        }';
    return str;
};

var tests = [];

Object.keys(mods).forEach(function(k) {
    tests.push(writeTest(k));
});

var str = '{\n';
str += '    name: "Loader Tests",\n';
str += '    ' + tests.join(',\n'),
str += '    \n}';

wrapper = wrapper.replace('!!TESTCASE!!', str);

fs.writeFileSync(path.join(__dirname, '../', 'tests/cli') + '/loader.js', wrapper);
console.log(Object.keys(mods).length + ' tests written to: ./tests/cli/loader.js');
