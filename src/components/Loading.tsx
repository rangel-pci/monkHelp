import { Center, Spinner, ICenterProps } from 'native-base';

const Loading = ({...rest}: ICenterProps) => {
    return (
        <Center flex={1} bg="gray.700" {...rest} >
            <Spinner color="secondary.700" size={40} />
        </Center>
    )
}

export default Loading;
