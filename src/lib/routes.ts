/**
 * Portfolio data stores routes as plain strings (so content can be edited
 * without touching types). This helper hands them to TanStack Router.
 */
export const toRoute = (path: string) => path as "/";
