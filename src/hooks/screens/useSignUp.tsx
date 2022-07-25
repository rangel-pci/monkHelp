import { useState } from "react";
import { Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import firebaseErrorTranslate from '../../utils/firebaseErrorTranslate';
import { IUserConfig } from "../../@types/IUserConfig";
import firestore from '@react-native-firebase/firestore';

const useSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleNewSignUp = () => {
        if(!email || !password){
            return Alert.alert('Entrar', 'Informe e-mail e senha.');
        }
        if(password !== passwordConfirm){
            return Alert.alert('Entrar', 'A senha difere da confirmação.');
        }
        
        setIsLoading(true);

        try{
            auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                return createUserConfig(res.user.uid);
            })
            .catch((err) => {
                Alert.alert('Entrar', firebaseErrorTranslate(err.code));
            })
        }catch(err){
            Alert.alert('Erro', err);
            setIsLoading(false);
        }  
    }

    const createUserConfig = (uid) => {
        const userConfig: IUserConfig = {
            userId: uid,
            linkedToOrganization: '',
            ownOrganization: '',
            ownOrganizationId: '',
        } ;
        
        firestore()
        .collection('userConfig')
        .doc(auth().currentUser.uid)
        .set(userConfig)
        .then(res => {
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err)
            setIsLoading(false);
        })
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleNewSignUp,
        isLoading,
        passwordConfirm,
        setPasswordConfirm
    }
}

export default useSignUp