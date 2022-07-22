import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { IOrder } from "../../@types/Order";
import firebaseErrorTranslate from "../../utils/firebaseErrorTranslate";
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import firestoreDateFormat from "../../utils/firestoreDateFormat";

const useHome = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        setIsLoading(true);

        try{
            const subscriber = firestore()
            .collection('orders')
            .where('status', '==', statusSelected)
            .where('userId', '==', auth().currentUser.uid)
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => {
                    const { patrimony, priority, description, status, created_at } = doc.data();

                    return {
                        id: doc.id,
                        priority,
                        patrimony,
                        description,
                        status,
                        when: firestoreDateFormat(created_at)
                    }
                })

                setOrders(data);
                setIsLoading(false);
            });

            return subscriber;
        }catch(err){
            Alert.alert('Erro', err);
        }
    }, [statusSelected])

    const handleLogOut = () => {
        try{
            auth()
            .signOut()
            .catch((err) => {
                Alert.alert('Sair', firebaseErrorTranslate(err.code));
            })
        }catch(err){
            Alert.alert('Erro', err);
        }
    }

  
    return {
        isLoading,
        statusSelected,
        setStatusSelected,
        orders,
        setOrders,
        handleLogOut,
    }
}

export default useHome