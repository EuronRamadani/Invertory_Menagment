import { observer } from "mobx-react-lite";
import React, { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function CategoryDetails() {
	const { categoryStore } = useStore();
	const {
		selectedCategory: category,
		loadCategory,
		loadingInitial,
	} = categoryStore;
	const { id } = useParams<{ id: string }>();
	const {
		userStore: { user },
	} = useStore();

	useEffect(() => {
		if (id) loadCategory(id);
	}, [id, loadCategory]);

	if (loadingInitial || !category) return <LoadingComponent content={""} />;

	return (
		<Card style={{ width: "70%", marginLeft: "10%" }}>
			<Image
				size="small"
				style={{ width: "900px", height: "400px" }}
				src={`/categoryImages/${category.categoryName}.jpeg`}
			/>
			<Card.Content>
				<Card.Header>{category.categoryName}</Card.Header>
				<Card.Description>Description: {category.description}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group>
					{user?.isAdmin ? (
						<Button
							fluid
							as={Link}
							to={`/manageCategory/${category.id}`}
							basic
							color="blue"
							content="Edit"
						/>
					) : (
						<Fragment />
					)}
					<Button
						fluid
						as={Link}
						to="/categories"
						basic
						color="grey"
						content="Cancel"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
});
