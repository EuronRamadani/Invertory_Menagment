import React from "react";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Header, List } from "semantic-ui-react";

function App() {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:5000/api/categories").then((res) => {
			console.log(res);

			setCategories(res.data);
		});
	}, []);

	return (
		<div>
			<Header as="h2" icon="users" content="Invertory Menagment" />
			<List>
				{categories.map((category: any) => (
					<List.Item key={category.id}>{category.categoryName}</List.Item>
				))}
			</List>
		</div>
	);
}

export default App;
