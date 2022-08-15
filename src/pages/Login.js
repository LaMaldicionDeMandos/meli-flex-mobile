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
	IonRouterLink,
	IonRow,
	IonToolbar
} from '@ionic/react';
import styles from './Login.module.scss';

const Login = () => {

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
								<IonButton className={ `${ styles.getStartedButton } custom-button`} onClick={() => console.log('Click on login')} >
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
