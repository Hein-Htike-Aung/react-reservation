import React, { useState } from 'react';
import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../../datasource';
import { Link } from 'react-router-dom';

const Datatable = () => {
	const [data, setData] = useState(userRows);

	const handleDelete = (id) => {
		setData((prev) => prev.filter((item) => item.id !== id));
	}

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
							onClick={() => handleDelete(params.row.id)}
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
			<div className="datatableTitle">
				Add New User
				<Link to={'/users/new'} className='link addNew'>
				Add New</Link>
			</div>
			<DataGrid
				className='datagrid'
				rows={data}
				columns={userColumns.concat(actionColumn)}
				pageSize={9}
				rowsPerPageOptions={[9]}
				checkboxSelection
			/>
		</div>
	);
};

export default Datatable;
