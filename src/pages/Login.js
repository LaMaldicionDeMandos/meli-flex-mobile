import React, {useEffect} from "react";
import {
	IonButton,
	IonCardTitle,
	IonCol,
	IonContent,
	IonFooter,
	IonGrid,
	IonHeader,
	IonIcon,
	IonImg,
	IonPage,
	IonRow,
} from '@ionic/react';
import {useHistory, useLocation} from "react-router-dom";
import styles from './Login.module.scss';

import sessionService from '../services/session.service';

function useQuery() {
	const { search } = useLocation();
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Login = () => {
	const sessionCode = useQuery().get('code');

	const history = useHistory();

	useEffect(() => {
		if (sessionCode) {
			console.log('Session code: ' + sessionCode);
			sessionService.requestAccessToken(sessionCode)
				.then(() => {
					history.push('/');
				})
				.catch(e => {
					console.log(e);
				});
		}
	}, []);

	const goToMeliLogin = () => sessionService.requestAccessCode();

	return (
		<IonPage className={ styles.loginPage }>
			<IonHeader>
				{/* <IonToolbar className="ion-no-margin ion-no-padding"> */}
					<IonImg src="/assets/login2.jpeg" />
				{/* </IonToolbar> */}
			</IonHeader>
			<IonContent fullscreen>

				<div className={ styles.getStarted }>
					<IonGrid>
						<IonRow className={ `ion-text-center ion-justify-content-center ${ styles.heading }` }>
							<IonCol size="11" className={ styles.headingText }>
								<IonCardTitle>Ingresá con tu usuario de mercadolibre</IonCardTitle>
							</IonCol>
						</IonRow>

						<IonRow className={ `ion-text-center ion-justify-content-center` }>
							<IonCol size="11">
								<IonButton className={ `${ styles.getStartedButton } custom-button`} onClick={goToMeliLogin} >
									<IonIcon slot="start" src="/assets/icon/meli.svg" />
									Ingresar con Mercadolibre &rarr;
								</IonButton>
							</IonCol>
						</IonRow>
					</IonGrid>
				</div>
			</IonContent>

			<IonFooter>
				<IonGrid>
				</IonGrid>
			</IonFooter>
		</IonPage>
	);
};

export default Login;
