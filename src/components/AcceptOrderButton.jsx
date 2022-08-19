import React from "react";
import {IonBadge, IonText, IonButton, useIonAlert} from "@ionic/react";

import ordersService from '../services/orders.service';

const AcceptOrderButton = ({order, customStyle = '', buttonComponent = IonButton, resultHandler = (result) => {}}) => {
	const [presentAlert] = useIonAlert();
	const ButtonComponent = buttonComponent;

	const accept = () => {
		ordersService.accept(order._id)
			.then(() => resultHandler('success'))
			.catch(() => resultHandler('error'));
	}

	const stopEventPropagation = (e) => {
		e.preventDefault()
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
	}

	const onAccept = (e) => {
		stopEventPropagation(e);
		presentAlert({
			mode: 'ios',
			header: '¿Aceptar reparto?',
			buttons: [
				{text: 'Aceptar', role: 'confirm', handler: accept},
				{text: 'Ahora no', role: 'cancel'}
			]
		});
	}

	return (
		<div className={ customStyle }>
			<ButtonComponent strong={false} color="primary" onClick={onAccept}><IonText className="ion-text-uppercase">aceptar</IonText></ButtonComponent>
		</div>
	);
};

AcceptOrderButton.SUCCESS = 'success';
AcceptOrderButton.ERROR = 'error';

export default AcceptOrderButton;
