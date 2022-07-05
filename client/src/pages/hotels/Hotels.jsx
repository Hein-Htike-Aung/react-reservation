import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import SearchedHotel from '../../components/searchedHotel/SearchedHotel';
import useFetch from '../../hooks/useFetch';
import './hotels.css';

const Hotels = () => {
	const location = useLocation();

	const [destination, setDestination] = useState(location.state.destination);
	const [dates, setDates] = useState(location.state.date);
	const [openDate, setOpenDate] = useState(false);
	const [options, setOptions] = useState(location.state.options);
	const [min, setMin] = useState('');
	const [max, setMax] = useState('');

	const { data, loading, error, reFetch } = useFetch(
		`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`,
	);

	const handleSearch = () => {
		reFetch();
	};

	return (
		<div>
			<Navbar />
			<Header type='list' />
			<div className='listContainer'>
				<div className='listWrapper'>
					<div className='listSearch'>
						<h1 className='lsTitle'>Search</h1>
						<div className='lsItem'>
							<label>Destination</label>
							<input type='text' placeholder={destination} />
						</div>
						<div className='lsItem'>
							<label>Check-in Date</label>
							<span onClick={() => setOpenDate(!openDate)}>
								{`${format(dates[0].startDate, 'MM/dd/yyyy')}`} to{' '}
								{format(dates[0].endDate, 'MM/dd/yyyy')}
							</span>
							{openDate && (
								<DateRange
									onChange={(item) => setDates([item.selection])}
									minDate={new Date()}
									ranges={dates}
								/>
							)}
						</div>
						<div className='lsItem'>
							<label>Option</label>
							<div className='lsOptions'>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>
										Min price <small>per night</small>
									</span>
									<input
										onChange={(e) => setMin(e.target.value)}
										type='number'
										className='lsOptionInput'
									/>
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>
										Max price <small>per night</small>
									</span>
									<input
										onChange={(e) => setMax(e.target.value)}
										type='number'
										className='lsOptionInput'
									/>
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Adult</span>
									<input
										min={1}
										type='number'
										placeholder={options.adult}
										className='lsOptionInput'
									/>
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Children</span>
									<input
										min={0}
										type='number'
										placeholder={options.children}
										className='lsOptionInput'
									/>
								</div>
								<div className='lsOptionItem'>
									<span className='lsOptionText'>Room</span>
									<input
										min={1}
										type='number'
										placeholder={options.room}
										className='lsOptionInput'
									/>
								</div>
							</div>
						</div>
						<button onClick={handleSearch}>Search</button>
					</div>
					<div className='listResult'>
						{loading ? (
							'loading'
						) : (
							<>
								{data.map((item) => (
									<SearchedHotel item={item} key={item._id} />
								))}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hotels;
