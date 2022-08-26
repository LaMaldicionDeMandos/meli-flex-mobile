
// Import Swiper styles
import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import { App, URLOpenListenerEvent } from '@capacitor/app';

// install Swiper modules
const DeepLinkListener = () => {
	const history = useHistory();
	useEffect(() => {
		App.addListener('appUrlOpen', (event) => {
			// Example url: https://beerswift.app/tabs/tab2
			// slug = /tabs/tab2
			console.log( "Haha!!! acá esta => " + event.url);
			const code = event.url.split('localhost/login?code=').pop();
			console.log('Reopen ' + code);
			if (code) {
				const redirect = `login_step_2/${code}`;
				console.log(`Redirect to ${redirect}`)
				history.push(redirect);
			}
			// If no match, do nothing - let regular routing
			// logic take over
		});
	}, []);

	return null;
};

export default DeepLinkListener;
