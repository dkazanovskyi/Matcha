import React from 'react'
import './App.css'
import 'antd/dist/antd.css'
import GetUser from './Components/GetUser'
import { Provider } from 'react-redux'
import store from './Store'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './Store'
import io from 'socket.io-client'
import 'react-chat-elements/dist/main.css';

class App extends React.Component {

  render() {
    const socket = io.connect('http://localhost:5000')
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedRouter history={history}> 
            <div>
              <GetUser />
            </div>
          </ConnectedRouter>
        </Provider>
      </div>
    )
  }
}

export default App
