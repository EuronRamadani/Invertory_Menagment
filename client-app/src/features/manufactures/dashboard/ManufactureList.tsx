import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Manufacture } from "../../../app/layout/models/manufacture";

interface Props {
	manufactures: Manufacture[];
	selectManufacture: (id: string) => void;
	deleteManufacture: (id: string) => void;
}

export default function ManufactureList({
	manufactures,
	selectManufacture,
	deleteManufacture,
}: Props) {
	return (
		<Segment>
			<Item.Group>
				{manufactures.map((manufacture) => (
					<Item key={manufacture.id}>
						<Item.Image
							size="small"
							src="https://react.semantic-ui.com/images/wireframe/image.png"
						/>

						<Item.Content>
							<Item.Header as="a">{manufacture.manufacturerName}</Item.Header>
							<Item.Description>{manufacture.description}</Item.Description>
							<Item.Extra>
								<Button
									onClick={() => selectManufacture(manufacture.id)}
									floated="right"
									content="View"
									color="blue"
								/>
								<Button
									onClick={() => deleteManufacture(manufacture.id)}
									floated="right"
									content="Delete"
									color="red"
								/>
								<Label basic content={manufacture.countryOfOrigin} />
							</Item.Extra>
						</Item.Content>
					</Item>
				))}
			</Item.Group>
		</Segment>
	);
}
