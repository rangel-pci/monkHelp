import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { IOrder } from "../../@types/Order";
import firebaseErrorTranslate from "../../utils/firebaseErrorTranslate";
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore";
import firestoreDateFormat from "../../utils/firestoreDateFormat";
import { IUserConfig } from "../../@types/IUserConfig";

const useHome = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
    const [originSelected, setOriginSelected] = useState<'my' | 'organization'>('my');
    const [userConfig, setUserConfig] = useState<IUserConfig>({} as IUserConfig);
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        setIsLoading(true);

        try{
            let subscriber;

            firestore()
            .collection('userConfig')
            .doc(auth().currentUser.uid)
            .get()
            .then(res => {
                setUserConfig(res.data() as IUserConfig);

                if(userConfig.linkedToOrganization && originSelected === 'organization'){
                    firestore()
                    .collection('organizations')
                    .where('allowedUsers', 'array-contains', auth().currentUser.email)
                    .where('name', '==', userConfig.linkedToOrganization)
                    .get()
                    .then(res => {
                        if(res.docs.length > 0){
                            let orgId = res.docs[0].id;
                            subscriber = getOrders(subscriber, orgId);
                        }else{
                            subscriber = false;
                            setOrders([]);
                            setIsLoading(false);
                        }

                        
                    })
                    .catch((err) => {
                        console.log(err);
                        Alert.alert('Erro', firebaseErrorTranslate(err.code));
                    })
                }else{
                    setOriginSelected('my');
                    subscriber = getOrders(subscriber);
                }
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Erro', firebaseErrorTranslate(err.code));
            })

            

            // firestore()
            // .collection('organizations')
            // .where('allowedUsers', 'array-contains', auth().currentUser.email)
            // .where('name', '==', organization)
            // .get()
            // .then(res => {
            //     if(res.docs.length === 0){
            //         return Alert.alert('Nova solicitação', 'Você não possui autorização nessa organização, verique se o nome da organização está exatamente correto em configurações.');
            //     }

            //     createNewOrder(organization);
            // })
            // .catch((err) => {
            //     Alert.alert('Nova solicitação', firebaseErrorTranslate(err.code));
            // })

            return subscriber;
        }catch(err){
            Alert.alert('Erro', err);
        }
    }, [statusSelected, originSelected])

    const getOrders = (subscriber, orgId = '') => {
        
        if(orgId !== ''){
            subscriber = firestore()
            .collection('organizations')
            .doc(orgId)
            .collection('orders')
        }else{
            subscriber = firestore()
            .collection('orders')
            .where('userId', '==', auth().currentUser.uid)
        }

        subscriber
        .where('status', '==', statusSelected)
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
    }

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
        originSelected,
        setOriginSelected,
        userConfig
    }
}

export default useHome