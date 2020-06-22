import createSagaMiddleware from 'redux-saga';
import {
    applyMiddleware,
    compose,
    createStore,
} from 'redux';


import saga from './saga'


const INITIAL_STATE = {
    tasks: [],
};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const composedEnhancers = compose(
    applyMiddleware(...middleware),
);


const reducer = (state = INITIAL_STATE, action: any) => {
    switch(action.type) {
        case 'ADD_TASK':
            return { ...state, tasks: [ ...state.tasks, action.payload]} ;
        case 'RELOAD_TASKS':
            return {...state, tasks: action.payload};
        default:
            return state;
    }
}
const store = createStore(reducer, INITIAL_STATE, composedEnhancers,);
sagaMiddleware.run(saga);

export default store;