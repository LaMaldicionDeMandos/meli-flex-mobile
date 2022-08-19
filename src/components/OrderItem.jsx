import {
	IonItem, IonLabel, IonText, IonBadge, IonIcon, IonButton
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
import React from "react";

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
		.map((destination, index) => <IonBadge key={index} color="medium" style={{ marginTop: "0.4rem", marginRight: '0.1rem' }}>{destination}</IonBadge>)
		.value();

	return (
		<IonItem lines="full" className={ styles.OrderItem } detail={ true } routerLink={`/order/${order._id}`}>
			<IonLabel>
				<IonText>Desde <b>{ order.origin.city.name }</b></IonText>
				<p>{`${packages} ${packegesSufix}`}</p>
				<h2 style={{marginTop: '8px'}}>Hasta</h2>
				{destinations}
			</IonLabel>

			<span className={ styles.priceRight }>
				<IonLabel>
					<h2 className="ion-text-end">
					<IonBadge color="success"><b><Currency quantity={order.deliveryPrice} currency={"ARS"}/></b></IonBadge>
					</h2>
				<IonButton strong={false} color="primary">Aceptar</IonButton>
				</IonLabel>
			</span>
		</IonItem>
	);
};

export default OrderItem;
