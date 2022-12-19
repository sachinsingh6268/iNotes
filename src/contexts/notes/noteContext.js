import {createContext} from 'react';

// we are creating object of context that will hold all the states related to notes so that we don't have to drill long if app goes bigger and bigger
const noteContext = createContext(); 

export default noteContext;