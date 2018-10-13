const defaultState = {
  identity: 'test',
  registered: false
};

export default (state = defaultState, action) => {
 switch (action.type) {
  case 'SIMPLE_ACTION':
   return { ...state, identity: action.payload };
  default:
   return state
 }
}
