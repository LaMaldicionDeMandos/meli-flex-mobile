import {
	IonBadge, IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol,
	IonContent,
	IonFooter,
	IonGrid,
	IonHeader,
	IonIcon, IonLabel,
	IonNote,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
	useIonRouter,
	useIonToast,
	useIonViewDidEnter,
	useIonViewWillEnter
} from '@ionic/react';

import styles from "../styles/Place.module.scss";
import { useParams } from 'react-router';
import { Iconly } from 'react-iconly';
import React, {useEffect, useRef, useState} from 'react';

import ordersService from '../services/orders.service';
import SellerReputation from "../components/SellerReputation";

import OrderMap from "../components/OrderMap";
import Currency from "react-currency-formatter";

const Order = () => {
	const [order, setOrder] = useState();

	const { order_id } = useParams();

	useEffect(() => {
		ordersService.getOrder(order_id).then(setOrder);
	}, []);

	const headingRef = useRef();
	const router = useIonRouter();

	useIonViewWillEnter(() => {
		headingRef.current.classList.add("animate__slideInDown");
		headingRef.current.style.display = "";
	});

	const onAccept = () => {
		console.log('Acepto');
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

					<div className={ styles.customAcceptButton } onClick={onAccept}>
						<IonBadge strong={false} color="primary"><IonText className="ion-text-uppercase">aceptar</IonText></IonBadge>
					</div>

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

					<IonRow className={ `${ styles.aboutContainer } animate__animated animate__fadeIn animate__faster` }>
						<IonCol size="12">
							<IonCardTitle>About</IonCardTitle>
							<IonNote>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce accumsan sem eget purus lacinia, tristique aliquet ipsum consequat.
							</IonNote>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Order;
