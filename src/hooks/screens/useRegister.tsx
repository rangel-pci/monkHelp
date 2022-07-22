import { useState } from "react";
import { Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import firebaseErrorTranslate from '../../utils/firebaseErrorTranslate';
import { useNavigation } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [patrimony, setPatrimony] = useState('');
    const [patrimonyUser, setPatrimonyUser] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(1);

    const navigation = useNavigation();
    const handleNewOrderRegister = () => {
        if(!patrimony || !description || !patrimonyUser){
            return Alert.alert('Nova solicitação', 'Preencha todos os campos.')
        }

        setIsLoading(true);
        try{
            firestore()
            .collection('orders')
            .add({
                userId: auth().currentUser.uid,
                priority,
                patrimony,
                patrimonyUser,
                description,
                status: 'open',
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then((res) => {
                Alert.alert('Nova solicitação', 'Registrada com sucesso.');
                navigation.goBack();
            })
            .catch((err) => {
                console.log(err);
                
                Alert.alert('Nova solicitação', firebaseErrorTranslate(err.code));
                setIsLoading(false);
            })
        }catch(err){
            Alert.alert('Erro', err);
            setIsLoading(false);
        }
    }

    return {
        patrimony,
        setPatrimony,
        description,
        setDescription,
        isLoading,
        handleNewOrderRegister,
        patrimonyUser,
        setPatrimonyUser,
        priority,
        setPriority
    }
}

export default useRegister