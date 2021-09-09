import Header from './components/Header/index';
import Layout from './components/Layout/index';
import Footer from './components/Footer/index';

import bg2 from './assets/bg2.jpg';
import bg3 from './assets/bg3.jpg';




function App() {
  return (
    <>
      <Header 
        title="This is title"
        descr="This is Description"
      />
      <Layout
        urlBg={bg2}
      />
      <Layout 
        colorBg="red"
      />
      <Layout 
        urlBg={bg3}
      />
      <Footer />
    </>
  );
}

export default App;
