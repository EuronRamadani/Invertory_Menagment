import React from "react";
import { Container, Menu } from "semantic-ui-react";

export default function NavBar() {
	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item header>Invertory Menagment</Menu.Item>
				<Menu.Item name="Category" />
				<Menu.Item name="Manufacture" />
				<Menu.Item name="Product" />
				<Menu.Item name="Supplier" />
			</Container>
		</Menu>
	);
}
