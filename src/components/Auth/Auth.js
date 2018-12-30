import React, { Component } from 'react';
import axios from 'axios';

class Auth extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
    }

 
    handleUser = (val) => {
        this.setState({
            username: val
        })
    }

    handlePass = (val) => {
        this.setState({
            password: val
        })
    }

    handleClick = () => {
        const { username, password } = this.state
        axios.post('/api/register', { username, password })
            .then((user) => {
                // const { username, id, profile_pic } = user.data[0]
                console.log(user)
                // this.props.getUser(id, username, profile_pic)
                window.location.assign('/#/dashboard')
            })
    }

    handleLogin = () => {
        axios.post('/api/login', this.state).then(response => {
            console.log(response)

            window.location.assign('/#/dashboard')
        })
    }


    render() {
        return (
            <div>
                Auth Component
                <input type="text" value={this.state.username} onChange={(e) => this.handleUser(e.target.value)} />
                <input type="password" value={this.state.password} onChange={(e) => {this.handlePass(e.target.value)}} />
                <button onClick={() => this.handleLogin()}>Login</button>
                <button onClick={() => this.handleClick()}>Register</button>
            </div>
        )
    }
}

export default Auth