import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Category } from "../../../app/layout/models/category";

interface Props {
	category: Category;
	cancelSelectCategory: () => void;
	openForm: (id: string) => void;
}

export default function CategoryDetails({
	category,
	cancelSelectCategory,
	openForm,
}: Props) {
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
						onClick={cancelSelectCategory}
						basic
						color="grey"
						content="Cancel"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
}
