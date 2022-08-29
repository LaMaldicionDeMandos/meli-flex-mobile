import React from "react";

import sessionService from '../../services/session.service';
import OnBoardingImageUpload from "./OnBoardingImageUpload";
import {happyOutline} from 'ionicons/icons';

const OnBoardingPhoto = ({ nextHandler = () => {} }) => {
	const uri = `id_${sessionService.getUserId()}_selfie.jpeg`;

	return <OnBoardingImageUpload
		icon={happyOutline}
		context={{propertyName: 'profileImageUri', uri: uri, title: 'Dejanos una selfie', subtitle: 'Subí una foto tuya para que podamos conocerte'}}
		orientation={OnBoardingImageUpload.PORTRAIT}
		nextHandler={nextHandler}/>
};

export default OnBoardingPhoto;
