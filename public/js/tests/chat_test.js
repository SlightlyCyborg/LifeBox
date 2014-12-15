




var expect = chai.expect

describe('chat', function(){
	it ('should load a page with chat as the title', function(){
		expect($(document).find("title").text()).to.equal('chat');
	});
	
	it ('should have an input text box on the psge', function(){
		expect($('#user_input').length).to.be.above(0);
	});

	describe('user_input', function(){
		it ('should send user input to server and recieve an ok', function(done){
			console.log(chat);
			$('#user_input').val('Hello World');
			$('#input_form').submit(function(){
				chat.input(function(){
					expect(chat.error).to.equal(0);
					done();
				});
			});
			$('#input_form').submit()
		});
	});

	describe('output', function(){
		it ('should print last input when user inputs', function(){
			expect($('#last_sentance').text()).to.equal('Hello World');
		});
		it ('should print all other inputs in #past_chat', function(done){
			$('#user_input').val('I am rouge');
			$('#input_form').submit()
			expect($('#past_chat p').length).to.equal(1);
			done()
		});
	});
});



