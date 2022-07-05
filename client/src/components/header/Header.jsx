import {
	faBed,
	faCalendarDay,
	faCar,
	faPerson,
	faPlane,
	faTaxi,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import './header.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Header = ({ type }) => {
	const navigate = useNavigate();

	const [destination, setDestination] = useState('');

	const [openDate, setOpenDate] = useState(false);
	const [dates, setDates] = useState([
		{ startDate: new Date(), endDate: new Date(), key: 'selection' },
	]);

	const [openOptions, setOpenOptions] = useState(false);
	const [options, setOptions] = useState({
		adult: 1,
		children: 0,
		rooms: 1,
	});

	const { dispatch } = useContext(SearchContext);
	const { user } = useContext(AuthContext);

	const handleOptions = (type, operation) => {
		setOptions((prev) => ({
			...prev,
			[type]: operation === 'increase' ? prev[type] + 1 : prev[type] - 1,
		}));
	};

	const handleSearch = () => {
		dispatch({
			type: 'NEW_SEARCH',
			payload: {
				destination,
				dates,
				options,
			},
		});

		navigate('/hotels', { state: { destination, date: dates, options } });
	};

	return (
		<div className='header'>
			<div
				className={
					type === 'list' ? 'headerContainer listMode' : 'headerContainer'
				}
			>
				<div className='headerList'>
					<div className='headerListItem active'>
						<FontAwesomeIcon icon={faBed} />
						<span>Stays</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faPlane} />
						<span>Flights</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faCar} />
						<span>Car rentals</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faBed} />
						<span>Attractions</span>
					</div>
					<div className='headerListItem'>
						<FontAwesomeIcon icon={faTaxi} />
						<span>Airport taxis</span>
					</div>
				</div>
				{type !== 'list' && (
					<>
						<h1 className='headerTitle'>
							A lifetime of discounts? It's Genius.
						</h1>
						<p className='headerDesc'>
							Get rewarded for your travels – unlock instant savings of 10% or
							more with a free Lamabooking account
						</p>
						{!user && <button className='headerBtn'>Sign in / Register</button>}

						<div className='headerSearch'>
							<div className='headerSearchItem'>
								<FontAwesomeIcon icon={faBed} className='headerIcon' />
								<input
									type='text'
									placeholder='Where are you going?'
									className='headerSearchInput'
									onChange={(e) => setDestination(e.target.value)}
								/>
							</div>
							<div className='headerSearchItem'>
								<FontAwesomeIcon icon={faCalendarDay} className='headerIcon' />
								<span
									onClick={() => setOpenDate(!openDate)}
									className='headerSearchText'
								>{`${format(dates[0].startDate, 'MM/dd/yyyy')} to ${format(
									dates[0].endDate,
									'MM/dd/yyyy',
								)}`}</span>
								{openDate && (
									<DateRange
										editableDateInputs={true}
										onChange={(item) => setDates([item.selection])}
										moveRangeOnFirstSelection={false}
										ranges={dates}
										className='date'
										minDate={new Date()}
									/>
								)}
							</div>
							<div className='headerSearchItem'>
								<FontAwesomeIcon icon={faPerson} className='headerIcon' />
								<span
									onClick={() => setOpenOptions(!openOptions)}
									className='headerSearchText'
								>{`${options.adult}  adults . ${options.children} children . ${options.rooms} rooms`}</span>
								{openOptions && (
									<div className='options'>
										<div className='optionItem'>
											<span className='optionText'>Adult</span>
											<div className='optionCounter'>
												<button
													disabled={options.adult <= 1}
													onClick={() => handleOptions('adult', 'decrease')}
													className='optionCounterButton'
												>
													-
												</button>
												<span className='optionCounterNumber'>
													{options.adult}
												</span>
												<button
													onClick={() => handleOptions('adult', 'increase')}
													className='optionCounterButton'
												>
													+
												</button>
											</div>
										</div>
										<div className='optionItem'>
											<span className='optionText'>Children</span>
											<div className='optionCounter'>
												<button
													disabled={options.children <= 0}
													onClick={() => handleOptions('children', 'decrease')}
													className='optionCounterButton'
												>
													-
												</button>
												<span className='optionCounterNumber'>
													{options.children}
												</span>
												<button
													onClick={() => handleOptions('children', 'increase')}
													className='optionCounterButton'
												>
													+
												</button>
											</div>
										</div>
										<div className='optionItem'>
											<span className='optionText'>Room</span>
											<div className='optionCounter'>
												<button
													disabled={options.rooms <= 1}
													onClick={() => handleOptions('rooms', 'decrease')}
													className='optionCounterButton'
												>
													-
												</button>
												<span className='optionCounterNumber'>
													{options.rooms}
												</span>
												<button
													onClick={() => handleOptions('rooms', 'increase')}
													className='optionCounterButton'
												>
													+
												</button>
											</div>
										</div>
									</div>
								)}
							</div>
							<div className='headerSearchItem'>
								<button className='headerBtn' onClick={handleSearch}>
									Search
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
