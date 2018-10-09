import React from 'react'
import { SpinLoader } from 'react-css-loaders'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ChatActions from '../Redux/chat'
import { MessageList, MessageBox } from 'react-chat-elements'
import { Layout, Row, Col, Card} from 'antd'
import { Link } from 'react-router-dom'
import '../index.css'




class ChatPage extends React.Component {

	componentDidMount() {
    console.log("SCROLL", this.props);
    this.props.fetchChat({
      recipient: this.props.match.params.user,
      sender: this.props.sender
    })
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

const mapStateToProps = (state) => ({
  messages: state.chat.messages,
  sender: state.user.data.username
})

const mapDispatchToProps = dispatch => {
	return {
		fetchChat: (payload) => dispatch(ChatActions.fetchChatRequest(payload))
	}
}

export default withRouter( 
	connect(mapStateToProps, mapDispatchToProps)(ChatPage))