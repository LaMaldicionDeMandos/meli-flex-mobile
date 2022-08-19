import {
	IonBadge,
	IonCard,
	IonCardContent,
	IonCardTitle,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader, IonList,
	IonNote,
	IonPage,
	IonRow,
	IonText,
	useIonRouter,
	useIonViewWillEnter,
	useIonToast
} from '@ionic/react';

import styles from "../styles/Place.module.scss";
import { useParams } from 'react-router';
import { Iconly } from 'react-iconly';
import React, {useEffect, useRef, useState} from 'react';

import ordersService from '../services/orders.service';
import SellerReputation from "../components/SellerReputation";

import OrderMap from "../components/OrderMap";
import Currency from "react-currency-formatter";

import {chain} from 'lodash';
import AddressItem from "../components/AddressItem";
import AcceptOrderButton from "../components/AcceptOrderButton";


const TOAST_DURATION = 4000;
const TOAST_SUCCESS = {
	message: 'Reparto aceptado! 😃',
	color: 'success',
	duration: TOAST_DURATION
};
const TOAST_ERROR = {
	message: 'El reparto ya no está disponible 😢',
	color: 'danger',
	duration: TOAST_DURATION
};

const Order = () => {
	const [order, setOrder] = useState();
	const [showAcceptButton, setShowAcceptButton] = useState(true);

	const [present] = useIonToast();

	const { order_id } = useParams();

	const addresses = chain(order?.orders)
		.map((order) => order.shippingAddress)
		.map(address => <AddressItem key={address.id} address={address} />)
		.value();

	useEffect(() => {
		ordersService.getOrder(order_id).then(setOrder);
	}, []);

	const headingRef = useRef();
	const router = useIonRouter();

	useIonViewWillEnter(() => {
		headingRef.current.classList.add("animate__slideInDown");
		headingRef.current.style.display = "";
	});

	const onAccept = (r) => {
		const toast = r === AcceptOrderButton.SUCCESS ? TOAST_SUCCESS : TOAST_ERROR;
		present(toast);
		setShowAcceptButton(false);
	}

	return (
		<IonPage>
			<IonHeader>
				<div className={ styles.customHeader }>
					<img  src="/assets/login2.jpeg" className="animate__animated animate__slideInRight animate__faster" />

					<div className="ion-justify-content-between">
						<div className={ styles.customBackButton } onClick={ () => router.goBack() }>
							<Iconly set="bold" name="CaretLeft" />
						</div>
					</div>

					{ showAcceptButton
						? <AcceptOrderButton  order={order} customStyle={styles.customAcceptButton} buttonComponent={IonBadge} resultHandler={onAccept}/>
						: '' }
					<div className={ `${ styles.mainContent } animate__animated` } ref={ headingRef } style={{ display: "none" }}>
						<IonGrid>
							<IonRow>
								<IonCol size="10">
									<IonCard className={ styles.placeHeading }>
										<IonCardContent>
											<IonCardTitle>{ order?.owner?.nickname }</IonCardTitle>
											<p>{`${order?.origin?.address_line} (${ order?.origin?.city?.name})`}</p>
										</IonCardContent>
									</IonCard>
								</IonCol>
							</IonRow>
						</IonGrid>
					</div>
				</div>
			</IonHeader>

			<IonContent>

				<IonGrid>
					<IonRow className="animate__animated animate__fadeIn animate__faster">
						<IonCol size="6" className="ion-justify-content-center ion-align-items-center">

							<div className={ styles.statContainer }>
								<SellerReputation reputation={order?.owner?.seller_reputation}/>
							</div>
						</IonCol>

						<IonCol size="3" className="ion-justify-content-center ion-align-items-center">

							<div className={ styles.statContainer }>
								<Iconly set="bold" name="Location" color="royalblue" />
								<IonNote>{ order?.orders?.length } Paquetes</IonNote>
							</div>
						</IonCol>
						<IonCol size="3">
							<h1 className="ion-text-end">
								<IonBadge color="success" style={{padding: '0.6rem'}}><b><Currency quantity={order?.deliveryPrice} currency={"ARS"}/></b></IonBadge>
							</h1>
						</IonCol>
					</IonRow>

					<IonRow className="animate__animated animate__fadeIn animate__faster ion-justify-content-center ion-align-items-center">
						<IonCol size="12" style={{padding: 0}}>
							<IonCard className={ `${ styles.placeholderMapCard } animate__animated animate__slideInLeft` }>
								<OrderMap order={order} />
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>

				<IonList className="ion-padding-bottom ion-margin-bottom animate__animated animate__fadeIn animate__faster">
					{addresses}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Order;
