import cn from 'classnames';
import { ReactComponent as LoginSVG } from '../../assets/login.svg';
import s from './style.module.css';

const Navbar = ({isOpen, clickHamburger, bgActive=false, onClickLogin}) => {
  const handleClick = () => {
    clickHamburger && clickHamburger();
  }

  return (
    <nav className={cn(s.root, {[s.bgActive]: bgActive})}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          LOGO
        </p>
        <div className={s.loginAndMenu}>
          <div 
          className={s.loginWrap}
          onClick={onClickLogin}
          >
            <LoginSVG />
          </div>
          <div 
            className={cn(s.menuButton, {[s.active]: isOpen})} 
            onClick={handleClick}
          >
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;