









var NodeSpeaker = function(data){
	this.data = data;
	this.current_node = data.nodes[0];
	this.speak = function(ar){
		if (ar){
			console.log('Should also be here once');
			for (i = 0; i < ar.length; i++){
				$('#NodeSpeaker_play_array').append('<p id=NodeSpeaker' + i.toString() + '>' + ar[i] + '</p>')
				$('#NodeSpeaker' + i.toString()).text(ar[i]);
			}
		}
		else{
			console.log('Should be here once')
			$('#NodeSpeaker').text(this.current_node);
		}

	}
	this.get_next_node = function(){
		var next_nodes = []
		for (var i = 0; i < data.links.length; i++){
			if (data.nodes[data.links[i][0]] === this.current_node){
				next_nodes.push(data.nodes[data.links[i][1]]);
			}
			if (data.nodes[data.links[i][1]] === this.current_node){
				next_nodes.push(data.nodes[data.links[i][0]]);
			}
		}
		console.log(next_nodes)
		this.current_node = next_nodes[Math.floor(Math.random() * next_nodes.length)];
		console.log(this.current_node);
	}
	
	this.is_link = function(sentance1, sentance2){
		var links = this.data.links
		var node1_num = this.data.nodes.indexOf(sentance1);
		var node2_num = this.data.nodes.indexOf(sentance2);
		console.log(node2_num);
		console.log(node1_num);
		console.log(this.data.links);
		console.log(this.data.links.indexOf([node1_num, node2_num]));
		console.log(this.data.links.indexOf([node2_num, node1_num]));
		console.log('intersection');
		for(var i = 0; i < links.length; i++){
			var a = links[i]
			if (a[0] == node1_num){
				if (a[1] == node2_num){
					return true;
				}
			}
			if (a[0] == node2_num){
