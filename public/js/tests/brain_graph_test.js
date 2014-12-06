





var expect = chai.expect


describe('brain_graph', function(){
	it('should load a page with brain_graph as the title', function(){
			expect($(document).find("title").text()).to.equal('brain_graph');
	});
	describe('Brain', function(){
		describe('#draw(data)', function(){
			before(function(done){
				this.input = {nodes:[
									'I love to program',
									'I am Collin', 
									'I am programing rouge', 
									'Rouge is my friend'], 
							links:[
								[0,1],[0,2],[1,2],[2,3]
								]};

				brain.draw(this.input, done)
			});

			it('should draw svg circles on the page for each node', function(){
									//TEST DOCUMENT FOR SVG CIRCLES.
					expect($('#node0').length).to.be.ok;
					expect($('#node0').attr('cx')).to.equal('450');
					expect($('#node0').attr('cy')).to.equal('250');
					expect($('#node1').length).to.be.ok;
					//expect(($('#node1').attr('cx')<1)).to.be.ok;
					//expect(($('#node1').attr('cy')-400)<1).to.be.ok;
					expect($('#node1').length).to.be.ok;
					expect($('#node2').length).to.be.ok;
					expect($('#node3').length).to.be.ok;
					//Node SVG will have id "node0", "node1", and "node2"
				
			});
			it('should draw svg lines between linked nodes', function(){
				var n_c = brain.node_circle(4);
				var n = []
				for (var i = 0; i < this.input.links.length; i++){
					var temp = [];
					temp.push(n_c[this.input.links[i][0]]);
					temp.push(n_c[this.input.links[i][1]]);
					n.push(temp);
				}
				console.log(n)
					expect($('#link0').length).to.be.ok;
					expect($('#link1').length).to.be.ok;
					expect($('#link2').length).to.be.ok;
					expect($('#link3').length).to.be.ok;
					//FIRST INDEX IS LINK #, Second index is X or Y, Third is p1, p2
					expect(($('#link0').attr('x1')-n[0][0][0])<1).to.be.ok;
					expect(($('#link0').attr('x2')-n[0][1][0])<1).to.be.ok;
					expect(($('#link0').attr('y1')-n[0][0][1])<1).to.be.ok;
					expect(($('#link0').attr('y2')-n[0][1][1])<1).to.be.ok;
					expect(($('#link1').attr('x1')-n[1][0][0])<1).to.be.ok;
					expect(($('#link1').attr('x2')-n[1][1][0])<1).to.be.ok;
					expect(($('#link1').attr('y1')-n[1][0][1])<1).to.be.ok;
					expect(($('#link1').attr('y2')-n[1][1][1])<1).to.be.ok;
					expect(($('#link2').attr('x1')-n[2][0][0])<1).to.be.ok;
					expect(($('#link2').attr('x2')-n[2][1][0])<1).to.be.ok;
					expect(($('#link2').attr('y1')-n[2][0][1])<1).to.be.ok;
					expect(($('#link2').attr('y2')-n[2][1][1])<1).to.be.ok;
					expect(($('#link3').attr('x1')-n[3][0][0])<1).to.be.ok;
					expect(($('#link3').attr('x2')-n[3][1][0])<1).to.be.ok;
					expect(($('#link3').attr('y1')-n[3][0][1])<1).to.be.ok;
					expect(($('#link3').attr('y2')-n[3][1][1])<1).to.be.ok;
				
			});
		});
		describe('#node_circle(numNodes)', function(){
			it('should generate an array that is nx2 that has the coordinates of evenly radialy spaced radia', function(){
				expect(brain.node_circle(0).length).to.equal(0);
				expect(brain.node_circle(1).length).to.equal(1);
				expect(brain.node_circle(1)[0]).to.deep.equal([450,250]);
				expect(brain.node_circle(2)[1][0]).to.equal(50);
			});
		});
		describe('NodeSpeaker', function(){
			it('should exist in the brain', function(){
				expect(brain).to.have.property('NodeSpeaker');
			});

			before(function(){
				this.input = {nodes:[
									'I love to program',
									'I am Collin', 
									'I am programing rouge', 
									'Rouge is my friend'], 
							links:[
								[0,1],[0,2],[1,2],[2,3]
								]};

				this.ns = new brain.NodeSpeaker(this.input);
			});


			
			it('should have a current node', function(){
				expect(this.ns).to.have.property('current_node');
			});
			it('should have #speak', function(){
				expect(this.ns).to.have.property('speak');
			});
			describe('#speak', function(){
				it('should write out first node, I love to program, to #NodeSpeaker', function(done){
					this.ns.speak();
					expect($('#NodeSpeaker').text()).to.equal('I love to program');
					done();
				});
				it('should handle an array made by #play', function(){
					this.ns.speak(this.ns.play(3));

					//We have 3 sentances so I need to test 2 links
					for (var i = 0; i < 2; i++){
						expect(this.ns.is_link($('#NodeSpeaker' + i.toString()).text(),
													  $('#NodeSpeaker' + (i+1).toString()).text())).to.be.ok
					}
				});
			});
			describe('#get_next_node', function(){
				it('should get next node', function(){
					this.ns.get_next_node();
					expect(['I am Collin', 'I am programming rouge']).to.include.members([this.ns.current_node])
				});
			});
			describe('#is_link(sentance1, sentance2)', function(){
				it('should return True if sentances are linked and false otherwise', function(){
					//Case 1: Sentance1 & Sentance2 are linked
					expect(this.ns.is_link('I love to program', 'I am Collin')).to.be.ok
					//Case 2: Sentance1 & Sentance2 are not linked
					expect(this.ns.is_link('I love to program', 'Rouge is my friend')).to.not.be.ok
				});
			});
			describe('#play(quantity)', function(){
				it('should return an array of sentances that are linked', function(){
					//Check to make sure links exist between the spoken sentances
					var quantity = 3;
					var sentances = this.ns.play(quantity);
					for (var i = 0; i < sentances.length-1; i++){
						//-1 because we are double accessing i and i+1
						expect(this.ns.is_link(sentances[i],sentances[i+1]));
					}	
				});
			});
		});
	});
});

