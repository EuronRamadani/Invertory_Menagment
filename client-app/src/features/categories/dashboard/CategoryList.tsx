import React from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { Category } from "../../../app/layout/models/category";

interface Props {
	categories: Category[];
	selectCategory: (id: string) => void;
	deleteCategory: (id: string) => void;
}

export default function CategoryList({
	categories,
	selectCategory,
	deleteCategory,
}: Props) {
	return (
		<Segment>
			<Item.Group divided>
				{categories.map((category) => (
					<Item key={category.id}>
						<Item.Image
							size="small"
							src="https://react.semantic-ui.com/images/wireframe/image.png"
						/>

						<Item.Content>
							<Item.Header as="a">{category.categoryName}</Item.Header>
							<Item.Description>{category.description}</Item.Description>
							<Item.Extra>
								<Button
									onClick={() => selectCategory(category.id)}
									floated="right"
									content="View"
									color="blue"
								/>
								<Button
									onClick={() => deleteCategory(category.id)}
									floated="right"
									content="Delete"
									color="red"
								/>
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
}
