import {ref, getStore, createStore} from "./components/reactive-framework";

let user = createStore("userName", "");

user.onNextUpdate(() => {
    console.log("Updated user function")
});