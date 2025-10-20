import {useContext} from 'react';
 import {AuthContext} from '../context/AuthContext';

function HomePage() {
   const data = useContext(AuthContext);

  return (
    <div>HomePage</div>
  )
}

export default HomePage