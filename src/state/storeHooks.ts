import {State, store} from "./store";
import {useEffect, useState} from "react";

export function useStore<T>(getter: (state: State)=>T){
    const [state, setState] = useState(getter(store.getState()))
    useEffect(()=>{
        return store.subscribe(()=>setState(getter(store.getState())));
    }, [getter])
    return state;
}