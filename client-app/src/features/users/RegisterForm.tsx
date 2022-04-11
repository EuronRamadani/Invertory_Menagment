import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Form, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
	const { userStore } = useStore();
	return (
		<Formik
			initialValues={{
				displayName: "",
				username: "",
				email: "",
				password: "",
				error: null,
			}}
			onSubmit={(values, { setErrors }) =>
				userStore.register(values).catch((error) => setErrors({ error }))
			}
			validationSchema={Yup.object({
				displayName: Yup.string().required(),
				username: Yup.string().required(),
				email: Yup.string().required().email(),
				password: Yup.string().required(),
			})}
		>
			{({
				handleSubmit,
				handleChange,
				isSubmitting,
				errors,
				isValid,
				dirty,
			}) => (
				<Form
					className="ui form error"
					onSubmit={handleSubmit}
					autoComplete="off"
				>
					<Header
						as="h2"
						content="Sign Up to Invertory Managment"
						color="teal"
						textAlign="center"
					/>
					<Form.Input
						name="displayName"
						placeholder="Display Name"
						onChange={handleChange}
					/>
					<Form.Input
						name="username"
						placeholder="Username"
						onChange={handleChange}
					/>
					<Form.Input
						name="email"
						placeholder="Email"
						onChange={handleChange}
					/>
					<Form.Input
						name="password"
						placeholder="password"
						type="password"
						onChange={handleChange}
					/>
					<ErrorMessage
						name="error"
						render={() => <ValidationErrors errors={errors.error} />}
					/>

					<Button
						disabled={!isValid || !dirty || isSubmitting}
						loading={isSubmitting}
						positive
						content="Register"
						type="submit"
						fluid
					/>
				</Form>
			)}
		</Formik>
	);
});
