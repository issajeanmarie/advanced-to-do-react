import React from 'react';
import Header from './Components/Header.jsx';
import ToDo from './Components/ToDo.jsx';
import Footer from './Components/Footer.jsx';
import styled from 'styled-components';
import './Components/styles/style.css';

class App extends React.Component {
	render() {
		const Cont = styled.main`
			width: 95%;
			height: 0 auto;
			margin: 0 auto;
			font-family: sans-serif;
			background: rgb(253,253,253);
			border-radius: 3px;
			overflow: hidden;

			@media (min-width: 768px){
				width: 40%;
			}
		`;

		return (
			<Cont>
				<Header />
				<ToDo />
				<Footer />
			</Cont>
		)
	}
}

export default App;