import CounterStore from "./counterStore.ts";
import {createContext} from "react";
import {UIStore} from "./uiStore.ts";

interface Store {
    counterStore: CounterStore;
    uiStore: UIStore;
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UIStore()
}

export const StoreContext = createContext(store)