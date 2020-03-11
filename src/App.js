import React, { Component } from 'react'
import './App.css'
const Modernizr = window.Modernizr

class App extends Component {
  state = {
    email         : '',
    password      : '',
    formErrors    : {
      email       : '',
      password    : ''
    },
    emailValid    : false,
    passwordValid : false,
    formValid     : false
  }

  componentDidMount() {
    if (!Modernizr.opacity) alert('this web not support opacity')
    if (!Modernizr.csstransforms) alert('this web not support transform')
  }

  changeHandler = e => {
    const name  = e.target.name
    const value = e.target.value
    this.setState({ [name]: value }, () => {
      this.validateHandler(name, value)
    })
  }

  validateHandler = (fieldName, value) => {
    let errors        = this.state.formErrors
    let emailValid    = this.state.emailValid
    let passwordValid = this.state.passwordValid

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        if (!emailValid) {
          this.setState({ emailValid: false })
          errors.email = 'please insert email !'
        } else {
          this.setState({ emailValid: true })
          errors.email = 'email done!'
        }
        break
      case 'password':
        passwordValid = value.length >= 8
        if (!passwordValid) {
          this.setState({ passwordValid: false })
          errors.password = 'password must be at least 8 character'
        } else {
          this.setState({ passwordValid: true })
          errors.password = 'password done !'
        }
        break
      default:
        break
    }

    if (emailValid && passwordValid) 
      this.setState({ formValid: true })
    else 
      this.setState({ formValid: false })
  }

  submitHandler = e => {
    const { formValid } = this.state

    e.preventDefault()
    if (formValid) 
      alert('form submitted')
    else 
      alert('check erorr !')
  }

  render() {
    const {
      email,
      password,
      emailValid,
      passwordValid,
      formErrors,
      formValid
    } = this.state
    return (
      <section>
        <form
          onSubmit={e => this.submitHandler(e)}
          className={`${formValid && 'valid'}`}
        >
          <h2>Form</h2>
          <div className={'group'}>
            {formErrors.email && (
              <div className={`notif ${emailValid && 'valid show'}`}>
                {formErrors.email}
              </div>
            )}
            <label>email</label>
            <input
              name={'email'}
              value={email}
              onChange={e => this.changeHandler(e)}
            />
          </div>
          <div className={'group'}>
            <label>password</label>
            <input
              name={'password'}
              value={password}
              onChange={e => this.changeHandler(e)}
            />
            {formErrors.password && (
              <div className={`notif ${passwordValid && 'valid show'}`}>
                {formErrors.password}
              </div>
            )}
          </div>
          <div className={'group'}>
            <button className={`${formValid && 'valid'}`} type={'submit'}>
              Submit
            </button>
          </div>
        </form>
      </section>
    )
  }
}

export default App
