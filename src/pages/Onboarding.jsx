import {
	IonPage,
	IonContent,
	IonSlides,
	IonSlide, IonHeader, IonImg
} from '@ionic/react';
import { rocketOutline, colorPalette } from 'ionicons/icons';
import freStyles from './Signup.module.scss';
import React, {useRef, useState} from "react";
import OnBoardingInit from "./onboarding/OnBoardingInit";
import OnBoardingName from "./onboarding/OnBoardingName";
import OnBoardingDni from "./onboarding/OnBoardingDni";
import OnBoardingDniFront from "./onboarding/OnBoardingDniFront";

import styles from "../styles/Place.module.scss";
import {Iconly} from "react-iconly";
import { assign } from 'lodash';
import OnBoardingDniBack from "./onboarding/OnBoardingDniBack";

const OnBoarding = () => {
	const [profile, setProfile] = useState({});
	const [ lastSlide, setLastSlide ] = useState(false);
	const [ firstSlide, setFirstSlide ] = useState(true);

	const sliderRef = useRef();

	const checkSlides = async () => {
		const isLastSlide = await sliderRef.current.isEnd();
		const isFirstSlide = await sliderRef.current.isBeginning();
		setLastSlide(isLastSlide);
		setFirstSlide(isFirstSlide);
	}

	const next = (input) => {
		const p = assign(profile, input);
		setProfile(p);

		if (lastSlide) {
			console.log(`send form: ${JSON.stringify(p)}`)
		} else {
			sliderRef.current.slideNext();
		}
	}

	return (
		<IonPage className={ freStyles.signupPage }>
			<IonHeader>
				{/* <IonToolbar className="ion-no-margin ion-no-padding"> */}
				{firstSlide
					? <IonImg src="/assets/login2.jpeg" />
					:(<div className="ion-justify-content-between">
					<div className={ styles.customBackButton } onClick={ () => sliderRef.current.slidePrev() }>
						<Iconly set="bold" name="CaretLeft" />
					</div>
				</div>)}
			</IonHeader>
			<IonContent fullscreen>
				<IonSlides onIonSlideWillChange={ checkSlides } pager={ true } ref={ sliderRef } id="slider" options={{ slidesPerView: "auto", zoom: true, grabCursor: true, allowTouchMove: false }}>
					<IonSlide><OnBoardingInit nextHandler={next}/></IonSlide>
					<IonSlide><OnBoardingName nextHandler={next}/></IonSlide>
					<IonSlide><OnBoardingDni nextHandler={next}/></IonSlide>
					<IonSlide><OnBoardingDniFront nextHandler={next}/></IonSlide>
					<IonSlide><OnBoardingDniBack nextHandler={next}/></IonSlide>
				</IonSlides>

			</IonContent>
		</IonPage>
	);
};

export default OnBoarding;
