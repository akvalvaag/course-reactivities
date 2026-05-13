import CounterStore from "./counterStore.ts";
import {createContext} from "react";
import {UIStore} from "./uiStore.ts";
import {ActivityStore} from "./activityStore.ts";

interface Store {
    counterStore: CounterStore;
    uiStore: UIStore;
    activityStore: ActivityStore;
}

export const store: Store = {
    counterStore: new CounterStore(),
    uiStore: new UIStore(),
    activityStore: new ActivityStore()
}

export const StoreContext = createContext(store)