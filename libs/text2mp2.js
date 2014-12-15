







var sys = require('sys');
var exec = require('child_process').exec;
function puts(error, stdout, stderr){
	sys.puts(stdout);
}

module.exports.convert = function(){
	exec('text2wave text.txt -o ./public/sample.wav', function(){
		exec('lame ./public/sample.wav ./public/speak.mp3')
	});
};

var main = function(){
	module.exports.convert();
}

if (require.main === module){
	main();
}
