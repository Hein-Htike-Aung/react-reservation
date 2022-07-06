import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeReducer';

const Sidebar = () => {
	const { dispatch } = useContext(DarkModeContext);

	return (
		<div className='sidebar'>
			<div className='top'>
				<Link to={'/'} className='link'>
					<span className='logo'>lavaadmin</span>
				</Link>
			</div>
			<hr />
			<div className='center'>
				<ul>
					<p className='title'>MAIN</p>
					<li>
						<DashboardIcon className='icon' />
						<span>Dashboard</span>
					</li>
					<p className='title'>LIST</p>
					<Link to={'/users'} className='link'>
						<li>
							<PersonOutlineIcon className='icon' />
							<span>Users</span>
						</li>
					</Link>
					<Link to={'/hotels'} className='link'>
						<li>
							<StoreIcon className='icon' />
							<span>Hotels</span>
						</li>
					</Link>
					<Link to={'/rooms'} className='link'>
						<li>
							<CreditCardIcon className='icon' />
							<span>Rooms</span>
						</li>
					</Link>
					<li>
						<LocalShippingIcon className='icon' />
						<span>Delivery</span>
					</li>
					<p className='title'>USEFUL</p>
					<li>
						<InsertChartIcon className='icon' />
						<span>Stats</span>
					</li>
					<li>
						<NotificationsNoneIcon className='icon' />
						<span>Notifications</span>
					</li>
					<p className='title'>SERVICES</p>
					<li>
						<SettingsSystemDaydreamOutlinedIcon className='icon' />
						<span>System Health</span>
					</li>
					<li>
						<PsychologyOutlinedIcon className='icon' />
						<span>Logs</span>
					</li>
					<li>
						<SettingsApplicationsIcon className='icon' />
						<span>Setting</span>
					</li>
					<p className='title'>USER</p>
					<li>
						<AccountCircleOutlinedIcon className='icon' />
						<span>Profile</span>
					</li>
					<li>
						<ExitToAppIcon className='icon' />
						<span>Logout</span>
					</li>
				</ul>
			</div>
			<div className='bottom'>
				<div
					onClick={() => dispatch({ type: 'LIGHT' })}
					className='colorOption'
				></div>
				<div
					onClick={() => dispatch({ type: 'DARK' })}
					className='colorOption'
				></div>
			</div>
		</div>
	);
};

export default Sidebar;
