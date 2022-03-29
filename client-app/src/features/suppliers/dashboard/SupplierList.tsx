import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function SupplierList() {
	const { supplierStore } = useStore();
	const { deleteSupplier, suppliersByDate, loading } = supplierStore;
	const [target, setTarget] = useState("");

	function handleSupplierDelete(
		e: SyntheticEvent<HTMLButtonElement>,
		id: string
	) {
		setTarget(e.currentTarget.name);
		deleteSupplier(id);
	}

	return (
		<Segment>
			<Item.Group>
				{suppliersByDate.map((supplier) => (
					<Item key={supplier.id}>
						<Item.Image
							size="small"
							src="https://react.semantic-ui.com/images/wireframe/image.png"
						/>

						<Item.Content>
							<Item.Header as="a">{supplier.supplierName}</Item.Header>
							<Item.Description>{supplier.description}</Item.Description>
							<Item.Extra>
								<Button
									as={Link}
									to={`/suppliers/${supplier.id}`}
									floated="right"
									content="View"
									color="blue"
								/>
								<Button
									name={supplier.id}
									loading={loading && target === supplier.id}
									onClick={(e) => handleSupplierDelete(e, supplier.id)}
									floated="right"
									content="Delete"
									color="red"
								/>
								<Label basic content={supplier.countryOfOrigin} />
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
});
