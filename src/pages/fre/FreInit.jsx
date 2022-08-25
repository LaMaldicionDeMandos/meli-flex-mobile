import {
	IonCol,
	IonGrid,
	IonHeader,
	IonRow,
	IonTitle,
	IonToolbar,
	IonFooter,
	IonButton, IonIcon
} from '@ionic/react';
import { rocketOutline, colorPalette } from 'ionicons/icons';
import freStyles from '../Signup.module.scss';
import React from "react";

const FreInit = ({ nextHandler = () => {} }) => {

	return (
		<>
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
								<IonButton size="" className="custom-button" expand="block" onClick={() => nextHandler({}) }>Empezar</IonButton>
							</IonCol>
						</IonRow>
					</IonGrid>

				</IonFooter>
			</div>
		</>
	);
};

export default FreInit;
