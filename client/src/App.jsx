import { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./screens/Dashboard";
import Auth from "./screens/Auth";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getCompany, getUserData } from "./services/api";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar/Navbar";
import MenuBar from "./components/MenuBar";

function App() {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem("user")) || null
	);
	const [company, setCompany] = useState(
		JSON.parse(localStorage.getItem("company")) || null
	);

	const login = (userData) => {
		setUser(userData);
		localStorage.setItem("user", JSON.stringify(userData));
	};
	const logout = () => {
		setUser(null);
		localStorage.setItem("user", JSON.stringify(null));
	};

	useEffect(() => {
		const refreshUserData = async () => {
			try {
				const res = await getUserData();

				login(res.data.data.user);
			} catch (err) {
				// alert({ message: err.response.data.message, type: "error" });
			}
		};
		
		refreshUserData();

	}, []);

	useEffect(() => {
		const refreshCompany = async () => {
			try {
				const res = await getCompany(user.company);
				setCompany(res.data.data.company);
			} catch (err) {
				alert(err.response.data.message);
			}
		};
		if (user && user.company) {
			refreshCompany();
		}
	}, [user]);

	return (
		<GoogleOAuthProvider clientId="79486214026-37n8n96tjtv0h9o6a8dnabi857555n02.apps.googleusercontent.com">
			<div className="app">
				<Router>
					<Navbar user={user} login={login} logout={logout}></Navbar>
					<MenuBar
						user={user}
						login={login}
						logout={logout}
					></MenuBar>
					<Routes>
						<Route
							exact
							path="/"
							element={
								<Dashboard
									user={user}
									company={company}
									login={login}
									logout={logout}
									setCompany={setCompany}
								></Dashboard>
							}
						></Route>
						<Route
							exact
							path="/auth"
							element={
								<Auth
									user={user}
									login={login}
									logout={logout}
									setCompany={(val) => setCompany(val)}
								></Auth>
							}
						></Route>
					</Routes>
				</Router>
			</div>
		</GoogleOAuthProvider>
	);
}

export default App;
