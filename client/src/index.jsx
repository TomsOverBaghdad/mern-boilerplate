import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter
} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDumbbell, faRunning, faPeopleCarry } from '@fortawesome/free-solid-svg-icons';

import { AuthProvider } from './useAuth';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

library.add(faDumbbell, faRunning, faPeopleCarry);

/**
 * Combine providers to avoid providor hell with a bunch of wrappers
 * The first argument will be the inner most provider (immediately wrapping App)
 * with the last argument wrapping all the other providers
 *
 * code to combine providers to avoid provider hell
 * https://dev.to/horusgoul/say-goodbye-to-provider-hell-with-react-component-pack-6ib
 */
const nest = (...components) => props =>
	components.reduce((children, Current) => <Current {...props}>{children}</Current>, props.children);

const ProviderPack = nest(
	AuthProvider,
	BrowserRouter
);

ReactDOM.render(
	<ProviderPack>
		<App />
	</ProviderPack>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
