import React from 'react'
import { SpinLoader } from 'react-css-loaders'
import { Form, Icon, Input, Button, Card} from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import UserActions from '../Redux/user'
import { MessageList } from 'react-chat-elements'


class ChatPage extends React.Component {

	componentDidMount() {
		this.props.verifyCode({
			code: this.props.match.params.code
		}, this.actionRedirect)
	}

	render() {
		return (
			<Card title="Forgot">
				<MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
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