import { Button } from '@mui/material';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../css/notFound.scss';

const NotFound = () => {
  return (
    <Fragment>
      <div id="background"></div>
      <div className="top">
        <h1>404</h1>
        <h3>page not found</h3>
      </div>
      <div className="container">
        <div className="ghost-copy">
          <div className="one"></div>
          <div className="two"></div>
          <div className="three"></div>
          <div className="four"></div>
        </div>
        <div className="ghost">
          <div className="face">
            <div className="eye"></div>
            <div className="eye-right"></div>
            <div className="mouth"></div>
          </div>
        </div>
        <div className="shadow"></div>
      </div>
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <Button>Retourner en lieu sûr</Button>
      </Link>
    </Fragment>
  );
};

export default NotFound;
