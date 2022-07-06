import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './datatable.scss';

const Datatable = ({ columns }) => {
	const path = useLocation().pathname.split('/')[1];

	const { data, loading, error, reFetch } = useFetch(`/${path}`);
	const [list, setList] = useState([]);

	useEffect(() => {
		setList(data);
	}, [data]);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`/${path}/${id}`);
			setList(list.filter((item) => item._id !== id));
		} catch (error) {}
	};

	const actionColumn = [
		{
			field: 'action',
			headerName: 'Action',
			width: 200,
			renderCell: (params) => {
				return (
					<div className='cellAction'>
						<Link className='link' to={`/users/test`}>
							<div className='viewButton'>View</div>
						</Link>
						<div
							onClick={() => handleDelete(params.row._id)}
							className='deleteButton'
						>
							Delete
						</div>
					</div>
				);
			},
		},
	];

	return (
		<div className='datatable'>
			<div className='datatableTitle'>
				{path}
				<Link to={`/${path}/new`} className='link addNew'>
					Add New
				</Link>
			</div>
			<DataGrid
				className='datagrid'
				rows={list}
				columns={columns.concat(actionColumn)}
				pageSize={9}
				rowsPerPageOptions={[9]}
				checkboxSelection
				getRowId={(row) => row._id}
			/>
		</div>
	);
};

export default Datatable;
