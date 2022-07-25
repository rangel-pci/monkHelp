import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import firestoreDateFormat from '../../utils/firestoreDateFormat';
import { OrderDetails } from '../../@types/IOrderDetails';
import { Alert } from 'react-native';
import firebaseErrorTranslate from '../../utils/firebaseErrorTranslate';
import auth from '@react-native-firebase/auth';
import { IUserConfig } from '../../@types/IUserConfig';
import { IOrganization } from '../../@types/IOrganization';


const useConfigs = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSave1Loading, setIsSave1Loading] = useState(false);
    const [isSave2Loading, setIsSave2Loading] = useState(false);
    const [isSave3Loading, setIsSave3Loading] = useState(false);
    const [allowedUser, setAllowedUser] = useState('');
    const [userConfig, setUserConfig] = useState<IUserConfig>({} as IUserConfig);
    const [linkedToOrganization, setLinkedToOrganization] = useState('');
    const [ownOrganization, setOwnOrganization] = useState('');
    const [organization, setOrganization] = useState<IOrganization>({} as IOrganization);

    useEffect(() => {
        try{
            firestore()
            .collection('userConfig')
            .where('userId', '==', auth().currentUser.uid)
            .get()
            .then(res => {
                const doc = res.docs[0];
                
                const {
                    userId,
                    linkedToOrganization,
                    ownOrganization,
                    ownOrganizationId,
                } = doc.data();

                setUserConfig({
                    id: doc.id,
                    userId,
                    linkedToOrganization,
                    ownOrganization,
                    ownOrganizationId,
                });

                setLinkedToOrganization(linkedToOrganization);
                setOwnOrganization(ownOrganization);
                getOrg(ownOrganizationId, () => setIsLoading(false));
            })
            .catch((err) => {
                console.log(err)
            })
        }catch(err){
            Alert.alert('Erro', err);
            setIsLoading(false);
        }
    }, []);

    const handleLinkOrganization = () => {
        setIsSave1Loading(true);

        try{
            firestore()
            .collection('userConfig')
            .doc(userConfig.id)
            .update({
                linkedToOrganization
            })
            .then(() => {
                setIsSave1Loading(false);
            })
            .catch((err) => {
                console.log(err)
                Alert.alert('Configuração', firebaseErrorTranslate(err.code));
                setIsSave1Loading(false);
            })
        }catch(err){
            Alert.alert('Erro', err);
            setIsSave1Loading(false);
        }
    }

    const handleOwnOrganization = () => {
        setIsSave2Loading(true);

        try{
            firestore()
            .collection('organizations')
            .where('name', '==', ownOrganization)
            .limit(1)
            .get()
            .then(res => {
                if(res.docs.length > 0){
                    setIsSave2Loading(false);
                    Alert.alert('Configuração', 'O nome identificador já existe, tente adicionar um número.\nEx: nome_9988.');
                }else{
                    createOrUpdateOrg();
                }
            })
        }catch(err){
            Alert.alert('Erro', err);
            setIsSave2Loading(false);
        }
    }

    const createOrUpdateOrg = () => {
        if(userConfig.ownOrganizationId){
            return updateOrg(() => setIsSave2Loading(false));
        }
        createOrg();
    }

    const updateOrg = (callBack) => {
        const org = {...organization}
        org.name = ownOrganization;

        try{
            firestore()
            .collection('organizations')
            .doc(userConfig.ownOrganizationId)
            .update(org)
            .then(() => {
                setOrganization(org);
                callBack();
            })
            .catch((err) => {
                console.log(err)
                Alert.alert('Configuração', firebaseErrorTranslate(err.code));
                callBack();
            })
        }catch(err){
            Alert.alert('Erro', err);
            callBack();
        }
    }

    
    const getOrg = (ownOrganizationId, callBack) => {
        if(!ownOrganizationId){
            return callBack();
        }
        
        try{
            firestore()
            .collection('organizations')
            .doc(ownOrganizationId)
            .get()
            .then((res) => {
                const {
                    allowedUsers,
                    name,
                    ownerId
                } = res.data();

                setOrganization({
                    allowedUsers: allowedUsers ? allowedUsers : [],
                    name,
                    ownerId
                });

                callBack();
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Configuração', firebaseErrorTranslate(err.code));
                callBack();
            })
        }catch(err){
            Alert.alert('Erro', err);
            callBack();
        }        
    }

    const createOrg = () => {
        const organization = {
            ownerId: auth().currentUser.uid,
            name: ownOrganization,
            allowedUsers: [],
            created_at: firestore.FieldValue.serverTimestamp()
        };
        try{
            firestore()
            .collection('organizations')
            .add(organization)
            .then((res) => {
                setOrganization(organization);

                const data = userConfig;
                data.ownOrganization = ownOrganization;
                data.ownOrganizationId = res.id;

                updateUserConfig(data);
                setIsSave2Loading(false);
            })
            .catch((err) => {
                Alert.alert('Configuração', firebaseErrorTranslate(err.code));
                setIsSave2Loading(false);
            })
        }catch(err){
            Alert.alert('Erro', err);
            setIsSave2Loading(false);
        }
    }
    
    const updateUserConfig = (data: IUserConfig) => {
        firestore()
        .collection('userConfig')
        .doc(userConfig.id)
        .update(data)
        .catch((err) => {
            console.log(err)
            Alert.alert('Configuração', firebaseErrorTranslate(err.code));
            setIsSave1Loading(false);
        })
    }

    const handleAllowedUser = () => {
        if(!allowedUser){
            return Alert.alert('Configuração', 'Informe o e-mail do usuário');
        }

        if(organization.allowedUsers.includes(allowedUser)){
            return Alert.alert('Configuração', allowedUser + ' já está autorizado.');
        }
        
        const org = {...organization};
        org.allowedUsers.push(allowedUser);
        setOrganization(org)
        setAllowedUser('');

        try{
            firestore()
            .collection('organizations')
            .doc(userConfig.ownOrganizationId)
            .update(org)
            .catch((err) => {
                console.log(err)
                Alert.alert('Configuração', firebaseErrorTranslate(err.code));
            })
        }catch(err){
            Alert.alert('Erro', err);
        }
    }

    const handleRemoveAllowedUser = (user) => {
        let temp = [];
        
        organization.allowedUsers.filter((i) => {
            if(i !== user){
                temp.push(i);
            }
        })

        const org = {...organization};
        org.allowedUsers = temp;
        setOrganization(org);

        try{
            firestore()
            .collection('organizations')
            .doc(userConfig.ownOrganizationId)
            .update(org)
            .catch((err) => {
                console.log(err)
                Alert.alert('Configuração', firebaseErrorTranslate(err.code));
            })
        }catch(err){
            Alert.alert('Erro', err);
        }
    }

    return {
        isLoading,
        userConfig,
        linkedToOrganization,
        setLinkedToOrganization,
        ownOrganization,
        setOwnOrganization,
        organization,
        handleLinkOrganization,
        handleOwnOrganization,
        isSave1Loading,
        isSave2Loading,
        isSave3Loading,
        allowedUser,
        setAllowedUser,
        handleAllowedUser,
        handleRemoveAllowedUser
    }
}

export default useConfigs;