import { put } from 'redux-saga/effects';
import { takeEvery } from '@redux-saga/core/effects';

const MOCK_TASKS = [
    {
        title: "first task",
        description: 'Description of first task',
        date: '2020-06-23',
        complete: false,
        category: 0,
    },
    {
        title: "Second task",
        description: 'Description of second task',
        date: '2020-07-16',
        complete: false,
        category: 0,
    },
    {
        title: "First task in second category",
        description: 'Description of first (second category) task',
        date: '2020-07-06',
        complete: false,
        category: 1,
    }
]

function* tryConnectToBE() {
    yield put({type: 'RELOAD_TASKS', payload: MOCK_TASKS});
}

export default function* getTaskFromApi() {
    yield takeEvery('GET_API', tryConnectToBE);
}