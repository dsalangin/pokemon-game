import { useState } from 'react';
import s from './style.module.css';

const LoginForm = ({onSubmit}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [log, setLog] = useState('Login?');
  const [sign, setSign] = useState('SIGNUP');
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit && onSubmit(sign, {
      email,
      password
    })
    setEmail('');
    setPassword('');
  };

  const handleChangeLog = () => {
    if (log === 'Login?') {
      setLog('Register?');
      setSign('SIGNIN');
    } else {
      setLog('Login?');
      setSign('SIGNUP');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className={s.root}>
        <input
          value={email} 
          type="text"
          className={s.input}
          required
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <span className={s.highlight}></span>
        <span className={s.bar}></span>
        <label className={s.label}>Email</label>
      </div>
      <div className={s.root}>
        <input
          value={password}
          type={showPassword ? 'text' : 'password'}
          className={s.input}
          required
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <span className={s.highlight}></span>
        <span className={s.bar}></span>
        <label className={s.label}>Password</label>
        <div onClick={handleShowPassword}>
          Show password
        </div>
      </div>
      <div className={s.flex}>
        <button>
          { sign }
        </button>
          <span 
            className={s.logButton}
            onClick={handleChangeLog}
          >
            { log }
          </span>
      </div>
    </form>
  );
}

export default LoginForm;