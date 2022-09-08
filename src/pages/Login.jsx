import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { getEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isButtonDisabled: true,
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      this.disableButton();
    });
  };

  disableButton = () => {
    const { name, email } = this.state;
    const minNameLength = 1;
    const formatEmail = email.includes('.com');
    if (name.length >= minNameLength && formatEmail) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  // handleSubmit = () => {
  //   const { dispatch } = this.props;
  //   const { email } = this.state;
  //   dispatch(getPerson());
  //   // history.push('/');
  // };

  render() {
    const { isButtonDisabled, email, name } = this.state;
    return (
      <main>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="nameLogin">
            <input
              type="name"
              name="name"
              placeholder="Name"
              id="nameLogin"
              onChange={ this.onInputChange }
              value={ name }
              data-testid="input-player-name"
              minLength={ 6 }
              required
            />
            <label
              htmlFor="emailLogin"
            >
              <input
                type="email"
                name="email"
                id="emailLogin"
                placeholder="Email"
                onChange={ this.onInputChange }
                value={ email }
                data-testid="input-gravatar-email"
                required
              />
            </label>
            <button
              data-testid="btn-play"
              disabled={ isButtonDisabled }
              type="button"
            >
              Play

            </button>
          </label>
        </form>
      </main>
    );
  }
}

// Login.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
// };

export default connect()(Login);
