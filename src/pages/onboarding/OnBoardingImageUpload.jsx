import {
	IonCol,
	IonGrid,
	IonRow,
	IonFooter,
	IonButton, IonIcon
} from '@ionic/react';
import {idCardOutline, cloudUploadOutline, cameraOutline} from 'ionicons/icons';
import freStyles from '../Signup.module.scss';
import React, {useState} from "react";
import { FilePicker } from '@capawesome/capacitor-file-picker';

import { head } from 'lodash';
import imagesService from '../../services/images.service';

const OnBoardingImageUpload = ({ context, nextHandler = () => {} }) => {
	const [imageUri, setImageUri] = useState();
	const addProperty = () => {
		const delta = {};
		delta[context.propertyName] = context.uri;
			nextHandler(delta);
	}

	const uploadFile = async () => {
		const result = await FilePicker.pickFiles({
			types: ['image/*'],
			multiple: false,
		});
		console.log(`Pick file ${JSON.stringify(result)}`);
		const file = head(result.files);
		let base64Image = 'data:image/jpeg;base64,' + file.data;
		setImageUri(base64Image);
		imagesService.uploadImage(context.uri, new Buffer(file.data, 'base64'))
			.then((image) => {
				console.log('Imagen subida ' + JSON.stringify(image));
			})
			.catch((e) => {
				console.error(e);
			});
	}

	return (
		<div style={{height: '100%', width: '100%', backgroundColor: '#7c3b6a'}}>
			<IonGrid>
				<IonRow className="ion-justify-content-center ion-align-self-center ion-text-center animate__animated animate__fadeIn">
					<IonCol size="12">
						<div className="ion-justify-content-center ion-align-items-center ion-text-center">
							<div className={ freStyles.message }>
								<h2>{context.title}</h2>
								<p>{context.subtitle}</p>
							</div>
							<div className={ freStyles.favouriteButton }>
								<IonIcon icon={idCardOutline} size="large" style={{color: '#d3a6c7'}} />
							</div>
						</div>
					</IonCol>
				</IonRow>
				{imageUri ? (
					<IonRow className="ion-justify-content-center ion-align-self-center ion-text-center animate__animated animate__fadeIn">
						<IonCol size="12" className={freStyles.preview}>
							<img src={imageUri} className={freStyles.preview}/>
							<p>Si la foto se ve bien podes continuar</p>
						</IonCol>
					</IonRow>
				) : ''}
				<IonRow className="ion-margin-top ion-padding-top">
					<IonCol size="6">
						<IonButton size="large" className="custom-button" expand="block" onClick={ uploadFile }><IonIcon icon={cloudUploadOutline}></IonIcon></IonButton>
					</IonCol>
					<IonCol size="6">
						<IonButton size="large" className="custom-button" expand="block" onClick={ uploadFile }><IonIcon icon={cameraOutline}></IonIcon></IonButton>
					</IonCol>
				</IonRow>
			</IonGrid>
			<IonFooter>
				<IonGrid>
					<IonRow className="ion-margin-top ion-padding-top">
						<IonCol size="12">
							<IonButton size="" className="custom-button" expand="block" onClick={ addProperty }>Siguiente</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>

			</IonFooter>
		</div>
	);
};

export default OnBoardingImageUpload;
