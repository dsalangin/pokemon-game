import s from './style.module.css';
import cn from 'classnames';

const Navbar = ({isActive, onChangeMenu}) => {
  const handleClick = () => {
    onChangeMenu && onChangeMenu();
  }

  return (
    <nav className={s.root}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          LOGO
        </p>
        <a href="#s" className={cn(s.menuButton, {[s.active]: isActive})} onClick={handleClick}>
          <span />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;