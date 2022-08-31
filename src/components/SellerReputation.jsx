import React from "react";

import './SellerReputation.css';
import {IonNote, IonText} from "@ionic/react";


const SellerReputation = ({reputation}) => {

	return (
		<div style={{width: '100%'}} >
			<p className="ion-text-center reputation">
				<IonNote>Reputación</IonNote>
			</p>
			<ul aria-hidden={true} className="ui-thermometer" value={reputation?.level_id}>
				<li className="ui-thermometer_level ui-thermometer_level_1"></li>
				<li className="ui-thermometer_level ui-thermometer_level_2"></li>
				<li className="ui-thermometer_level ui-thermometer_level_3"></li>
				<li className="ui-thermometer_level ui-thermometer_level_4"></li>
				<li className="ui-thermometer_level ui-thermometer_level_5"></li>
			</ul>
		</div>
	);
};

export default SellerReputation;
