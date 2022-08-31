import {map, concat} from 'lodash';
import {
	IonCardTitle,
	IonCol,
	IonContent,
	IonGrid,
	IonNote,
	IonPage,
	IonList,
	IonRow,
	useIonViewDidEnter,
	useIonToast,
} from '@ionic/react';
import { useStoreState } from 'pullstate';
import { PlacesStore } from '../store';
import { getPlaces } from '../store/Selectors';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import {useEffect, useState} from 'react';
import HomeHeader from "../components/HomeHeader";
import OrderItem from "../components/OrderItem";

import ordersService from '../services/orders.service';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const TOAST_DURATION = 7000;
const TOAST_ERROR_REJECTED = {
	message: 'Esta cuenta está rechazado, hiciste algo muy malo 😡!',
	color: 'danger',
	duration: TOAST_DURATION
};

const TOAST_ERROR_SUSPENDED = {
	message: 'Esta cuenta está suspendida hasta que resuelvas tu información de perfil!',
	color: 'warning',
	duration: TOAST_DURATION
};

const TOAST_ERROR_GENERIC = {
	message: 'Ops, hubo un problema, por favor intenta mas tarde 😅!',
	color: 'warning',
	duration: TOAST_DURATION
};

const Home = () => {
	const [orders, setOrders] = useState([]);

	const [ slideSpace, setSlideSpace ] = useState(0);
	const [ longSlideSpace, setLongSlideSpace ] = useState(5);

	const [present] = useIonToast();

	useEffect(() => {
		ordersService.getActiveOrders()
			.then(setOrders)
			.catch(e => {
				console.error('ERROR ===> ' + JSON.stringify(e));
				if (e.status === 'rejected') {
					present(TOAST_ERROR_REJECTED);
				}
				if (e.status === 'suspended') {
					present(TOAST_ERROR_SUSPENDED);
				}
				else present(TOAST_ERROR_GENERIC);
			});
	}, []);

	const orderItems = map(orders, (order) => <OrderItem key={order._id} order={order}/>);

	useIonViewDidEnter(() => {
		setSlideSpace(-40);
		setLongSlideSpace(1);
	});

	return (
		<IonPage>
			<HomeHeader />
			<IonContent>
				<IonGrid>
					<IonRow className="ion-padding-start">
						<IonCol size="8">
							<IonCardTitle color="dark">Envíos disponibles</IonCardTitle>
						</IonCol>
					</IonRow>
				</IonGrid>

				<IonList className="ion-padding-bottom ion-margin-bottom animate__animated animate__fadeIn animate__faster">
					{orderItems}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Home;
