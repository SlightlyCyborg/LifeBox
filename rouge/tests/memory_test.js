







/**
* Created with GlobalHypothesis.
* User: SlightlyCyborg
* Date: 2014-11-21
* Time: 06:05 PM
* To change this template use Tools | Templates.
*/
var memory = require("../memory.js");
var assert = require('assert');

describe('Memory_Bank', function(){
	describe('#save()', function(){
		var my_memory = new memory();
		beforeEach(function(done){
			my_memory.clear(done);
		});
		it('should save a memory for retrival', function(done){
			//TEST Store Retrive Memory
			my_memory.save("Hello World", function(){
				function test_case_1(memories){
					assert(memories.content == "Hello World");
					console.log(memories.content)
					done();
				}

				my_memory.get_last_memory(test_case_1)
			});
		});
	});
	describe('#link', function(){
		beforeEach(function(done){
				this.my_memory = my_memory = new memory();
				my_memory.clear(function(){
				var content = ['Dogs were blue', 'Dogs are animals', ' I like animals']
				my_memory.save(content[0],function(){
					my_memory.save(content[1], function(){
						my_memory.save(content[2], function(){
							done()
						});
					});
				});
			});
		});
		
		it('should link all words and then get a random association', function(done){
			this.my_memory.link("WordEquality", function(net){
				console.log("Smile")
				net.select('Dogs were blue', function(net){
					console.log("Work")
					net.getRandomLink(function(net){
						console.log(net.getCurrent().content)
						assert(net.getCurrent().content == 'Dogs are animals')
						done()
					});
				});
			});
		});
	});
});

