import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import GetUser from './Components/GetUser'
import { Provider } from 'react-redux'
import store from './Store'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './Store'
import 'react-chat-elements/dist/main.css';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history}> 
              <GetUser />
          </ConnectedRouter>
        </Provider>
      </div>
    )
  }
}

export default App
