import {act, cleanup, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import App from "./App";
import {store} from "../../state/store";
import {loadingStart, loadingSuccess} from "./AppSlice";
import {unmountComponentAtNode, render} from "react-dom";


describe('AppSlice testing', function (){


    it('should be loading = false at the app start', async  () => {
        const loading = store.getState().app.loading
        expect(loading).toBe(false)
    });

    it('should be loading = true after dispatch loadingStart', async  () => {
        let loading = store.getState().app.loading
        await act(async()=>{
            store.dispatch(loadingStart())
        })
        loading = store.getState().app.loading
        expect(loading).toBe(true)
    });

    it('should be loading = false after dispatch loadingSuccess', async  () => {
        let loading = store.getState().app.loading
        await act(async()=>{
            store.dispatch(loadingStart())
        })
        await act(async()=>{
            store.dispatch(loadingSuccess())
        })
        loading = store.getState().app.loading
        expect(loading).toBe(false)
    });
});

describe('App component testing', function () {
    let container:  HTMLElement;
    beforeEach(async () =>{
        container = document.createElement("div");
        document.body.appendChild(container);
    })
    afterEach(()=>{
        unmountComponentAtNode(container);
        container.remove();
    });

    it('should be render Spinner if loading = true', async ()=> {
        await act(async()=>{
            store.dispatch(loadingStart())
        })
        act(() => {
            render(<App />, container);
        });
        let spinner = document.querySelector('.spinner')
        console.log(spinner)
        expect(spinner).toBeTruthy()

    });
});