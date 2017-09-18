import React, { Component } from 'react';
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux'; 
import './LoginForm.css';
import * as sessionActions from '../actions/sessionActions';

class SuccessLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {message:"Signed in to CloudStaff"}
  }

  componentDidMount(){
      var sessionStorage = window.sessionStorage;
      this.setState({message:sessionStorage.authenticatedMessage});
  }

  handleLogout = (event) => {
       var sessionStorage = window.sessionStorage;
       sessionStorage.removeItem("deviceIdentityToken");
       sessionStorage.removeItem("authenticatedMessage");
       try{
         this.props.history.push("/login")
       }catch(e){

       }
  }

  render() {
    var message = this.state.message;
    return (
      <div className="row">
          <h1 className="text-center login-title">{message}</h1>
          <a href="#" onClick={this.handleLogout}>Log Out</a>
         </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(SuccessLoginPage);
//export default LoginPage;