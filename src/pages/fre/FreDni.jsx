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
import {idCardOutline, personOutline} from 'ionicons/icons';
import freStyles from '../Signup.module.scss';
import React, {useEffect, useState} from "react";
import CustomField from "../../components/CustomField";
import {useFormInput, validateForm} from "../../data/utils";

const FreDni = ({ nextHandler = () => {} }) => {
	const [ errors, setErrors ] = useState(false);

	const fields = [{
		id: "dni",
		label: "DNI",
		required: true,
		input: {
			props: {
				type: "text",
				placeholder: "28587982"
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

	const addDNI = () => {
		const dni = getValue();
		const errors = validateForm(fields);
		setErrors(errors);

		if (!errors.length) {
			nextHandler({dni: dni});
		}
	}

	return (
		<>
			<IonHeader collapse="condense">
				<IonToolbar>
					<IonTitle size="large">¿Cual es tu DNI?</IonTitle>
				</IonToolbar>
			</IonHeader>
			<div style={{height: '100%', width: '100%', backgroundColor: '#7c3b6a'}}>
				<IonGrid>
					<IonRow className="ion-justify-content-center ion-align-self-center ion-text-center animate__animated animate__fadeIn">
						<IonCol size="12">
							<div className="ion-justify-content-center ion-align-items-center ion-text-center">
								<div className={ freStyles.message }>
									<h2>¿Cual es tu DNI?</h2>
									<p>Ingresá tu DNI</p>
								</div>
								<div className={ freStyles.favouriteButton }>
									<IonIcon icon={idCardOutline} size="large" style={{color: '#d3a6c7'}} />
								</div>
							</div>
						</IonCol>
					</IonRow>
					<IonRow className="ion-margin-top ion-padding-top">
						<IonCol size="12">
							<CustomField field={ fields[0] } errors={ errors } />
						</IonCol>
					</IonRow>
				</IonGrid>
				<IonFooter>
					<IonGrid>
						<IonRow className="ion-margin-top ion-padding-top">
							<IonCol size="12">
								<IonButton size="" className="custom-button" expand="block" onClick={ addDNI }>Siguiente</IonButton>
							</IonCol>
						</IonRow>
					</IonGrid>

				</IonFooter>
			</div>
		</>
	);
};

export default FreDni;
