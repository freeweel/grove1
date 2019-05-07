import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';

import {
  SearchContainer,
  DetailContainer,
  CreateContainer,
  LoginContainer
} from 'grove-core-react-redux-containers';

// Import custom override components
import MyDetailContainer from './MyDetailContainer';
import MyDetailTemplate from './MyDetailTemplate';
import MyEditTemplate from './MyEditTemplate';
import ApiTestContainer from './ApiTest';
import CustomSearchResult from './CustomSearchResult';

const PrivateRoute = ({
  component: Component,
  render,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};


const customNoResults =  () => (
  <p>Truly, there are no results.</p>
)

const Routes = ({ isAuthenticated }, ...rest) => {
  return (
    <Switch>
      <Route exact path="/login" render={props => {
          return isAuthenticated ? (
            <Redirect to={(props.location.state && props.location.state.from) || '/'} />
          ) : (
            <LoginContainer />
          );
        }}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        exact path="/"
        //render={() => <SearchContainer  resultComponent={CustomSearchResult} noResults={customNoResults}/>}
        render={() => <SearchContainer/>}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        exact path="/detail"
        render={props => {
          // Prefer to get id from the state
          const id = (props.location.state && props.location.state.id) || queryString.parse(props.location.search).id;
          const reload = queryString.parse(props.location.search).reload;
          return <MyDetailContainer template={MyDetailTemplate} id={id} reload={reload} />;
        }}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        exact path="/edit"
        render={props => {
          // Prefer to get id from the state
          const id = (props.location.state && props.location.state.id) || queryString.parse(props.location.search).id;
          return <DetailContainer template={MyEditTemplate} id={id}  />;
        }}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated} exact path="/create" render={() => <CreateContainer redirectPath="/detail" />}
      />
      <PrivateRoute isAuthenticated={isAuthenticated} exact path="/apitest" render={() => {
        return <ApiTestContainer/>}
      }/>
    </Switch>
  );
};

export default Routes;
