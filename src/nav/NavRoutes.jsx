import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import { AllTabs } from "./AllRoutes";
import Login from "../pages/Login";

import sessionService from '../services/session.service';

const NavRoutes = () => {
    const accessToken = sessionService.getToken();

    return (
        <IonReactRouter>
            <IonRouterOutlet id="main">
              <Route exact path="/" render={() => !accessToken
                ? <Redirect to="/login" />
                : <Redirect to="/tabs/home" /> }/>
              <Route path="/login"><Login /></Route>
              <Route path="/tabs" render={ () => <AllTabs />} />
            </IonRouterOutlet>
        </IonReactRouter>
    );
}

export default NavRoutes;
