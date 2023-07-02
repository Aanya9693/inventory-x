import React, { useState, useEffect } from "react";
import {
	Button,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	IconButton,
	Stack,
	Typography,
	Box,
	Divider,
} from "@mui/material";
// import { getCompany } from '../services/api';
import Auth from "./Auth";
import AddCompany from "./AddCompany";
import AddNewProduct from "./AddNewProduct";

const Dashboard = ({ user, login, logout, company, setCompany }) => {
	const handleNewProduct = async () => {
		// try {
		// }
		// catch(err) {
		// 	alert(err.response.data.message);
		// }
	};
	const [openAddCompany, setOpenAddCompany] = useState(false);
	const [openNewProduct, setOpenNewProduct] = useState(false);

	console.log(company.products)

	// const [] = [];
	return (
		<Stack
			direction={"column"}
			sx={{
				margin: "100px 0",
				p: "20px 40px",
				width: `calc(100% - 240px)`,
				ml: `240px`,
			}}
		>
			<Stack
				direction={"row"}
				sx={{
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography variant="h3">Dashboard</Typography>
				{company && (
					<>
						<Button
							onClick={() => setOpenNewProduct(true)}
							variant="contained"
							startIcon={
								<span className="material-icons">add</span>
							}
						>
							New Product
						</Button>
						<AddNewProduct
							open={openNewProduct}
							onClose={() => setOpenNewProduct(false)}
							company={company}
							setCompany={setCompany}
						></AddNewProduct>
					</>
				)}
			</Stack>
			<Divider></Divider>
			<Stack
				direction="row"
				sx={{
					flexFlow: "row wrap",
					justifyContent: "flex-start",
					gap: "20px",
				}}
			>
				{company ? (
					company.products &&
					company.products.map((product) => (
						<Card key={product.id}>
							<CardHeader>{product.name}</CardHeader>
							<CardContent>
								{product.variants.map((variant) => (
									<Stack
										direction={"row"}
										key={variant.id}
										sx={{
											justifyContent: "space-between",
										}}
									>
										<Typography variant="h5">
											{variant.name}
										</Typography>
										{variant.num}
									</Stack>
								))}
								<Stack
									direction={"row"}
									sx={{
										justifyContent: "space-between",
									}}
								>
									<IconButton>
										<span className="material-icons">
											add
										</span>
									</IconButton>
									{product.numTotal}
									<IconButton>
										<span className="material-icons">
											add
										</span>
									</IconButton>
								</Stack>
							</CardContent>
							<CardActionArea></CardActionArea>
						</Card>
					))
				) : (
					<Stack
						direction={"column"}
						sx={{
							justifyContent: "flex-start",
							alignItems: "center",
							width: "100%",
							padding: "100px",
							gap: "20px",
						}}
					>
						<Typography variant="text">
							You have not registered any company yet!
						</Typography>
						<Box>
							<Button
								variant="contained"
								onClick={() => setOpenAddCompany(true)}
							>
								Add your company
							</Button>
							<AddCompany
								open={openAddCompany}
								onClose={() => setOpenAddCompany(false)}
								company={company}
								setCompany={setCompany}
							></AddCompany>
						</Box>
					</Stack>
				)}
			</Stack>
		</Stack>
	);
};

export default Dashboard;
