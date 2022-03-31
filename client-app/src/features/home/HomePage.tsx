import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage() {
	return (
		<Segment inverted textAlign="center" vertical className="masthead">
			<Container text>
				<Header as="h1" inverted>
					<Image
						size="massive"
						src="/logo.png"
						alt="logo"
						style={{ marginBottom: 12 }}
					/>
					Invertory Managment
				</Header>
				<Header as="h2" inverted content="Welcome to Invertory Managment" />
				<Button as={Link} to="/products" size="huge" inverted>
					{" "}
					Take me to the Managment
				</Button>
			</Container>
		</Segment>
	);
}
