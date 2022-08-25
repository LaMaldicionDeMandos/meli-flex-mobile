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


import sessionService from '../services/session.service';

const LoadingPage = () => {
	const history = useHistory();

	useEffect(() => {
		sessionService.getProfile()
			.then((profile) => history.push('tabs/home'))
			.catch(() => history.push('/fre'));
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
