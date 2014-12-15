









var chat = {
	sentances:[],
	chat:0,
	input:function(cb){
		var formData = {message:$('#user_input').val()}
		this.sentances.push(formData.message);
		if (this.sentances.length > 1){
			console.log("In situation: " + this.sentances.length);
			$('#past_chat').append('<p>' + this.sentances[this.sentances.length-2] + '</p>');
		}
		$('#last_sentance').text(this.sentances[this.sentances.length-1]);
		$.ajax({
			type     : 'POST',
			url      : '/chat',
			data     : formData,
			dataType : 'json'
		}).done(function(data){
			if (data.stat == "ok"){
				chat.error = 0;
			}
			else{
				chat.error = 1;
			}
			if(cb) cb();
		});
	}	
}
