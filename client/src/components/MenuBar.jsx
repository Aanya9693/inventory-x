import React, { useState, useEffect } from "react";
import { Button, Divider, Drawer, Stack, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const MenuBar = ({ company, user }) => {
	return (
		<Drawer
			variant="permanent"
			sx={{
				flexShrink: 0,
				width: "240px",
				[`& .MuiDrawer-paper`]: {
					width: "240px",
					boxSizing: "border-box",
				},
			}}
		>
			<Toolbar />
			{company && (
				<>
					<Typography variant="subTitle2">{company.name}</Typography>
					<Divider></Divider>
				</>
			)}
			<Stack
				direction={"column"}
				sx={{
					alignItems: "flex-start",
					justifyContent: "flex-start",
					mt: "20px",
					p: "20px",
				}}
			>
				<Button>
					<NavLink to="/">Dashboard</NavLink>
				</Button>
				<Button>
					<NavLink to="/">Products</NavLink>
				</Button>
				<Button>
					<NavLink to="/">Sales</NavLink>
				</Button>
				<Button>
					<NavLink to="/">Employees</NavLink>
				</Button>
				<Button>
					<NavLink to="/">Settings</NavLink>
				</Button>
			</Stack>
		</Drawer>
	);
};

export default MenuBar;
