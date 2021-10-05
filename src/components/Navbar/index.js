import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLocalID, selectUserLoading } from '../../store/user';
import cn from 'classnames';
import { ReactComponent as LoginSVG } from '../../assets/login.svg';
import { ReactComponent as UserSVG } from '../../assets/user.svg';
import s from './style.module.css';

const Navbar = ({isOpen, clickHamburger, bgActive=false, onClickLogin}) => {
  const handleClick = () => {
    clickHamburger && clickHamburger();
  };

  const isLoadingUser = useSelector(selectUserLoading);
  const localId = useSelector(selectLocalID);

  return (
    <nav className={cn(s.root, {[s.bgActive]: bgActive})}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          LOGO
        </p>
        <div className={s.loginAndMenu}>
          { (!isLoadingUser && !localId) && (
            <div 
              className={s.loginWrap}
              onClick={onClickLogin}
            >
              <LoginSVG />
            </div>
          )}
          { (!isLoadingUser && localId) && (
            <Link
            className={s.loginWrap}
            to="/user"
            >
              <UserSVG />
            </Link>
          )}
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