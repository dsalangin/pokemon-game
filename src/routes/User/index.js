import { useSelector, useDispatch } from 'react-redux';
import { selectUser, removeUser } from '../../store/user';
import { Link } from 'react-router-dom';

const UserPage = () => {
  const dispatch = useDispatch();

  const {localId, email, createdAt} = useSelector(selectUser);
  const createdDate = String(new Date(+createdAt));

  const handleClick = () => {
    localStorage.removeItem('idToken');
    dispatch(removeUser());
  };

  return (
    <>
      <div>
        Local ID: {localId}
      </div>
      <div>
        Email: {email}
      </div>
      <div>
        Created: {createdDate}
      </div>
        <Link
          to="/"
          onClick={handleClick}
        >
          Log Out
        </Link>
        
    </>
  );
};

export default UserPage;