import {
	IonItem, IonLabel, IonText,
} from '@ionic/react';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import styles from "../styles/Places.module.scss";
import Currency from 'react-currency-formatter';

import { chain } from 'lodash';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const OrderItem = ({order}) => {
	const packages = order.orders.length;
	const packegesSufix = order.orders.length > 1 ? 'paquetes' : 'paquete';

	const destinations = chain(order.orders)
		.reduce((cities, order) => {
		const city = order.shippingAddress.city.name;
		if (!cities[city]) cities[city] = 0;
		cities[city]++;
		return cities;
	}, {})
		.transform((list, value, key) => {
			list.push(`${key} (${value})`);
			return list;
		}, [])
		.join(', ')
		.value();
	return (
		<IonItem lines="full" className={ styles.OrderItem } detail={ true } routerLink={ `/view-place/${ order._id }` }>
			<IonLabel>
				<h2>Desde { order.origin.city.name }</h2>
				<p>{`${packages} ${packegesSufix}`}</p>
				<h2 style={{marginTop: '8px'}}>Hasta</h2>
				<p>{destinations}</p>
			</IonLabel>

			<span className={ styles.priceRight }>
				<IonLabel>
				<h2>
					<b><Currency quantity={order.deliveryPrice} currency={"ARS"}/></b>
				</h2>
				</IonLabel>

			</span>
		</IonItem>
	);
};

export default OrderItem;
