import React from 'react';
import Form from './Form.jsx';
import styled from 'styled-components';

class ToDo extends React.Component {

	constructor(props) {
		super(props)
	
		//Get localStorage Data
		let listStored = localStorage.getItem('myToDo-react');
		let listArr = JSON.parse(listStored);

		if (listArr != null) {
			this.state = {
				 list: listArr
			};
		} else{
			this.state = {
				list: []
			}
		}

		this.getFormData = this.getFormData.bind(this);
		this.Done = this.Done.bind(this);
		this.Delete = this.Delete.bind(this);
		this.OnDrop = this.OnDrop.bind(this);
	}

	getFormData(data) {
		//Set state
		let list = [...this.state.list];
		list.push(data);
		this.setState({
			list: list
		});
	}

	Done(e) {
		let parent = e.target.parentElement;
		let bigParent = parent.parentElement;

		//Search into state
		const list = [...this.state.list];
		list.forEach((item, index) => {
			if (index == bigParent.id) {
				//Modify it
				if (item.done) {
					item.done = false;
					item.opacity = 1;
					item.color = 'black';
				} else{
					item.done = true;
					item.opacity = 0.4;
					item.color = 'blue';
				}
			}
		});

		//Then set state
		this.setState({
			list: list
		})
	}

	Delete(e) {
		let parent = e.target.parentElement;
		let bigParent = parent.parentElement;

		const list = [...this.state.list];
		let updatedList = list.filter((item, index) => index != bigParent.id);

		//Update state
		this.setState({
			list: updatedList
		});
	}


	//Drag and Drop
	OnDrag(e) {
		e.dataTransfer.setData('text', e.target.id);
	}

	allowDrop(e){
		e.preventDefault();
	}

	OnDrop(e){
		e.preventDefault();
		let data  = e.dataTransfer.getData('text');

		//Change array positions
		let arrr = ['a', {name: "Issa"}];
		let newList = array_move(this.state.list, data, e.target.id);

		//Update the list
		this.setState({
			list: newList
		})

		//Reverse array indexes
		function array_move(arr, old_index, new_index) {
		    if (new_index >= arr.length) {
		        var k = new_index - arr.length + 1;
		        while (k--) {
		            arr.push(undefined);
		        }
		    }
		    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
		    return arr;
		};

	}


	render() {

		//Save to do
		localStorage.setItem('myToDo-react', JSON.stringify(this.state.list));

		//Get Done and Undone numbers
		let done = this.state.list.filter(data => data.done == true);
		let unDone = this.state.list.filter(data => data.done == false);


		const Ul = styled.ul`
			background: #F6F6F6;
			list-style-type: none;
			height: auto;
			padding: 6px;
			margin-top: 10px;

			li{
				background: #FFF;
				width: 93%;
				padding: 12px;
				margin: 1% auto;
				color: rgb(100,100,100);
				position: relative;
				border-radius: 4px;
			}
		`;

		const Buttons = styled.div`
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-column-gap: 10px;
			width: 50px;
			height: 100%;
			position: absolute;
			right: 2px;
			top: 0;
			bottom: 0;
			align-items: center;
			justify-content: center;
			cursor: pointer;

			.tick{
				color: #1391D1;
			}

			.delete{
				color: maroon;
			}
		`;

		const EmptyP = styled.p`
			color: #707070;
			text-align: left;
			margin-left: 10px;
			margin-top: 10px;
		`;

		const Squares = styled.div`
			cursor: grab;
			margin-right: 2%;
		`;

		const Span = styled.span`
			width: 75%;
			overflow: hiden;
			display: block;
			position: absolute;
			left: 40px;
			line-height: 42px;
			top: 0;
			bottom: 0;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;

			@media (max-width: 768px){
				width: 65%;
			}
		`;

		const Status = styled.div`
			width: 82px;
			padding: 12px;
			display: grid;
			grid-template-columns: 30px 30px;
			grid-column-gap: 4px;
			margin: 1% auto;

			.Done{
				background: none;
				border: 1px solid green;
				padding: 6px;
				width: 30px;
				height: 30px;
				border-radius: 100%;
				text-align: center;
				color: green;
				font-size: 0.8em;
				font-weight: bold;
				line-height: 17px;
				overflow: hidden;
				cursor: pointer;
				opacity: 0.7;
			}

			.notDone{
				background: none;
				border: 1px solid maroon;
				padding: 6px;
				width: 30px;
				height: 30px;
				border-radius: 100%;
				text-align: center;
				color: maroon;
				font-size: 0.8em;
				font-weight: bold;
				line-height: 17px;
				overflow: hidden;
				cursor: pointer;
				opacity: 0.7;
			}
		`;

		return (
			<React.Fragment>
				<Form getFormData={this.getFormData} Delete={this.Delete} />

				{
					this.state.list.length > 0 ?

					<Ul>
						{
							this.state.list.map((data, index) => {
								return(
									<li 
										key={index} id={index}
										draggable = 'true' 
										onDragOver = {this.allowDrop} 
										onDragStart = {this.OnDrag}
										onDrop = {this.OnDrop}
										>
										<Squares className="fas fa-braille" style={{color: data.color}}>
										</Squares>

										<Span style={{opacity: data.opacity}} >

											{data.value}

										</Span>

										<Buttons>
											<span 
												className="fas fa-check-circle tick"
												onClick={this.Done}
												style={{opacity: data.opacity}}
											>
											</span>

											<span 
												className="fas fa-trash delete" 
												onClick={this.Delete}
											>
											</span>
										</Buttons>
									</li>
								);

							})
						}
					</Ul>

					:

					<EmptyP>
						You currently have nothing to do. <br />
						<b> Have a nice day </b>
					</EmptyP>
				}

				<br />
				<Status>
					<p className="Done" id="done">{done.length}</p>
					<p className="notDone" id="undone">{unDone.length}</p>
				</Status>
			</React.Fragment>
		)
	}
}

export default ToDo