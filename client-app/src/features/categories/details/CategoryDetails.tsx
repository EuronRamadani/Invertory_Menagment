import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function CategoryDetails() {
	const { categoryStore } = useStore();

	const {
		selectedCategory: category,
		openForm,
		cancelSelectedCategory,
	} = categoryStore;

	if (!category) return <LoadingComponent content={""} />;

	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/drinks.jpg`} />
			<Card.Content>
				<Card.Header>{category.categoryName}</Card.Header>
				{/* <Card.Meta>
					<span className="date">Joined in 2015</span>
				</Card.Meta> */}
				<Card.Description>{category.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group>
					<Button
						onClick={() => openForm(category.id)}
						basic
						color="blue"
						content="Edit"
					/>
					<Button
						onClick={cancelSelectedCategory}
						basic
						color="grey"
						content="Cancel"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
}
