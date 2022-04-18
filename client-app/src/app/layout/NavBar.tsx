import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import {
	Container,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	Image,
	Menu,
	MenuItem,
} from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {
	const {
		userStore: { user, logout },
	} = useStore();

	return (
		<Menu inverted fixed="top">
			<Container>
				<Menu.Item as={NavLink} to="/" exact header>
					Invertory Menagment
				</Menu.Item>
				<Menu.Item as={NavLink} to="/categories" name="Category" />
				{user?.isAdmin ? (
					<Menu.Item as={NavLink} to="/manufactures" name="Manufacture" />
				) : (
					<Fragment />
				)}
				<Menu.Item as={NavLink} to="/products" name="Product" />
				{user?.isAdmin ? (
					<Menu.Item as={NavLink} to="/suppliers" name="Supplier" />
				) : (
					<Fragment />
				)}
				<MenuItem position="right">
					<Image src={user?.image || "/user.png"} avatar spaced="right" />
					<Dropdown pointing="top left" text={user?.displayName}>
						<DropdownMenu>
							<DropdownItem
								as={Link}
								to={`/Profile`}
								text="My profile"
								icon="user"
							/>
							<DropdownItem onClick={logout} text="Log Out" icon="power" />
						</DropdownMenu>
					</Dropdown>
				</MenuItem>
			</Container>
		</Menu>
	);
});
