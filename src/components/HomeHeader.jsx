import {
	IonCol,
	IonHeader,
	IonNote,
	IonRow,
	IonToolbar,
} from '@ionic/react';
import { Iconly } from 'react-iconly';

import styles from "../styles/Home.module.scss";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import {useEffect, useState} from "react";

import profileService from '../services/profile.service';
import imageService from '../services/images.service';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const HomeHeader = () => {
	const [profile, setProfile] = useState();
	const [profileImage, setProfileImage] = useState();

	useEffect(() => {
		profileService.getProfile()
			.then(p => {
				setProfile(p);
				imageService.getImage(p.profileImageUri)
					.then((url) => setProfileImage(url));
			});
	}, []);

	return (
		<IonHeader className="ion-no-border ion-no-margin ion-no-padding">
			<IonToolbar>
				<IonRow className="ion-justify-content-between ion-align-items-center animate__animated animate__fadeInDown animate__faster">
					<IonCol size="10">
						<IonRow className="ion-justify-content-center ion-align-items-center">
							<IonCol size="4" className={ styles.avatar }>
								<img src={profileImage} alt="avatar" />
							</IonCol>

							<IonCol size="8" className={ `${ styles.welcome } ion-justify-content-center ion-align-items-center` }>
								<IonNote>Hola, <b>{profile?.firstName}</b></IonNote>
							</IonCol>
						</IonRow>
					</IonCol>
				</IonRow>
			</IonToolbar>
		</IonHeader>
	);
};

export default HomeHeader;
