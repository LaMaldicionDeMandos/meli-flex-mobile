import React from "react";

import sessionService from '../../services/session.service';
import OnBoardingImageUpload from "./OnBoardingImageUpload";

const OnBoardingDniBack = ({ nextHandler = () => {} }) => {
	const uri = `id_${sessionService.getUserId()}_dniBack.jpeg`;

	return <OnBoardingImageUpload
		context={{propertyName: 'dniBackUri', uri: uri, title: 'Subí tu DNI', subtitle: 'Subí una foto de la parte tracera de tu DNI o sacale una foto'}}
		nextHandler={nextHandler}/>
};

export default OnBoardingDniBack;
