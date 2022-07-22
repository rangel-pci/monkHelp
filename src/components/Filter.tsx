import { Button, IButtonProps, Text, useTheme, VStack } from "native-base"

type Props = IButtonProps & {
    title: string,
    isActive?: boolean,
    type: 'open' | 'closed',
}

const Filter = ({ title, isActive = false, type, ...rest }: Props) => {
    const { colors } = useTheme();
    const colorType = colors.green[300];
    
    return (
        <Button
            variant="outline"
            borderWidth={isActive ? 1 : 0}
            borderColor={colorType}
            bgColor="gray.600"
            flex={1}
            size="sm"
            {...rest}
        >
            <Text
                color={isActive ? colorType : "gray.300"}
                fontSize="xs"
                textTransform="uppercase"
            >
                {title}
            </Text>
        </Button>
    )
}

export default Filter