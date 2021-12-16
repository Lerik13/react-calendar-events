import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes, RouteNames } from '../router';
import Login from '../pages/Login';
import Event from '../pages/Event';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AppRouter = () => {
	const {isAuth} = useTypedSelector(state => state.auth);
	
	return (
		isAuth ?
			<Routes>
				{privateRoutes.map(route => {
					console.log(route);
					 return <Route path={route.path} element={<Event />} key={route.path} /> 
					/* return <Route path={route.path} element={route.element} /> */
				}
				)}
				<Route path="*" element={<Navigate replace to={RouteNames.EVENT} />} />
			</Routes>
			:
			<Routes>
				{publicRoutes.map(route => 
					<Route path={route.path} element={<Login />} key={route.path} />
				)}
				<Route path="*" element={<Navigate replace to={RouteNames.LOGIN} />} />
			</Routes>
	);
};

export default AppRouter;