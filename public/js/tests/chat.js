





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
			$('#user_input').val('Hello World');
			$('#input_form').submit();
			expect(chat.error).to.equal(0);
			done();
		});
	});

	describe('output', function(){
		it ('should print input when user inputs', function(){
			expect($('#last_sentance').text()).to.equal('Hello World');
		});
	});
});

