/**
 * A centralized location to keep and manage available routes
 * This allows for easier refactoring and not introduce bugs
 */

/**
 * All available routes on the client side (this react code) should appear here.
 * Routes exclusively used with the AuthProvider essentially
 * Each route is a function that takes in parameters and spits out the URL
 * Examples:
 * 		(id=':id') => `/specific/route/${id}`
 * 		(queryParams) => `/route-with-query?=${queryparams(queryParams)}`
 *
 * The string default in the params is used when creating the routes for react-router
 * TODO import the "queryparams" library to encode and decode query params
 */
export const ClientRoutes = {
	home: () => '/',
	signIn: () => '/sign-in',
	signOut: () => '/sign-out',
	register: () => '/register',
	account: () => '/account',
	// *** example *** 
	// projectEstimateNew: (projectId = ':projectId') =>
	// 	`/projects/${projectId}/estimate/new`,
};

/**
 * All available auth routes on the server side (the express code) should appear here.
 * Each route is a function that takes in parameters and spits out the URL
 * Examples:
 * 		(id) => `/auth/specific/route/${id}`
 * 		(queryParams) => `/auth/route-with-query?=${queryparams(queryParams)}`
 */
export const AuthRoutes = {
	authenticate: () => '/auth/user',
	signIn: () => '/auth/sign-in',
	signOut: () => '/auth/sign-out',
	register: () => '/auth/register/new',
};

/**
 * All available data routes on the server side (the express code) should appear here.
 * These are routes to get data for the client
 * Each route is a function that takes in parameters and spits out the URL
 * Examples:
 * 		(id) => `/api/specific/route/${id}`
 * 		(queryParams) => `/api/route-with-query?=${queryparams(queryParams)}`
 */
export const ApiRoutes = {
	// *** example *** 
	// project: (projectId) => `/api/projects/${projectId}`,
};
