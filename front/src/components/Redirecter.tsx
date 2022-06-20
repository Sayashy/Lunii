import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { changeLocation } from '../utils/helpers';

const Redirecter = () => {
  const params = useParams();

  useEffect(() => {
    axios
      .patch(`http://localhost:20000`, { id: params.id })
      .then((resp) => changeLocation(resp.data.item.full))
      .catch(() => changeLocation('http://localhost:3000/404'));
  });

  return <></>;
};

export default Redirecter;
