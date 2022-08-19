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
import React from "react";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const AddressItem = ({address}) => {

	return (
		<IonItem lines="full" className={ styles.OrderItem } detail={ false } >
			<IonLabel>
				<IonText>{ address.address_line }</IonText>
				<p>{`(${address.city.name})`}</p>
			</IonLabel>
		</IonItem>
	);
};

export default AddressItem;
