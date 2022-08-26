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
import {idCardOutline, cloudUploadOutline} from 'ionicons/icons';
import freStyles from '../Signup.module.scss';
import React from "react";

const FreDniFrontUpload = ({ nextHandler = () => {} }) => {
	const addDNIFrontUrl = () => {
			nextHandler({dniFrontUrl: '[URL]'});
	}

	const uploadFile = async () => {
	}

	return (
		<>
			<IonHeader collapse="condense">
				<IonToolbar>
					<IonTitle size="large">¿Subí una foto de tu DNI?</IonTitle>
				</IonToolbar>
			</IonHeader>
			<div style={{height: '100%', width: '100%', backgroundColor: '#7c3b6a'}}>
				<IonGrid>
					<IonRow className="ion-justify-content-center ion-align-self-center ion-text-center animate__animated animate__fadeIn">
						<IonCol size="12">
							<div className="ion-justify-content-center ion-align-items-center ion-text-center">
								<div className={ freStyles.message }>
									<h2>Subí tu DNI</h2>
									<p>Subí una foto de la parte frontal de tu DNI</p>
								</div>
								<div className={ freStyles.favouriteButton }>
									<IonIcon icon={idCardOutline} size="large" style={{color: '#d3a6c7'}} />
								</div>
							</div>
						</IonCol>
					</IonRow>
					<IonRow className="ion-margin-top ion-padding-top">
						<IonCol size="12">
							<IonButton size="lg" className="custom-button" expand="block" onClick={ uploadFile }><IonIcon icon={cloudUploadOutline}></IonIcon></IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
				<IonFooter>
					<IonGrid>
						<IonRow className="ion-margin-top ion-padding-top">
							<IonCol size="12">
								<IonButton size="" className="custom-button" expand="block" onClick={ addDNIFrontUrl }>Siguiente</IonButton>
							</IonCol>
						</IonRow>
					</IonGrid>

				</IonFooter>
			</div>
		</>
	);
};

export default FreDniFrontUpload;
