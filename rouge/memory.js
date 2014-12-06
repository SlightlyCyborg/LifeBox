/**
* Created with GlobalHypothesis.
* User: SlightlyCyborg
* Date: 2014-11-21
* Time: 05:59 PM
* To change this template use Tools | Templates.
*/
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test');

var Memory = mongoose.model('Memory', { content: String });

var wordEqualityNet = function(memory_bank, cb){
	cb()
};

var similar_words = function(from, to){
	for (var i = 0; i < to.length; i++){
		for (var j = 0; j < from.length; j++){
			if (from[i] == to[i]) return true
		}
	}
	return false;
}

module.exports.similar_words = similar_words

module.exports = function memory_bank(){
	this.memories = []
	this.save = function(content, cb){
		var mem_to_save = new Memory({content:content})
		mem_to_save.save(function(err){
			if(err) {
				console.log("Save error" + err)
				cb(err)
			}
			console.log('Memory Saved')
			cb()
		});
	}
	this.get_last_memory = function(cb){
		Memory.findOne(function(err, memories){
			console.log("Found Memory " + memories )
			cb(memories)							
		});		
	};
	
	this.disconnect = function(){
		mongoose.connection.close()
	};
	
	this.link = function(type, cb){
		if (type == "WordEquality"){
			this.wordEqualityNet(this, cb);
		}
	};
	
	this.wordEqualityNet = function(memory_bank, cb){
		var net = {
			links:[],
			select:function(selectionString, cb){
				var that = this
				Memory.findOne({content:selectionString}, function(err, memories){
					that.current = memories
					cb(that)
				});	
			},
			getRandomLink:function(cb){
				console.log("Links" + this.links);
				this.current = this.links[0].to;
				console.log(this.links[0])
				cb(this);
			},
			getCurrent:function(){
				return this.current
			}
		}
		
		
		Memory.find(function(err, memories){
			console.log(memories)
			if(err) console.log(err)
			for (var i = 0; i < memories.length; i++){
				for (var j = 0; j < memories.length; j++){
					if (i != j){
						var from_sentance = (memories[i].content);
						var to_sentance = (memories[j].content);
						var from_words = from_sentance.split(' ');
						var to_words = to_sentance.split(' ');
						console.log(similar_words(from_words, to_words))
						if (similar_words(from_words, to_words)){
							net.links.push({"from":memories[i], "to":memories[j]})
						}
					}
				}
			}
			console.log('Through for loop')
			cb(net);
		});
			
	};

	this.clear = function(cb){
		Memory.remove({},cb);
	}
};
	
// NEED TO: define similar_words? 

