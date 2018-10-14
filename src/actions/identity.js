export const registerScatter = () => dispatch => {
 dispatch({
  type: 'REGISTERED_SCATTER',
  payload: true
 })
}

export const updateIdentity = (identity) => dispatch => {
 dispatch({
  type: 'UPDATE_IDENTITY',
  payload: identity
 })
}

export const registerContract = () => dispatch => {
 dispatch({
  type: 'REGISTERED_CONTRACT',
  payload: true
 })
}

export const updateAccount = (accountDetails) => dispatch => {
 dispatch({
  type: 'UPDATE_ACCOUNT',
  payload: accountDetails
 })
}

export const updateBalance = (newBalance) => dispatch => {
 dispatch({
  type: 'UPDATE_BALANCE',
  payload: newBalance
 })
}
