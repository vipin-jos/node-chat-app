const moment = require('moment');
//momentjs.com

var date = new moment();
console.log(date.format());
console.log(date.format('MMM'));
console.log(date.format('DD MMM, YYYY'));
console.log(date.format('LLLL'));
console.log(date.format('MMMM Do YYYY, h:mm:ss a'));

// Manipulate
date.add(1,'years');
console.log(date.format('LLLL'));

date.add(2,'years').subtract(9,'months');
console.log(date.format('LLLL'));

// // Relative to Unix Epoch - Jan 1 1970 00:00:00 am

// var date = new Date();
// console.log(date.getMonth());

var now = new moment();
console.log(now.format('hh:mm a'))


var someTimestamp = moment().valueOf();
console.log(someTimestamp);