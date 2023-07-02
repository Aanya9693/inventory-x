import React, { useState, useEffect } from 'react';
import { Button, Card, CardActionArea, CardContent, CardHeader, IconButton, Stack, Typography } from '@mui/material';

const Dashboard = (user, login, logout, company) => {

	const handleNewProd = () => {

	}
	// const [] = [];
	return (
		<Stack direction={"column"}>
			<Stack
				direction={"row"}
				sx={{
					justifyContent: "space-between",
				}}
			>
				<Typography variant="h1">Dashboard</Typography>
				<Button
					onClick={handleNewProd}
					variant="contained"
					startIcon={<span className="material-icons">add</span>}
				>
					New Product
				</Button>
			</Stack>
			<Stack
				direction="row"
				sx={{
					flexFlow: "row wrap",
					justifyContent: "flex-start",
					gap: "20px",
				}}
			>
				{company.products.map((product) => (
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
						</CardContent>
						<CardActionArea>
							<Stack
								direction={"row"}
								sx={{
									justifyContent: "space-between",
								}}
							>
								<IconButton>
									<span className="material-icons">add</span>
								</IconButton>
								{
									product.numTotal
								}
								<IconButton>
									<span className="material-icons">add</span>
								</IconButton>
							</Stack>
						</CardActionArea>
					</Card>
				))}
			</Stack>
		</Stack>
	);
}
 
export default Dashboard;