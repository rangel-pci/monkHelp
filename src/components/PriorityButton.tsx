import { Button as ButtonNativeBase, IButtonProps, Heading } from 'native-base';

type Props = IButtonProps & {
    title: string,
    selected: boolean,
    color: string,
}

const PriorityButton = ({title, selected, color, ...rest}: Props) => {
    return (
        <ButtonNativeBase
            h={14}
            rounded="sm"
            w="auto"
            mx={1}
            bg="gray.700"
            _pressed={{ bg: "gray.600" }}
            borderWidth={1}
            variant={selected ? 'outline' : 'solid'}
            borderColor={selected ? color : 'gray.700'}
            {...rest}
        >
            <Heading color={selected ? color : 'white'} fontSize="sm">{title}</Heading>
        </ButtonNativeBase>
    )
}

export default PriorityButton;