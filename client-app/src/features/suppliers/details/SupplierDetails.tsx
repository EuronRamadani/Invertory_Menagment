import { observer } from "mobx-react-lite";
import { useEffect } from "react";
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

	useEffect(() => {
		if (id) loadSupplier(id);
	}, [id, loadSupplier]);

	if (loadingInitial || !supplier) return <LoadingComponent content={""} />;

	return (
		<Card fluid>
			<Image src={`/assets/categoryImages/drinks.jpg`} />
			<Card.Content>
				<Card.Header>{supplier.supplierName}</Card.Header>
				{/* <Card.Meta>
					<span className="date">Joined in 2015</span>
				</Card.Meta> */}
				<Card.Description>
					{supplier.description}
					<div>{supplier.countryOfOrigin}</div>
				</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button.Group>
					<Button
						as={Link}
						to={`/manageSupplier/${supplier.id}`}
						basic
						color="blue"
						content="Edit"
					/>
					<Button
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
