import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default function SupplierDetails() {
	const { supplierStore } = useStore();
	const {
		selectedSupplier: supplier,
		cancelSelectedSupplier,
		openForm,
	} = supplierStore;

	if (!supplier) return <LoadingComponent content={""} />;

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
						onClick={() => openForm(supplier.id)}
						basic
						color="blue"
						content="Edit"
					/>
					<Button
						onClick={cancelSelectedSupplier}
						basic
						color="grey"
						content="Cancel"
					/>
				</Button.Group>
			</Card.Content>
		</Card>
	);
}
