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

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const HomeHeader = () => {
	return (
		<IonHeader className="ion-no-border ion-no-margin ion-no-padding">
			<IonToolbar>
				<IonRow className="ion-justify-content-between ion-align-items-center animate__animated animate__fadeInDown animate__faster">
					<IonCol size="10">
						<IonRow className="ion-justify-content-center ion-align-items-center">
							<IonCol size="4" className={ styles.avatar }>
								<img src="/assets/avatar.jpeg" alt="avatar" />
							</IonCol>

							<IonCol size="8" className={ `${ styles.welcome } ion-justify-content-center ion-align-items-center` }>
								<IonNote>Welcome</IonNote>
								<h3>Joe Bloggs</h3>
							</IonCol>
						</IonRow>
					</IonCol>

					<IonCol size="2">
						<Iconly set="bold" name="Notification" className={ styles.notifications } size="xlarge" />
						<div className={ styles.notificationIndicator } />
					</IonCol>
				</IonRow>
			</IonToolbar>
		</IonHeader>
	);
};

export default HomeHeader;
