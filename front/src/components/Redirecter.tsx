import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const Redirecter = () => {
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:20000/${params.id}`)
      .then((resp) => {
        window.location.href = resp.data.items.full;
      })
      .catch(() => {
        window.location.href = 'http://localhost:3000/404';
      });
  });

  return <></>;
};

export default Redirecter;
