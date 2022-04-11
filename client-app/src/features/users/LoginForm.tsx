import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Form, Header, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function LoginForm() {
	const { userStore } = useStore();

	return (
		<Formik
			initialValues={{ email: "", password: "", error: null }}
			onSubmit={(values, { setErrors }) =>
				userStore
					.login(values)
					.catch((error) => setErrors({ error: "Invalid email or password" }))
			}
		>
			{({ handleSubmit, handleChange, isSubmitting, errors }) => (
				<Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
					<Header
						as="h2"
						content="Login to Invertory Managment"
						color="teal"
						textAlign="center"
					/>
					<Form.Input
						name="email"
						placeholder="Email"
						onChange={handleChange}
					/>
					<Form.Input
						name="password"
						placeholder="Password"
						type="password"
						onChange={handleChange}
					/>
					<ErrorMessage
						name="error"
						render={() => (
							<Label
								style={{ marginBottom: 10 }}
								basic
								color="red"
								content={errors.error}
							/>
						)}
					/>
					<Button
						loading={isSubmitting}
						positive
						content="Login"
						type="submit"
						fluid
					/>
				</Form>
			)}
		</Formik>
	);
});
