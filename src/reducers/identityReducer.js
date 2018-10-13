const defaultState = {
  scatterRegistered: false,
  identity: {},
  contractRegistered: false,
  account: {}
};

export default (state = defaultState, action) => {
 switch (action.type) {
  case 'REGISTERED_SCATTER':
   return { ...state, scatterRegistered: action.payload };
  case 'REGISTERED_CONTRACT':
   return { ...state, contractRegistered: action.payload };
  case 'UPDATE_IDENTITY':
   return { ...state, identity: action.payload };
  case 'UPDATE_ACCOUNT':
   return { ...state, account: action.payload };
  default:
   return state
 }
}
