import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const firestoreDateFormat = (timestamp: FirebaseFirestoreTypes.Timestamp): string => {
    if(timestamp){
        const dt = new Date(timestamp.toDate());

        const date = dt.toLocaleDateString('pt-BR');
        const hour = dt.toLocaleTimeString('pt-BR')
        const dateArr = date.split('/');
        
        return `${dateArr[1]}/${dateArr[0]}/${dt.getFullYear()} às ${hour}`;
    }
}

export default firestoreDateFormat;