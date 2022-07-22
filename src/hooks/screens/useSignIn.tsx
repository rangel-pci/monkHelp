import { useState } from "react";
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import firebaseErrorTranslate from '../../utils/firebaseErrorTranslate';

const useSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = () => {
        if(!email || !password){
            return Alert.alert('Entrar', 'Informe e-mail e senha.');
        }
        
        setIsLoading(true);

        try{
            auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                Alert.alert('Entrar', firebaseErrorTranslate(err.code));
                setIsLoading(false);
            })
        }catch(err){
            Alert.alert('Erro', err);
            setIsLoading(false);
        }
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleSignIn,
        isLoading
    }
}

export default useSignIn