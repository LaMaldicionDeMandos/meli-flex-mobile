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
import { personOutline } from 'ionicons/icons';
import freStyles from '../Signup.module.scss';
import React, {useEffect, useState} from "react";
import CustomField from "../../components/CustomField";
import {useFormInput, validateForm} from "../../data/utils";

const FreName = ({ nextHandler = () => {} }) => {
	const [ errors, setErrors ] = useState(false);

	const fields = [{
		id: "firstName",
		label: "Nombre",
		required: true,
		input: {
			props: {
				type: "text",
				placeholder: "Alberto"
			},
			state: useFormInput("")
		}
	},
	{
		id: "lastName",
		label: "Apellido",
		required: true,
		input: {
			props: {
				type: "text",
				placeholder: "Einstein"
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

	const getValueFirstName = () => {
		return fields[0].input.state.value;
	};

	const getValueLastName = () => {
		return fields[1].input.state.value;
	};

	const addName = () => {
		const firstName = getValueFirstName();
		const lastName = getValueLastName();
		const errors = validateForm(fields);
		setErrors(errors);

		if (!errors.length) {
			nextHandler({firstName: firstName, lastName: lastName});
		}
	}

	return (
		<>
			<IonHeader collapse="condense">
				<IonToolbar>
					<IonTitle size="large">¿Como te llamas?</IonTitle>
				</IonToolbar>
			</IonHeader>
			<div style={{height: '100%', width: '100%', backgroundColor: '#7c3b6a'}}>
				<IonGrid>
					<IonRow className="ion-justify-content-center ion-align-self-center ion-text-center animate__animated animate__fadeIn">
						<IonCol size="12">
							<div className="ion-justify-content-center ion-align-items-center ion-text-center">
								<div className={ freStyles.message }>
									<h2>¿Como te llamas?</h2>
									<p>Ingresá tu nombre y apellido</p>
								</div>
								<div className={ freStyles.favouriteButton }>
									<IonIcon icon={personOutline} size="large" style={{color: '#d3a6c7'}} />
								</div>
							</div>
						</IonCol>
					</IonRow>
					<IonRow className="ion-margin-top">
						<IonCol size="12">
							<CustomField field={ fields[0] } errors={ errors } />
							<CustomField field={ fields[1] } errors={ errors } />
						</IonCol>
					</IonRow>
				</IonGrid>
				<IonFooter>
					<IonGrid>
						<IonRow className="ion-margin-top ion-padding-top">
							<IonCol size="12">
								<IonButton size="" className="custom-button" expand="block" onClick={ addName }>Siguiente</IonButton>
							</IonCol>
						</IonRow>
					</IonGrid>

				</IonFooter>
			</div>
		</>
	);
};

export default FreName;
