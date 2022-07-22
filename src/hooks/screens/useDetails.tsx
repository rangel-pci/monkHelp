import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import firestoreDateFormat from '../../utils/firestoreDateFormat';
import { OrderDetails } from '../../@types/IOrderDetails';
import { Alert } from 'react-native';
import firebaseErrorTranslate from '../../utils/firebaseErrorTranslate';

type RouteParams = {
    orderId: string;
}

const useDetails = () => {
    const [order, setOrder] = useState<OrderDetails>({} as OrderDetails);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaveLoading, setIsSaveLoading] = useState(false);
    const [solution, setSolution] = useState('');
    
    const route = useRoute();
    const { orderId } = route.params as RouteParams;
    const navigation = useNavigation();

    useEffect(() => {
        try{
            firestore()
            .collection('orders')
            .doc(orderId)
            .get()
            .then((doc) => {
                const { 
                    priority,
                    patrimony, patrimonyUser,
                    description, status,
                    solution, created_at, closed_at
                } = doc.data();

                setOrder({
                    id: doc.id,
                    priority,
                    patrimony,
                    patrimonyUser,
                    description,
                    status,
                    solution,
                    when: firestoreDateFormat(created_at),
                    closed: closed_at ? firestoreDateFormat(closed_at) : null,
                });

                setIsLoading(false);
            })
        }catch(err){
            Alert.alert('Erro', err);
            setIsLoading(false);
        }
    }, []);

    const handleOrderClose = () => {
        if(!solution){
            return Alert.alert('Solicitação', 'Informe a solução para fechar a solicitação.');
        }
        
        setIsSaveLoading(true);

        try{
            firestore()
            .collection('orders')
            .doc(orderId)
            .update({
                status: 'closed',
                solution,
                closed_at: firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                Alert.alert('Solicitação', 'Solicitação fechada com sucesso.')
                navigation.goBack();  
            })
            .catch((err) => {
                Alert.alert('Entrar', firebaseErrorTranslate(err.code));
                setIsSaveLoading(false);
            })
        }catch(err){
            Alert.alert('Erro', err);
            setIsSaveLoading(false);
        }
    }

    return {
        order,
        setOrder,
        isLoading,
        setIsLoading,
        solution,
        setSolution,
        handleOrderClose,
        isSaveLoading
    }
}

export default useDetails;