import {
	IonCard,
	IonCardContent,
	IonCardSubtitle,
	IonCardTitle, IonChip,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonIcon, IonItem, IonLabel,
	IonList,
	IonNote,
	IonPage,
	IonRow, IonText,
	useIonRouter,
	useIonViewWillEnter
} from '@ionic/react';
import React, { useEffect } from 'react';
import { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import styles from "./Profile.module.scss";

import profileService from '../services/profile.service';
import imageService from "../services/images.service";
import SellerReputation from "../components/SellerReputation";
import {checkmarkDoneOutline} from "ionicons/icons";

const Profile = () => {
	const [profile, setProfile] = useState();
	const [profileImage, setProfileImage] = useState();

	const router = useIonRouter();
	const headingRef = useRef();
	const [ slideSpace, setSlideSpace ] = useState(0);

	useIonViewWillEnter(() => {
		setSlideSpace(5);
	});

	useEffect(() => {
		profileService.getProfile()
			.then(p => {
				setProfile(p);
				imageService.getImage(p.profileImageUri)
					.then((url) => setProfileImage(url));
			});
	}, []);

	useEffect(() => {
		headingRef.current.classList.add("animate__slideInLeft");
		headingRef.current.style.display = "";
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<div className={ styles.customHeader }>
					<img src="/assets/login2.jpeg" className="animate__animated" alt="header" />

					<div className={ `${ styles.mainContent } animate__animated` } ref={ headingRef } style={{ display: "none" }}>

						<IonGrid>
							<IonRow>
								<IonCol size="12" className={ styles.profileHeaderContainer }>
									<img src={profileImage} className={ styles.avatar } alt="avatar" />
									<IonCard className={ styles.profileHeader }>
										<IonCardContent className={ styles.profileDetails }>
											<IonCardTitle>{profile?.firstName} {profile?.lastName}</IonCardTitle>

											<IonRow className={ styles.profileStats }>
												<IonCol size="4">
													<IonCardSubtitle>Envíos</IonCardSubtitle>
													<IonNote>{profile?.shippings || 0}</IonNote>
												</IonCol>

												<IonCol size="8">
													<SellerReputation reputation={profile?.reputation}/>
												</IonCol>
											</IonRow>
										</IonCardContent>
									</IonCard>
								</IonCol>
							</IonRow>
						</IonGrid>
					</div>
				</div>
			</IonHeader>
			<IonContent fullscreen>
				<IonGrid className="animate__animated animate__fadeIn ion-padding-vertical">
					<IonRow>
						<IonCol size="12">
							<IonCardTitle className={ styles.title }>Reputación</IonCardTitle>
							<IonRow>
								<IonCol size="4">
									<IonCard style={{margin: '0'}}>
										<IonCardContent styly={{padding: '10px !important'}}>
											<IonCardSubtitle >Canceladas</IonCardSubtitle>
											<IonNote style={{fontSize: '24pt'}}>{profile?.cancels || 0}</IonNote>
										</IonCardContent>
									</IonCard>
								</IonCol>
								<IonCol size="4">
									<IonCard style={{margin: '0'}}>
										<IonCardContent>
											<IonCardSubtitle>Reclamos</IonCardSubtitle>
											<IonNote style={{fontSize: '24pt'}}>{profile?.claims || 0}</IonNote>
										</IonCardContent>
									</IonCard>
								</IonCol>
								<IonCol size="4">
									<IonCard style={{margin: '0'}}>
										<IonCardContent>
											<IonCardSubtitle>Tardanzas</IonCardSubtitle>
											<IonNote style={{fontSize: '24pt'}}>{profile?.delays || 0}</IonNote>
										</IonCardContent>
									</IonCard>
								</IonCol>
							</IonRow>
						</IonCol>
					</IonRow>
				</IonGrid>

				<IonGrid>
					<IonRow>
						<IonCol size="12">
							<IonCardTitle className={ styles.title }>Información personal y contacto</IonCardTitle>
							<IonList className="ion-padding-bottom ion-margin-bottom animate__animated animate__fadeIn animate__faster">
								<IonItem lines="full"  detail={ false } >
									<IonLabel>
										<IonText><b>DNI:</b> {profile?.dni}</IonText>
									</IonLabel>
								</IonItem>
								<IonItem lines="full"  detail={ false } >
									<IonLabel>
										<IonText><b>Teléfono:</b> {profile?.phone}</IonText>
									</IonLabel>
								</IonItem>
								<IonItem lines="full"  detail={ false } >
									<IonLabel>
										<IonText><b>CBU/CVU/Alias:</b> {profile?.cbu}</IonText>
									</IonLabel>
								</IonItem>
							</IonList>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Profile;
