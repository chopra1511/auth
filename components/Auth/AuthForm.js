import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPass = passwordInputRef.current.value;

    setIsLoading(true);
    if(isLogin){

    }else{
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDM0_dC5wTTPqMD9VDcI57KONSHvCvPWBM",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass,
            returnSecureToken: true
          }),
          headers:{
            "Content-Type": "application/json"
          }
        }
      ).then(res => {
        setIsLoading(false);
        if(res.ok) {

        }else{
          return res.json().then(data => {
            let errorTxt = 'Login Failed';
            if(data && data.error && data.error.message){
              errorTxt = data.error.message;
            }
            alert(errorTxt);
          });
        }
      })
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Loading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
