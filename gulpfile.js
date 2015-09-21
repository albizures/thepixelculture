'use strict';
const fs = require('fs'),
			readline = require('readline'),
			path = require('path');

const gulp = require('gulp'),
			util = require('gulp-util'),
			jeditor = require('gulp-json-editor');

var question = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
	terminal: false
});


gulp.task('post', (cb) => {
	let post = {};
	let jsonTags = path.join(__dirname,'src','tags','_data.json');
	let tags = JSON.parse(fs.readFileSync(jsonTags, "utf8"));
	new Promise((res,rej) =>{
		question.question("name: ", function(name) {
			post.name = name;
			//question.close();
			res();
		})
	}).then(() => {
		return new Promise((res,rej) =>{
			question.question("tags: ", function(tags) {
				console.log(tags);
				post.tags = tags;
				question.close();
				res();
			});
		});
	});
	question.on('close',() => {
		let jsonPost = path.join(__dirname,'src','posts','_data.json');
		let jsonTags = path.join(__dirname,'src','tags','_data.json');
		let filePost = path.join(__dirname,'src','posts',post.name + '.md');
		let json = JSON.parse(fs.readFileSync(jsonPost, "utf8"));

		let tagsPost = post.tags.split(',');
		for(let index in tagsPost){
			console.log(index);
			if(tags[tagsPost[index]] === undefined){
				tags[tagsPost[index]] = [];
			}
			console.log(tags,tagsPost[index],tags[tagsPost[index]]);
			tags[tagsPost[index]].push(post.name);
		}
		json[post.name] = {
			title : post.name.replace('-', ' '),
			img : '',
			tags : tagsPost
		}

		fs.writeFile(jsonPost,JSON.stringify(json,null, "\t"));
		fs.writeFile(jsonTags,JSON.stringify(tags,null, "\t"));
		fs.writeFile(filePost, post.name, cb);
	});

});

gulp.task('page', (cb) => {
	let jsonPost = path.join(__dirname,'src','pages','_data.json');
	let filePost = path.join(__dirname,'src','pages',util.env.name + '.jade');
	let json = JSON.parse(fs.readFileSync(jsonPost, "utf8"));

	json[util.env.name] = { title : util.env.name.replace('-', ' ')}

	fs.writeFile(jsonPost,JSON.stringify(json,null, "\t"));

	fs.writeFile(filePost, util.env.name, cb);
});

gulp.task('tag' , (cb) =>{
	let jsonTags = path.join(__dirname,'src','tags','_data.json');
	new Promise((resolve,reject) =>{
		rl.question("name: ", function(name) {
			resolve(name);
			rl.close();
		});
	})
	.then(function (name) {
		let json = JSON.parse(fs.readFileSync(jsonTags, "utf8"));
		if(!json[name]){
			json[name] = [];
		}
		fs.writeFile(jsonTags,JSON.stringify(json,null, "\t"),cb)
	});
});
