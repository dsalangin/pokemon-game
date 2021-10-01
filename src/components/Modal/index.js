import { useEffect, useRef } from 'react';
import cn from 'classnames';
import s from './style.module.css';

const Modal = ({isOpen, title, children, onCloseModal}) => {
  const modalEl = useRef();

  useEffect(() => {
     document.querySelector('body').style.overflow= isOpen ? 'hidden': null;
  },[isOpen])

  const handleCloseModal = () => {
    onCloseModal && onCloseModal();
  };

  const handleClickRoot = (evt) => {
    if(!modalEl.current.contains(evt.target)) {
      handleCloseModal();
    };
  };

  return(
    <div 
      className={cn(s.root, {[s.open]: isOpen})}
      onClick={handleClickRoot}
    >
      <div
        ref={modalEl} 
        className={s.modal}
      >
        <div className={s.head}>
            { title }
          <span 
            className={s.btnClose}
            onClick={handleCloseModal}            
          >
          </span>
        </div>
        <div className={s.content}>
          { children }
        </div>
      </div>
    </div>
  );
};

export default Modal;