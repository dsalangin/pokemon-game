import s from './style.module.css';

const Layout = ({title, urlBg, colorBg='yellow', children}) => {
  const styleRoot = {};

  if (colorBg) {
    styleRoot.background = colorBg;
  };
  
  if (urlBg) {
    styleRoot.backgroundImage = `url(${urlBg})`;
  };

  return (
    <section className={s.root} style={styleRoot}>
      <div className={s.wrapper}>
          <article>
            <div className={s.title}>
              <h3>{title}</h3>
              <span className={s.separator}></span>
            </div>
            <div className={`{${s.desc} ${s.full}}`}>
              {children}
            </div>
          </article>
      </div>
    </section>
  );
};

export default Layout;