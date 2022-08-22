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

const Home = () => {
	const [orders, setOrders] = useState([]);

	const [ slideSpace, setSlideSpace ] = useState(0);
	const [ longSlideSpace, setLongSlideSpace ] = useState(5);

	useEffect(() => {
		ordersService.getActiveOrders()
			.then(setOrders);
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
