import {
	faCircleArrowLeft,
	faCircleArrowRight,
	faCircleXmark,
	faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Navbar from '../../components/navbar/Navbar';
import Reserve from '../../components/reserve/Reserve';
import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import './hotel.css';

const Hotel = () => {
	const [slideNumber, setSlideNumber] = useState(0);
	const [open, setOpen] = useState(false);
	const [openModal, setOpenModal] = useState(false);

	const hotelId = useLocation().pathname.split('/')[2];

	const { dates, options } = useContext(SearchContext);

	const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
	function dayDifference(date1, date2) {
		const timeDiff = Math.abs(date2?.getTime() - date1?.getTime());
		const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
		return diffDays;
	}

	const daysCount = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

	const { data, loading, error, reFetch } = useFetch(`/hotels/find/${hotelId}`);

	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleOpenSlider = (i) => {
		setSlideNumber(i);

		setOpen(true);
	};

	const handleSlider = (direction) => {
		let newSlideNumber;

		if (direction === 'l') {
			newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
		} else {
			newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
		}

		setSlideNumber(newSlideNumber);
	};

	const handleReserve = (e) => {

		e.preventDefault();

		if (!user) navigate('/');
		else {
			setOpenModal(true);
		}
	};

	return (
		<div>
			<Navbar />
			<Header type='list' />
			{loading ? (
				'Loading'
			) : (
				<div className='hotelContainer'>
					{open && (
						<div className='slider'>
							<FontAwesomeIcon
								onClick={() => setOpen(false)}
								className='close'
								icon={faCircleXmark}
							/>
							<FontAwesomeIcon
								className='arrow'
								onClick={() => handleSlider('l')}
								icon={faCircleArrowLeft}
							/>
							<div className='sliderWrapper'>
								<img
									src={data.photos[slideNumber]}
									alt=''
									className='sliderImg'
								/>
							</div>
							<FontAwesomeIcon
								className='arrow'
								onClick={() => handleSlider('r')}
								icon={faCircleArrowRight}
							/>
						</div>
					)}
					<div className='hotelWrapper'>
						<button className='bookNow'>Reserve or Book Now!</button>
						<h1 className='hotelTitle'>{data.name}</h1>
						<div className='hotelAddress'>
							<FontAwesomeIcon icon={faLocationDot} />
							<span>{data.address}</span>
						</div>
						<span className='hotelDistance'>
							Excellent location – {data.distance}m from center
						</span>
						<span className='hotelPriceHighlight'>
							Book a stay over ${data.cheapestPrice} at this property and get a
							free airport taxi
						</span>
						<div className='hotelImages'>
							{data.photos?.map((photo, index) => (
								<div key={index} className='hotelImgWrapper'>
									<img
										onClick={() => handleOpenSlider(index)}
										className='hotelImg'
										src={photo}
										alt=''
									/>
								</div>
							))}
						</div>
						<div className='hotelDetails'>
							<div className='hotelDetailsTexts'>
								<h1 className='hotelTitle'>{data.title}</h1>
								<p className='hotelDesc'>{data.desc}</p>
							</div>
							<div className='hotelDetailsPrice'>
								<h1>Perfect for a {daysCount}-night stay!</h1>
								<span>
									Located in the real heart of Krakow, this property has an
									excellent location score of 9.8!
								</span>
								<h2>
									<b>${daysCount * data.cheapestPrice * options.rooms}</b> (
									{daysCount} nights)
								</h2>
								<button onClick={handleReserve}>Reserve or Book Now!</button>
							</div>
						</div>
					</div>
					<MailList />
					<Footer />
				</div>
			)}

			{openModal && <Reserve setOpen={setOpenModal} hotelId={hotelId} />}
		</div>
	);
};

export default Hotel;
