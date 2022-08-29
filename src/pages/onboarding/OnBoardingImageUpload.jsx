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
import {Camera, CameraDirection, CameraResultType, CameraSource} from '@capacitor/camera';


import { head } from 'lodash';
import imagesService from '../../services/images.service';

const OnBoardingImageUpload = ({ context, orientation = OnBoardingImageUpload.LANDSCAPE, nextHandler = () => {} }) => {
	const [imageUri, setImageUri] = useState();
	const previewStyle = orientation === OnBoardingImageUpload.PORTRAIT ? freStyles.previewPortrait : freStyles.previewLandscape;
	const addProperty = () => {
		const delta = {};
		delta[context.propertyName] = context.uri;
			nextHandler(delta);
	}

	const saveImage = (base64Image) => {
		setImageUri(base64Image);
		imagesService.uploadImage(context.uri, new Buffer(base64Image, 'base64'))
			.then((image) => {
				console.log('Imagen subida ' + JSON.stringify(image));
			})
			.catch((e) => {
				console.error(e);
			});
	}

	const uploadFile = async () => {
		const result = await FilePicker.pickFiles({
			types: ['image/*'],
			multiple: false,
		});
		const file = head(result.files);
		saveImage('data:image/jpeg;base64,' + file.data);
	}

	const takePhoto = async () => {
		const options = {
			quality: 90,
			allowEditing: false,
			resultType: CameraResultType.DataUrl,
			source: CameraSource.Camera,
			direction: CameraDirection.Front
		}
		try {
			const result = await Camera.getPhoto(options);
			console.log('photo ==>' + JSON.stringify(result.dataUrl));
			saveImage(result.dataUrl);
		}catch(e) {
			console.log('Error al tomar la foto :(');
		}
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
						<IonCol size="12" className={previewStyle}>
							<img src={imageUri} className={previewStyle}/>
							<p>Si la foto se ve bien podes continuar</p>
						</IonCol>
					</IonRow>
				) : ''}
				<IonRow className="ion-margin-top ion-padding-top">
					<IonCol size="6">
						<IonButton size="large" className="custom-button" expand="block" onClick={ uploadFile }><IonIcon icon={cloudUploadOutline}></IonIcon></IonButton>
					</IonCol>
					<IonCol size="6">
						<IonButton size="large" className="custom-button" expand="block" onClick={ takePhoto }><IonIcon icon={cameraOutline}></IonIcon></IonButton>
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

OnBoardingImageUpload.PORTRAIT = 'portrait';
OnBoardingImageUpload.LANDSCAPE = 'landscape';

export default OnBoardingImageUpload;
