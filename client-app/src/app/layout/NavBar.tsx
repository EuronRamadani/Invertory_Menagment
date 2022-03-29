import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";

export default function NavBar() {
	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item as={NavLink} to="/" exact header>
					Invertory Menagment
				</Menu.Item>
				<Menu.Item as={NavLink} to="/categories" name="Category" />
				<Menu.Item as={NavLink} to="/manufactures" name="Manufacture" />
				<Menu.Item as={NavLink} to="/products" name="Product" />
				<Menu.Item as={NavLink} to="/suppliers" name="Supplier" />
			</Container>
		</Menu>
	);
}
