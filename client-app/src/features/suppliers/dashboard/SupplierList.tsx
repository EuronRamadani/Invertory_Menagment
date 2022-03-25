import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Supplier } from "../../../app/layout/models/supplier";

interface Props {
	suppliers: Supplier[];
	selectSupplier: (id: string) => void;
	deleteSupplier: (id: string) => void;
}

export default function SupplierList({
	deleteSupplier,
	suppliers,
	selectSupplier,
}: Props) {
	return (
		<Segment>
			<Item.Group>
				{suppliers.map((supplier) => (
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
									onClick={() => selectSupplier(supplier.id)}
									floated="right"
									content="View"
									color="blue"
								/>
								<Button
									onClick={() => deleteSupplier(supplier.id)}
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
}
