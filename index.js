import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import mod_store from './reducers'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

let store = createStore(mod_store)

ReactDOM.render(
    <Provider store = {store}>
      <App /> 
    </Provider> ,
    document.getElementById('root')
)
