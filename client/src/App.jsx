import React, { useEffect } from 'react';
import axios from 'axios';
import { Result } from 'antd';

import { ROUTES, RenderRoutes } from "./RouteConfig";

import { Loader } from './components/common/Loading';

import { useAuth } from './useAuth';


// import { WorkoutCalendarLayout } from './components/WorkoutCalendar';
// import { StartWorkoutLayout } from './components/StartWorkout';

// TEST IMPORTS
// import { generateTestWorkout, generateTestWorkouts } from './testData';
/**
 * Example to get shared code
 * https://medium.com/frontend-digest/using-create-react-app-in-a-monorepo-a4e6f25be7aa
 * import test from '@pavo/shared';
 */

import './App.less';

const App = () => {
	const { setUser, authenticate } = useAuth();

	// https://stackoverflow.com/questions/59335963/react-hooks-display-global-spinner-using-axios-interceptor
	useEffect(() => {
		/**
		 * Alter the response to provide more helpful information for the UI
		 * On successful responses auto extract data for ease of use
		 * On errors we display user friendly results
		 */
		const resInterceptor = axios.interceptors.response.use(
			res => res.data,
			err => {
				if (!err.response) {
					return Promise.reject(err);
				} else if (err.response.status >= 500) {
					// server system error, leave generic
					// user shouldn't know what's going on with our server :)
					return Promise.reject(new Error('There was a problem processing your request'));
				} else if (err.response.status >= 400) {
					// auto remove user if 401 --- user is invalid
					if (err.response.status === 401) {
						setUser(false);
					}
					// server processing error
					// this will be a pretty standard error since we're using the HttpException in the backend
					return Promise.reject(err.response.data);
				}
			}
		);

		return () => {
			// remove all intercepts when done
			axios.interceptors.response.eject(resInterceptor);
		};
	}, [setUser]);

	if (authenticate.loading) {
		return <Loader />;
	}

	if (authenticate.error) {
		return <Result status="error" title="Sorry, something went wrong, try again later" />;
	}

	return <RenderRoutes routes={ROUTES} />
};

export default App;
