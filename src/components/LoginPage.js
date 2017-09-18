import React, { Component } from 'react';
import {bindActionCreators} from 'redux';  
import {connect} from 'react-redux'; 
import { FormControl, Alert} from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import {Redirect} from "react-router-dom";
import './LoginForm.css';
import * as sessionActions from '../actions/sessionActions';
import store from "../store";
import {isLoggedIn} from "./App";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {credentials:{mobile: '', pin: ''}, hasErrors:false, errors:{mobile:'', pin:'', auth:''}, isLoading:false, redirect:false};
    this.handleCredentialChange = this.handleCredentialChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCredentialChange(event){
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    this.setState({credentials:credentials});     
  }

  componentDidMount(){
    if (isLoggedIn()){
      this.setState({redirect:true});
    }  
  }

  handleSubmit = (event) => {
    var result = this.props.actions.logInUser(this.state.credentials);
    var me = this;
    this.setState({isLoading:true});
    result.then(function(response){
      me.setState({isLoading:false});
      var state = store.getState();
      me.setState({hasErrors:typeof state.errors !== "undefined"});
      if (typeof state.errors !== "undefined"){
        
        var errors = {errors:
                        {
                          mobile:typeof state.errors.mobile !== "undefined" ? state.errors.mobile:'',
                          pin:typeof state.errors.pin !== "undefined" ? state.errors.pin:'',
                          auth:typeof state.errors.auth !== "undefined" ? state.errors.auth:''
                        }
                     }
        me.setState(errors)
      }else{
        me.setState({redirect:true});
        me.setState({errors:{mobile:'', pin:'', auth:''}});
      }
    });
    event.preventDefault();
  }  



  render() {
    let alert = null;
    if (this.state.hasErrors) {
      alert =  <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
          <h4>{this.state.errors.mobile}</h4>
          <h4>{this.state.errors.pin}</h4>
           <h4>{this.state.errors.auth}</h4>
        </Alert>;
    }
    if (this.state.redirect){
      return <Redirect to="/success"/>
    }
    return (
      <div className="row">
          <div className="col-sm-6 col-md-4 col-md-offset-4">
            <h1 className="text-center login-title">Sign in to CloudStaff</h1>
            <div className="account-wall">
              <img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120" alt=""/>
             
              <form className="form-signin" onSubmit={this.handleSubmit}>
                 {alert}
                <FormControl id="formControlsPhone" type="text" label="Phone Number" placeholder="International Phone Number" name="mobile" value={this.state.credentials.mobile} onChange={this.handleCredentialChange}></FormControl>
                <FormControl id="formControlsPin" type="password" label="PIN" placeholder="4 Digit PIN" name="pin" value={this.state.credentials.pin} onChange={this.handleCredentialChange}></FormControl>
                <Button loading={this.state.isLoading} type="submit" bsStyle="primary" bsSize="large" block>Sign In</Button>
              </form>
            </div>
          </div>
        </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(LoginPage);
//export default LoginPage;