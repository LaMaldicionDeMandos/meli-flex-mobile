import { IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonNote, IonPage, IonRow, useIonRouter, useIonViewWillEnter } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import styles from "./Profile.module.scss";
import styles2 from "../styles/Place.module.scss";
import {Iconly} from "react-iconly";

const Profile = () => {
	const router = useIonRouter();
	const headingRef = useRef();
	const [ slideSpace, setSlideSpace ] = useState(0);

	useIonViewWillEnter(() => {
		setSlideSpace(5);
	});

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
									<img src="/assets/avatar.jpeg" className={ styles.avatar } alt="avatar" />
									<IonCard className={ styles.profileHeader }>
										<IonCardContent className={ styles.profileDetails }>
											<IonCardTitle>Marcelo</IonCardTitle>
											<p>Direccion</p>

											<IonRow className={ styles.profileStats }>
												<IonCol size="4">
													<IonCardSubtitle>Purchased</IonCardSubtitle>
													<IonNote>que?</IonNote>
												</IonCol>

												<IonCol size="4">
													<IonCardSubtitle>Wished</IonCardSubtitle>
													<IonNote>Deseos</IonNote>
												</IonCol>

												<IonCol size="4">
													<IonCardSubtitle>Likes</IonCardSubtitle>
													<IonNote>5</IonNote>
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
				<IonGrid className="animate__animated animate__fadeIn">
					<IonRow>
						<IonCol size="12">
							<IonCardTitle className={ styles.title }>Collection</IonCardTitle>
						</IonCol>
					</IonRow>
				</IonGrid>

					<div className={ ` ${ styles.collections } animate__animated animate__slideInRight` }>
						<Swiper spaceBetween={ slideSpace } slidesPerView={ 2.5 }>
							[Collections]
						</Swiper>
					</div>

				<IonGrid>
					<IonRow>
						<IonCol size="12">
							<IonCardTitle className={ styles.title }>Tags</IonCardTitle>
						</IonCol>
					</IonRow>

					<IonRow className="animate__animated animate__slideInLeft">
						[Tags]
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Profile;
