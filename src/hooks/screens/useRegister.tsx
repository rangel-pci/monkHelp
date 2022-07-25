import { useState } from "react";
import { Alert } from "react-native";
import firestore from '@react-native-firebase/firestore';
import firebaseErrorTranslate from '../../utils/firebaseErrorTranslate';
import { useNavigation, useRoute } from "@react-navigation/native";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { IOrder } from "../../@types/Order";

type RouteParams = {
    organization?: string;
}

type OrderOrg = IOrder & {
    organization?: string,
}

const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [patrimony, setPatrimony] = useState('');
    const [patrimonyUser, setPatrimonyUser] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState(1);

    const route = useRoute();
    const { organization } = route.params as RouteParams;
    const navigation = useNavigation();
    const handleNewOrderRegister = () => {
        if(!patrimony || !description || !patrimonyUser){
            return Alert.alert('Nova solicitação', 'Preencha todos os campos.')
        }

        setIsLoading(true);

        if(organization !== ''){
            firestore()
            .collection('organizations')
            .where('allowedUsers', 'array-contains', auth().currentUser.email)
            .where('name', '==', organization)
            .get()
            .then(res => {
                if(res.docs.length === 0){
                    return Alert.alert('Nova solicitação', 'Você não possui autorização nessa organização, verique se o nome da organização está exatamente correto em configurações.');
                }

                createNewOrder(res.docs[0].id);
            })
            .catch((err) => {
                Alert.alert('Nova solicitação', firebaseErrorTranslate(err.code));
            })
        }else{
            createNewOrder();
        }
    }

    const createNewOrder = (docId = '') => {
        let newOrder = {
            userId: auth().currentUser.uid,
            priority,
            patrimony,
            patrimonyUser,
            description,
            status: 'open',
            created_at: firestore.FieldValue.serverTimestamp()
        } as OrderOrg;

        
        try{
            if(docId !== ''){
                firestore()
                .collection('organizations')
                .doc(docId)
                .collection('orders')
                .add(newOrder)
                .then((res) => {
                    console.log(res)
                    Alert.alert('Nova solicitação', 'Registrada com sucesso.');
                    navigation.goBack();
                })
                .catch((err) => {
                    console.log(err);
                    
                    Alert.alert('Nova solicitação', firebaseErrorTranslate(err.code));
                    setIsLoading(false);
                })
            }else{
                firestore()
                .collection('orders')
                .add(newOrder)
                .then((res) => {
                    console.log(res)
                    Alert.alert('Nova solicitação', 'Registrada com sucesso.');
                    navigation.goBack();
                })
                .catch((err) => {
                    console.log(err);
                    
                    Alert.alert('Nova solicitação', firebaseErrorTranslate(err.code));
                    setIsLoading(false);
                })
            }            
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