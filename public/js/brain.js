






var brain = {}

function draw(data,cb){
	console.log(data);
	var nodes = data.nodes;
	var links = data.links
	var node_circle_array = node_circle(nodes.length);
	var n = node_circle_array;
	//Create Circles
	d3.select('#d3').selectAll("circle")
		.data(nodes)
	  .enter().append("circle")
		.text(function(d) { return d })
	  .attr('id',function(d,i){
		  rv = 'node' + i;
		  return rv;
	  })
	   .attr('cx', function(d,i){
			return node_circle_array[i][0];
		})
	 .attr('cy', function(d,i){
		 return node_circle_array[i][1];
	 })
	  .attr('r', 20)
  	 .attr('stroke', 'black')
	  .attr('stroke-width', '2') 
	 .on('click', function(d, i){
		 var node = d3.select('#d3').select('#node'+ i.toString())
			 console.log(node.attr('fill'));
		 var text = d3.select('#d3').select('#text'+ i.toString());
		 var color = 'white'
			 if (node.attr('fill') == color){
				node.attr('fill','black');
				node.attr('r', 20);
				text.attr('y', node_circle_array[i][1]+50);
				
			 } else {
				node.attr('fill', color);
				node.attr('r', 100);
				text.attr('y', node_circle_array[i][1]+150);

			 }
	 });

	d3.select('#d3').selectAll("text").
		data(nodes)
	.enter().append("text")
		.attr('x', function(d,i){
			return node_circle_array[i][0];
		})
	.attr('y', function(d,i){
		return node_circle_array[i][1] + 50;
	})
	.attr('id', function(d, i){
		return "text" + i.toString();
	})
	.text(function(d){return d});

	//Create Lines
	d3.select('#d3').selectAll('line')
		.data(links)
	  .enter().append('line')
	   .attr('id', function(d,i){
			rv = 'link' + i;
			return rv;
		})
	 .attr('x1', function(d,i){
		 rv = n[d[0]][0];
		 return rv
	 })
	  .attr('y1', function(d,i){
		 rv = n[d[0]][1];
		 return rv
	  })
	.attr('x2', function(d,i){
		 rv = n[d[1]][0];
		 return rv
	})
	  .attr('y2', function(d,i){
		 rv = n[d[1]][1];
		 return rv
	  })
	.attr('style', "stroke:rgb(255,0,0);stroke-width:2" );

		
		

	cb()
};

function node_circle(numNodes){
	var radius = 200;
	var deg_seperation = 360 / numNodes;
	var rv = []
	for (i=0; i<numNodes; i++){
		rv.push([radius*Math.cos(toDegrees(i*deg_seperation))+450,
					radius*Math.sin(toDegrees(i*deg_seperation))+250
		])
	}
	return rv

}

function toDegrees(angle) {
	return angle * (Math.PI/180);
}

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
				if (a[1] == node2_num){
					return true;
				}
			}
		}
			
		return false;
		//}
	};

	this.play = function(quantity){
		rv = [];
		for ( var i = 0; i < quantity; i++){
			rv.push(this.current_node);
			if ( i != quantity - 1){
				this.get_next_node();	
			}
		}
		return rv;
	}
}


brain.draw = draw
brain.node_circle = node_circle
brain.NodeSpeaker = NodeSpeaker

