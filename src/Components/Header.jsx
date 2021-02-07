import React from 'react';
import styled from 'styled-components';

class Header extends React.Component {
	render() {

		const Header = styled.header`
			background: #1391D1;
			padding: 12px;
			text-align: center;
			font-size: 1.3em;
			color: #F6F6F6;
		`;
		return (
			<Header>
				Make a To Do list...
			</Header>
		)
	}
}

export default Header