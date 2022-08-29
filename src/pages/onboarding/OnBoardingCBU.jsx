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
import { walletOutline } from 'ionicons/icons';
import freStyles from '../Signup.module.scss';
import React, {useEffect, useState} from "react";
import CustomField from "../../components/CustomField";
import {useFormInput, validateForm} from "../../data/utils";

const OnBoardingCBU = ({ nextHandler = () => {} }) => {
	const [ errors, setErrors ] = useState(false);

	const fields = [{
		id: "cbu",
		label: "CBU, Alias o CVU",
		required: true,
		input: {
			props: {
				type: "text",
				placeholder: "CBU/Alias/CVU"
			},
			state: useFormInput("")
		}
	}];

	useEffect(() => {
		return () => {

			fields.forEach(field => field.input.state.reset(""));
			setErrors(false);
		}
	}, []);

	const getValue = () => {
		return fields[0].input.state.value;
	};

	const addCbu = () => {
		const cbu = getValue();
		const errors = validateForm(fields);
		setErrors(errors);

		if (!errors.length) {
			nextHandler({cbu: cbu});
		}
	}

	return (
		<div style={{height: '100%', width: '100%', backgroundColor: '#7c3b6a'}}>
			<IonGrid>
				<IonRow className="ion-justify-content-center ion-align-self-center ion-text-center animate__animated animate__fadeIn">
					<IonCol size="12">
						<div className="ion-justify-content-center ion-align-items-center ion-text-center">
							<div className={ freStyles.message }>
								<h2>¿Donde te pagamos?</h2>
								<p>Ingresá tu CBU, Alias o CVU de tu banco o de mercadopago</p>
							</div>
							<div className={ freStyles.favouriteButton }>
								<IonIcon icon={walletOutline} size="large" style={{color: '#d3a6c7'}} />
							</div>
						</div>
					</IonCol>
				</IonRow>
				<IonRow className="ion-margin-top">
					<IonCol size="12">
						<CustomField field={ fields[0] } errors={ errors } />
					</IonCol>
				</IonRow>
			</IonGrid>
			<IonFooter>
				<IonGrid>
					<IonRow className="ion-margin-top ion-padding-top">
						<IonCol size="12">
							<IonButton size="" className="custom-button" expand="block" onClick={ addCbu }>Finalizar</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>

			</IonFooter>
		</div>
	);
};

export default OnBoardingCBU;
