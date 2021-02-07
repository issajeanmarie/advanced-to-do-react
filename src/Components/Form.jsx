import React from 'react';
import styled from 'styled-components';

class Form extends React.Component {
	constructor(props) {
		super(props)
	
		this.sendForm = this.sendForm.bind(this);
		this.takeChanges = this.takeChanges.bind(this);

		this.state = {
			newItem: {
				value: '',
			},

			list: []
		}
	}


	takeChanges(e) {
		const newItem = {
			value: e.target.value,
		}

		this.setState({
			newItem: newItem
		})
	}

	sendForm(e) {
		e.preventDefault();

		//Check emptiness
		if (this.state.newItem.value !== '') {

			//Let me send the data
			const newItem = {
				value: this.state.newItem.value,
				done: false,
				deleted: false,
				opacity: 1,
				color: 'black'
			}

			const emptyItem = {
				value: ''
			}

			//Set the state
			this.setState({
				newItem: newItem
			}, () => {
				this.props.getFormData(this.state.newItem);
				//Reset the input
				this.setState({
					newItem: emptyItem
				})
			});
		}


	}

	render() {

		const Form = styled.form`
			background: #FFF;
			padding: 12px;
			width: 100%;
			display: grid;
			grid-template-columns: 1fr 40px;
			grid-column-gap: 7px;
			box-sizing: border-box;
			transition: 0.4s;

			input{
				background: #FFF;
				border: 2px solid #1391D1;
				height: 40px;
				padding: 6px;
				font-weight: bold;
				border-radius: 5px;
				box-sizing: border-box;
				transition: 0.4s;

				}
			}

			button{
				height: 40px;
				border: none;
				background: #1391D1;
				color: #F6F6F6;
				border-radius: 100%;
				box-sizing: border-box;
				transition: 0.4s;
				cursor: pointer;
				text-align: center;
				line-height: 40px;

				&:hover{
					background: #F6F6F6;
					color: #1391D1;
					border: 1px solid #1391D1;
				}

			}
		`;

		return (
			<Form>
				<input type="text" placeholder="Add to do..." value={this.state.newItem.value} onChange={this.takeChanges} autoFocus="autoFocus" />
				<button type="submit" onClick={this.sendForm}><span className="fas fa-plus"></span></button>
			</Form>
		)
	}
}

export default Form