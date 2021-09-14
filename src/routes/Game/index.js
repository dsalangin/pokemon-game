const GamePage = ({onChangePage}) => {
  const handleChangePage = () => {
    onChangePage('app');
  };
  
  return (
    <>
      <div>
        This is a game page.
      </div>
      <button onClick={handleChangePage}>
        Home Page
      </button>
    </>
  );
};

export default GamePage;