import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Paper,
	Stack,
	Switch,
	TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { createProduct } from "../services/api";

const AddNewProduct = ({ open, onClose, company, setCompany }) => {
	const [name, setName] = useState();
	const [num, setNum] = useState();
	const [variants, setVariants] = useState([]);
	const [useVariants, setUseVariants] = useState(false);
	const [currentVariantName, setCurrentVariantName] = useState();
	const [currentVariantNum, setCurrentVariantNum] = useState();

	const handleSubmit = async () => {
		try {
			const res = await createProduct(company.id, { name });
			setCompany(res.data.data.company);
			// login(res.data.data.user);
		} catch (err) {
			alert(err.response ? err.response.data.message : err.message);
		}
	};

	const handleAddVariant = () => {
		if (
			currentVariantName.trim().length() === 0 ||
			currentVariantNum.trim().length() === 0
		)
			alert("Fill all the fields properly");
		else {
			setVariants([
				...variants,
				{ name: currentVariantName, num: currentVariantNum },
			]);
			setCurrentVariantName(null);
			setCurrentVariantNum(null);
		}
	};
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>
				Register your Company
				<Divider
					sx={{
						m: "10px 0",
					}}
				></Divider>
			</DialogTitle>
			<DialogContent
				sx={{
					p: "20px",
					width: "500px",
				}}
			>
				<Stack gap="20px">
					<TextField
						label="Product Name"
						fullWidth
						onInput={(e) => setName(e.target.value)}
					></TextField>
					<TextField
						label="Total Amount in stock"
						fullWidth
						type="Number"
						onInput={(e) => setNum(e.target.value)}
					></TextField>
					<Stack direction={"row"} sx={{ alignItems: "center" }}>
						<Switch
							label="Add Variants"
							id="add-variant-switch"
							onClick={() => setUseVariants(!useVariants)}
						></Switch>
						<label htmlFor="add-variant-switch">
							Add Variants?
						</label>
					</Stack>
				</Stack>

				{useVariants && (
					<Stack gap="20px" sx={{ mt: "20px" }}>
						{variants.map((item) => (
							<Stack
								direction={"row"}
								justifyContent={"space-between"}
								key={item.name}
								gap="0px"
								sx={{
									p: "0px 20px",
									outline: "1px solid rgba(0, 0, 0, 0.2)",
									borderRadius: "5px",
								}}
							>
								<p>{item.name}</p>
								<p>{item.num}</p>
							</Stack>
						))}
						<Stack
							direction={"row"}
							justifyContent={"space-between"}
						>
							<TextField
								label="Variant Name"
								value={currentVariantName}
								onInput={(e) =>
									setCurrentVariantName(e.target.value)
								}
							></TextField>
							<TextField
								label="Variant AMount"
								type="Number"
								value={currentVariantNum}
								onInput={(e) =>
									setCurrentVariantNum(e.target.value)
								}
							></TextField>
						</Stack>
						<Button
							variant="outlined"
							fullWidth
							startIcon={
								<span className="material-icons">add</span>
							}
							onClick={handleAddVariant}
						>
							Add Variant
						</Button>
					</Stack>
				)}
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={handleSubmit}>
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddNewProduct;
