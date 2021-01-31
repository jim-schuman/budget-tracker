import {take, put, delay, call, fork, takeEvery} from 'redux-saga/effects';

export function* testSaga() {
    while(true) {

        console.log("starting saga");
        const state = yield take('TEST_MESSAGE');
        const a = yield call(double, 2);
        console.log("A ", a);
        const b = yield double(3);
        console.log("B ", b);
        console.log("finish saga" ,state);

    }
}

export function* doNothing() {
    console.log(" called do nothing")
    yield delay(1000);
    console.log("im doing nothing");
}

export function* testSagaFork() {
    while(true) {
        yield take("TEST_MESSAGE_2")
        yield fork(doNothing);
        yield fork(doNothing);
        yield fork(doNothing);
    }
}

export function* testSagaTakeEvery() {
    const {payload} = yield takeEvery("TEST_MESSAGE_3", testSagaTakeEveryProcess);
    console.log("FINISH TAKE EVERY", payload);
}

export function* testSagaTakeEveryProcess({payload}) {
    console.log("starting process for index", payload);
    yield delay(3000);
    console.log("finishing process for index", payload);
}

export function* dispatchTest() {
    let index = 0;
    while(true) {
        yield delay(500);
        yield put({type:'TEST_MESSAGE_3', payload: index});
        index++;
    }
}

export function double(number) {
    return number * 2;
}