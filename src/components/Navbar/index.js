import s from './style.module.css';
import cn from 'classnames';

const Navbar = ({isOpen, clickHamburger, bgActive=false}) => {
  const handleClick = () => {
    clickHamburger && clickHamburger();
  }

  return (
    <nav className={cn(s.root, {[s.bgActive]: bgActive})}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          LOGO
        </p>
        <div className={cn(s.menuButton, {[s.active]: isOpen})} onClick={handleClick}>
          <span />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;