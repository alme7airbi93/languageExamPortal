import Spinner from 'react-bootstrap/Spinner';

function OverlayLoader() {
  return (
    <div className="d-flex justify-content-center align-items-center position-absolute w-100 h-100 z-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default OverlayLoader;
