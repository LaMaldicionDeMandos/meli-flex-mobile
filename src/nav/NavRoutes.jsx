import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { AllTabs } from "./AllRoutes";
import Login from "../pages/Login";
import Order from "../pages/Order";

import sessionService from '../services/session.service';
import MyOrder from "../pages/MyOrder";
import OnBoarding from "../pages/Onboarding";
import LoadingPage from "../pages/LoadingPage";
import DeepLinkListener from "../components/DeepLinkListener";
import LoginStep2 from "../pages/LoginStep2";

const NavRoutes = () => {
    const initialPage = () => {
      const accessToken = sessionService.getToken();
      if (!accessToken) return <Redirect to="/login" />;
      else return <Redirect to="/loading" />
    }

    return (
        <IonReactRouter>
            <IonRouterOutlet id="main">
              <Route exact path="/" render={initialPage}/>
              <Route path="/login"><Login /></Route>
              <Route path="/login_step_2/:code"><LoginStep2 /></Route>
              <Route path="/onboarding"><OnBoarding /></Route>
              <Route path="/loading"><LoadingPage /></Route>
              <Route path="/order/:order_id"><Order /></Route>
              <Route path="/myorder/:order_id"><MyOrder /></Route>
              <Route path="/tabs" render={ () => <AllTabs />} />
            </IonRouterOutlet>
          <DeepLinkListener />
        </IonReactRouter>
    );
}

export default NavRoutes;
