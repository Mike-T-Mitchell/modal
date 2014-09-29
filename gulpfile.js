'use strict';

var fs = require('fs');
var dir = './tasks/';
var tasks = fs.readdirSync(dir);

// load gulp tasks from directory
tasks.forEach(function (task) {
    require(dir + task);
});