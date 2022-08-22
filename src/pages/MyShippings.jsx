import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Iconly } from 'react-iconly';

import styles from "../styles/Places.module.scss";
import {useEffect, useState} from "react";
import ordersService from "../services/orders.service";
import {map} from "lodash";
import PendingOrderItem from "../components/PendingOrderItem";

const MyShippings = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		ordersService.getMyActiveOrders()
			.then(setOrders);
	}, []);

	const orderItems = map(orders, (order) => <PendingOrderItem key={order._id} order={order}/>);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Mis envíos activos</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Mis envíos 2</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonList className="ion-padding-bottom ion-margin-bottom animate__animated animate__fadeIn animate__faster">
					{orderItems}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default MyShippings;
