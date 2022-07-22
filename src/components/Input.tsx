import { Input as NativeBaseInput, IInputProps } from 'native-base';

const Input = ({...rest}: IInputProps) => {
    return (
        <NativeBaseInput
            bg="gray.700"
            h="14"
            size="md"
            fontSize="md"
            borderWidth={1}
            borderColor="gray.700"
            fontFamily="body"
            color="white"
            placeholderTextColor="gray.300"
            _focus={{
                borderWidth: 1,
                borderColor: 'green.500',
                bg: "gray.700"
            }}
            {...rest}
        />
    )
}

export default Input;