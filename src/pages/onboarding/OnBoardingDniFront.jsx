import React from "react";

import sessionService from '../../services/session.service';
import OnBoardingImageUpload from "./OnBoardingImageUpload";

const OnBoardingDniFront = ({ nextHandler = () => {} }) => {
	const uri = `id_${sessionService.getUserId()}_dniFront.jpeg`;

	return <OnBoardingImageUpload
		context={{propertyName: 'dniFrontUri', uri: uri, title: 'Subí tu DNI', subtitle: 'Subí una foto de la parte frontal de tu DNI o sacale una foto'}}
		nextHandler={nextHandler}/>
};

export default OnBoardingDniFront;
