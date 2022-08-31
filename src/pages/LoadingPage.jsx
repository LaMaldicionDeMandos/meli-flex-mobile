import {
	IonContent,
	IonHeader,
	IonImg,
	IonPage,
	IonProgressBar,
} from '@ionic/react';
import freStyles from './loading.module.scss';
import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";

import { isEmpty } from "lodash";


import profileService from '../services/profile.service';

const LoadingPage = () => {
	const history = useHistory();

	useEffect(() => {
		profileService.getProfile()
			.then((profile) => {
				console.log('Loaded profile => ' + JSON.stringify(profile));
				if (isEmpty(profile)) return Promise.reject();
				history.push('tabs/home');
			})
			.catch(() =>
				history.push('/onboarding'));
	}, []);

	return (
		<IonPage className={ freStyles.signupPage }>
			<IonHeader>
				{/* <IonToolbar className="ion-no-margin ion-no-padding"> */}
				<IonImg src="/assets/login2.jpeg" />
				{/* </IonToolbar> */}
			</IonHeader>
			<IonContent fullscreen>
				<div style={{height: '100%', backgroundColor: '#7c3b6a'}}>
					<IonProgressBar type="indeterminate"></IonProgressBar>
					<div className={freStyles.spinnerBox}>
						<div className={freStyles.configureBorder1}>
							<div className={freStyles.configureCore}></div>
						</div>
						<div className={freStyles.configureBorder2}>
							<div className={freStyles.configureCore}></div>
						</div>
					</div>
					<p className="ion-text-center">Cargando...</p>
				</div>
			</IonContent>
		</IonPage>
	);
};

export default LoadingPage;
