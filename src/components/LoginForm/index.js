import { useEffect, useState } from 'react';
import s from './style.module.css';

const LoginForm = ({onSubmit, isResetField=false}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
  },[isResetField]);

  const [isLogin, setLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit && onSubmit({
      type: isLogin ? 'login' : 'signup',
      email,
      password,
    })
    setEmail('');
    setPassword('');
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
          { isLogin ? 'Login' : 'Signup' }
        </button>
          <span 
            className={s.logButton}
            onClick={() => setLogin(!isLogin)}
          >
            { isLogin ? 'Register' : 'Login' }
          </span>
      </div>
    </form>
  );
}

export default LoginForm;