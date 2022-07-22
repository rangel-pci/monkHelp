import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import AppLoggedInRoutes from './appLoggedIn.routes';
import AppLoggedOutRoutes from './appLoggedOut.routes';

export default function Routes() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(res => {
      setUser(res);
      setIsLoading(false);
    });

    return subscriber;
  },[]);

  if (isLoading) {
    return <Loading />
  }
  
  if(!user){
    return(
      <AppLoggedOutRoutes />
    )
  }

  return (
    <AppLoggedInRoutes />
  )
}