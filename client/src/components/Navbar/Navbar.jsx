import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Container,
	Toolbar,
	Box,
	Button,
	Typography,
	Menu,
	MenuItem,
	Avatar,
	Stack
} from "@mui/material";
import { NavLink, useLocation, Link } from "react-router-dom";
import { getUserData, logoutAuth } from "../../services/api";

const Navbar = ({ user, login, logout, company }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const menuOpen = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleLogout = () => {
		setAnchorEl(null);
		const logginOut = async () => {
			try {
				await logoutAuth();
				logout();
				window.location.reload();
			} catch (err) {
				alert({ message: err.response.data.message, type: "error" });
			}
		};
		logginOut();
	};
	return (
		<AppBar
			position="fixed"
			// color="transparent"
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
		>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							width: "100%",
						}}
					>
						<Typography variant="h6" fontWeight={"600"}>
							Inventory-X
						</Typography>
						{user ? (
							<>
								<Stack
									className="item"
									id="menu-button"
									direction={"row"}
									sx={{
										alignItems: "center",
										gap: "10px",
									}}
									onClick={handleClick}
									aria-controls={
										menuOpen ? "basic-menu" : undefined
									}
									aria-haspopup="true"
									aria-expanded={
										menuOpen ? "true" : undefined
									}
								>
									<Avatar
										alt={user.name}
										src={user.image}
									></Avatar>
									{user.name}
								</Stack>
								<Menu
									id="basic-menu"
									anchorEl={anchorEl}
									open={menuOpen}
									onClose={handleClose}
									MenuListProps={{
										"aria-labelledby": "menu-button",
									}}
									sx={{
										marginLeft: "20px",
										marginTop: "20px",
									}}
								>
									<MenuItem onClick={handleLogout}>
										<Button color="error">Logout</Button>
									</MenuItem>
								</Menu>
							</>
						) : (
							<NavLink to="/auth">
								<Button variant="contained">Login</Button>
								{/* <div className="button">
										<div className="item">Login</div>
									</div> */}
							</NavLink>
						)}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
 
export default Navbar;