import React from 'react'
import { SpinLoader } from 'react-css-loaders'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import UserActions from '../Redux/user'
import { MessageList, MessageBox } from 'react-chat-elements'
import { Layout, Row, Col, Card} from 'antd'
import { Link } from 'react-router-dom'
import '../index.css'

const { Header, Content, Footer } = Layout



class ChatPage extends React.Component {

	componentDidMount() {
		console.log("SCROLL", this.panel);
		this.panel.scrollTo(0, this.panel.scrollHeight)
	}

	render() {
		return (
      <Card  title="Forgot" >
        <div ref={(panel) => { this.panel = panel }} className='chat'>
          <MessageList
          className='message-list'
          lockable={true}
          dataSource={[
            {
              position: 'right',
              type: 'text',
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
              date: new Date(),
            },
            {
              position: 'left',
              type: 'text',
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
              date: new Date(),
            },{
              position: 'left',
              type: 'text',
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
              date: new Date(),
            },{
              position: 'right',
              type: 'text',
              text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
              date: new Date(),
            },
          ]} />
        </div>
      </Card>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		verifyCode: (payload, actionRedirect) => dispatch(UserActions.verifyCodeRequest(payload, actionRedirect))
	}
}

export default withRouter( 
	connect(null, mapDispatchToProps)(ChatPage))