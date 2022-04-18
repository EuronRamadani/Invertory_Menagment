import { observer } from "mobx-react-lite";
import React, { Fragment, SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function CategoryList() {
	const { categoryStore } = useStore();
	const { deleteCategory, categoriesByDate, loading } = categoryStore;
	const [target, setTarget] = useState("");

	const {
		userStore: { user },
	} = useStore();

	function handleCategoryDelete(
		e: SyntheticEvent<HTMLButtonElement>,
		id: string
	) {
		setTarget(e.currentTarget.name);
		deleteCategory(id);
	}

	return (
		<Segment>
			<Item.Group divided>
				{categoriesByDate.map((category) => (
					<Item key={category.id}>
						<Item.Image
							size="small"
							src={`/categoryImages/${category.categoryName}.jpeg`}
						/>

						<Item.Content>
							<Item.Header as="a">{category.categoryName}</Item.Header>
							<Item.Description>{category.description}</Item.Description>
							<Item.Extra>
								<Button
									as={Link}
									to={`/categories/${category.id}`}
									floated="right"
									content="View"
									color="blue"
								/>
								{user?.isAdmin ? (
									<Button
										name={category.id}
										loading={loading && target === category.id}
										onClick={(e) => handleCategoryDelete(e, category.id)}
										floated="right"
										content="Delete"
										color="red"
									/>
								) : (
									<Fragment />
								)}
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
});
