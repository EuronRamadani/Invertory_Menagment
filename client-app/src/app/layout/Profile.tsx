import { useStore } from "../stores/store";
import { Form } from "semantic-ui-react";

export default function Profile() {
	const {
		userStore: { user /*, getUser*/ },
	} = useStore();

	// useEffect(() => {
	// 	getUser();
	// }, [getUser]);

	const myString = user?.isAdmin ? "true" : "false";

	return (
		<Form>
			<Form.Field>
				<label> Name</label>
				<input placeholder={user?.displayName} disabled />
			</Form.Field>
			<Form.Field>
				<label>Username</label>
				<input placeholder={user?.username} disabled />
			</Form.Field>
			<Form.Field>
				<label>Is Admin</label>
				<input placeholder={myString} disabled />
			</Form.Field>
			{/* <Button type="submit">Submit</Button> */}
		</Form>
	);
}
