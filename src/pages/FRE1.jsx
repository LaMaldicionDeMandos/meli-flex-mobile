import {
	IonCard,
	IonCardContent,
	IonCardSubtitle,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonImg,
	IonNote,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
	IonToolbar,
	IonCardTitle,
	IonFooter,
	IonButtons,
	IonButton, IonIcon
} from '@ionic/react';
import { rocketOutline, colorPalette } from 'ionicons/icons';
import freStyles from './Signup.module.scss';
import React from "react";

const FRE1 = () => {

	return (
		<IonPage className={ freStyles.signupPage }>
			<IonHeader>
				{/* <IonToolbar className="ion-no-margin ion-no-padding"> */}
				<IonImg src="/assets/login2.jpeg" />
				{/* </IonToolbar> */}
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
				<IonToolbar>
					<IonTitle size="large">Te damos la bienvenida</IonTitle>
				</IonToolbar>
				</IonHeader>
				<div style={{height: '100%', backgroundColor: '#7c3b6a'}}>
					<IonGrid>
						<IonRow className="ion-justify-content-center ion-align-self-center ion-text-center animate__animated animate__fadeIn">
							<IonCol size="10">
								<div className="ion-justify-content-center ion-align-items-center ion-text-center">
									<div className={ freStyles.message }>
										<h2>Te damos la bienvenida a Happy Shipping 😃</h2>
										<p>Vamos a armar tu perfil para que los vendedores te conzcan</p>
									</div>
									<div className={ freStyles.favouriteButton }>
										<IonIcon icon={rocketOutline} size="large" style={{color: '#d3a6c7'}} />
									</div>
								</div>
							</IonCol>
						</IonRow>
					</IonGrid>
					<IonFooter>
						<IonGrid>
							<IonRow className="ion-margin-top ion-padding-top">
								<IonCol size="12">
									<IonButton size="" color="warning" expand="block">Empezar</IonButton>
								</IonCol>
							</IonRow>
						</IonGrid>

					</IonFooter>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default FRE1;
