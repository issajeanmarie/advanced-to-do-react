import React from 'react';
import styled from 'styled-components';

class Footer extends React.PureComponent {
	render() {

		const Footer = styled.footer`
			background: #F6F6F6;
			padding: 12px;
			text-align: center;
			color: #707070;
			font-size: 1em;
			margin-top: 7%;
		`;
		return (
			<Footer>
				Issa Jean Marie ~ 2021
			</Footer>
		)
	}
}

export default Footer