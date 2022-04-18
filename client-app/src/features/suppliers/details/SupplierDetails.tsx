import { observer } from "mobx-react-lite";
import { Fragment, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function SupplierDetails() {
	const { supplierStore } = useStore();
	const {
		selectedSupplier: supplier,
		loadSupplier,
		loadingInitial,
	} = supplierStore;
	const { id } = useParams<{ id: string }>();
	const {
		userStore: { user },
	} = useStore();

	useEffect(() => {
		if (id) loadSupplier(id);
	}, [id, loadSupplier]);

	if (loadingInitial || !supplier) return <LoadingComponent content={""} />;

	return (
		<Card style={{ width: "70%", marginLeft: "10%" }}>
			<Image src={`/supplierImages/${supplier.supplierName}.jpeg`} />
			<Card.Content>
				<Card.Header>{supplier.supplierName}</Card.Header>
				{/* <Card.Meta>
					<span className="date">Joined in 2015</span>
				</Card.Meta> */}
				<Card.Description>
					Description: {supplier.description}
					<div>Country of Origin: {supplier.countryOfOrigin}</div>
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group>
					{user?.isAdmin ? (
						<Button
							fluid
							as={Link}
							to={`/manageSupplier/${supplier.id}`}
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
						to="/suppliers"
						basic
						color="grey"
						content="Cancel"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
});
