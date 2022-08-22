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
import AcceptOrderButton from "./AcceptOrderButton";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const PendingOrderItem = ({order}) => {
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
		<IonItem lines="full" className={ styles.OrderItem } detail={ true } routerLink={`/myorder/${order._id}`}>
			<IonLabel>
				<IonText><b>{ order?.owner?.nickname }</b></IonText>
				<p>{`${order?.origin?.address_line} (${ order?.origin?.city?.name})`}</p>
				<h2 style={{marginTop: '8px'}}>Entregas</h2>
				{destinations}
			</IonLabel>
		</IonItem>
	);
};

export default PendingOrderItem;
