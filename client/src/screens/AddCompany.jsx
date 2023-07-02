import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { createCompany } from '../services/api';
// import { login } from '../../../server/controllers/authController';

const AddCompany = ({ open, onClose, company, setCompany, user, login }) => {
	const [name, setName] = useState();
	const handleSubmit = async () => {
		try {
			const res = await createCompany({ name });
			setCompany(res.data.data.company);
			login(res.data.data.user);
		}
		catch (err) {
			alert(err.response ? err.response.data.message : err.message);
		}
	}
	return ( 
		<Dialog open={open} onClose={onClose} sx={{
			p: "40px 100px"
		}}>
			<DialogTitle>
				Register your Company
				<Divider sx={{
					m: "10px 0"
				}}></Divider>
			</DialogTitle>
			<DialogContent sx={{
				p: "20px",
				width: "300px"
			}}>
				<TextField label="Company Name" fullWidth onInput={e => setName(e.target.value)}></TextField>

			</DialogContent>
			<DialogActions>
				<Button variant='contained' onClick={handleSubmit}>Submit</Button>
			</DialogActions>
		</Dialog>
	);
}
 
export default AddCompany;