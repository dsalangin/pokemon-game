import {useHistory} from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();
  const handleChangePage = () => {
    history.push('/')
  };
  return (
    <>
    <h1>404 Not Found</h1>
    <button onClick={handleChangePage}>
      Home Page
    </button>
    </>
  );
};

export default NotFound;