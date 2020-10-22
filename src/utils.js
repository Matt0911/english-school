import store from './store';

export const shouldUserHaveAccess = (allowedRoles) => {
  return store.state.userProfile && store.state.userProfile.roles && allowedRoles.some(r => store.state.userProfile.roles[`${r}Role`])
}