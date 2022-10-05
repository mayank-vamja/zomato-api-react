import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "../screens/Homepage/index";
import Restaurant from "../screens/Restaurant";
import Collection from "../screens/Collection";
import { useSelector } from "react-redux";
import LoaderFullScreen from "../components/LoaderFullScreen";
import AdvanceSearch from "../screens/AdvanceSearch";
import NoMatch from "../screens/NoMatch";
import FailureModal from "../components/FailureModal";

const AppRoutes = () => {
  const loading = useSelector((s) => s.loading) || false;
  return (
    <>
      <LoaderFullScreen loading={loading}>
        <Switch>
          <Route exact path="/:entity_id/restaurant/:id" component={Restaurant} />
          <Route exact path="/:entity_id/:entity_type/collection/:id" component={Collection} />
          <Route exact path="/:entity_id/:entity_type/advancesearch" component={AdvanceSearch} />
          <Route exact path="/:entity_id/:entity_type/advancesearch/:query/:page" component={AdvanceSearch} />
          <Route exact path="/" component={Homepage} />
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
        <FailureModal />
      </LoaderFullScreen>
    </>
  );
};

export default AppRoutes;
