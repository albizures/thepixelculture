'use strict';
const fs = require('fs'),
			path = require('path');

const gulp = require('gulp'),
			util = require('gulp-util'),
			jeditor = require('gulp-json-editor');


gulp.task('post', (cb) => {
	console.log('create post',util.env.name);
	let jsonPost = path.join(__dirname,'src','posts','_data.json');
	let filePost = path.join(__dirname,'src','posts',util.env.name + '.md');
	let json = JSON.parse(fs.readFileSync(jsonPost, "utf8"));

	json[util.env.name] = { title : util.env.name.replace('-', ' ')}

	fs.writeFile(jsonPost,JSON.stringify(json,null, "\t"));

	fs.writeFile(filePost, util.env.name, cb);
});

gulp.task('page', () => {
	console.log('create page');
});
