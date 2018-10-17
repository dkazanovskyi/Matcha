import React from 'react'
import { SpinLoader } from 'react-css-loaders'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ChatActions from '../Redux/chat'
import { MessageList, MessageBox, Input , Button } from 'react-chat-elements'
import { Layout, Row, Col, Card} from 'antd'
import { Link } from 'react-router-dom'
import '../index.css'
import  moment  from 'moment'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000')

class ChatPage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			messages: []
		}
	}

	initMessageHistory = (history) => {
		const msgArr = history.map((item, i, arr) => {
			/* console.log(moment(item.createdAt).fromNow(), new Date()) */
			let msgItem = {
				position: item.sender === this.props.sender ? 'right' : 'left',
				type: 'text',
				text: item.message,
				dateString: moment(item.createdAt).fromNow(),
			}
			return msgItem
		})
		this.setState({messages: msgArr})
	}

	updateMessageHistory = (msg) => {
		let msgItem = {
			position: msg.sender === this.props.sender ? 'right' : 'left',
			type: 'text',
			text: msg.msg,
			dateString: moment(new Date()).fromNow(),
		}
		let messages = this.state.messages
		messages.push(msgItem)
		this.setState({messages: messages})
		console.log("MESSSAGES---------", this.state.messages)
		this.panel.scrollTo(0, this.panel.scrollHeight)
	}

	componentDidMount() {
		this.props.fetchChat({
			recipient: this.props.match.params.user,
			sender: this.props.sender
		}, this.initMessageHistory)
		this.panel.scrollTo(0, this.panel.scrollHeight)
		socket.on('your message', this.updateMessageHistory)
		socket.on('chat message', this.updateMessageHistory)
	}

	onSubmit = () => {
		console.log("DOEORO", this.input.value)
		socket.emit('chat message', { msg: this.input.value,
			sender: this.props.sender});
		this.props.saveMsg({
			recipient: this.props.match.params.user,
			msg: this.input.value
		})
		this.refs.input.clear()
	}

	render() {
		console.log("MESSAGES", this.state.messages)
		
		
		
		return (
			<div>
			<Card  title="Forgot" >
				<div ref={(panel) => { this.panel = panel }} className='chat'>
					<MessageList
					className='message-list'
					lockable={true}
					dataSource={this.state.messages} />
					
				</div>
			</Card>
			<Input
			placeholder="Type here..."
			inputStyle= {Object.assign({
				border: "2px solid #006B50",
				height: '45px'
			})}
			autoHeight={true}
			multiline={true}
			maxlength = {300}
			ref='input'
			inputRef={(input) => {this.input = input}}
			onKeyPress={(e) => {
				if (e.shiftKey && e.charCode === 13) {
						return true
				}
				if (e.charCode === 13) {
						this.onSubmit()
						e.preventDefault()
						return false
				}
			}}
			rightButtons={
				<Button
						color='white'
						backgroundColor='black'
						text='Send'
						onClick={this.onSubmit}/>
			}/>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	messages: state.chat.messages,
	sender: state.user.data.username
})

const mapDispatchToProps = dispatch => {
	return {
		fetchChat: (payload, initMessageHistory) => dispatch(ChatActions.fetchChatRequest(payload, initMessageHistory)),
		saveMsg: (payload) => dispatch(ChatActions.saveMsg(payload)),
	}
}

export default withRouter( 
	connect(mapStateToProps, mapDispatchToProps)(ChatPage))