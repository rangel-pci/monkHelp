import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
    title: string,
}

const Button = ({title, ...rest}: Props) => {
    return (
        <ButtonNativeBase h={14} rounded="sm" w="100%" bg="green.700" _pressed={{ bg: "green.500" }} {...rest}>
            <Heading color="white" fontSize="sm">{title}</Heading>
        </ButtonNativeBase>
    )
}

export default Button;