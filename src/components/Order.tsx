import { Box, Circle, HStack, Pressable, IPressableProps, Text, useTheme, VStack } from 'native-base';
import { IOrder } from '../@types/Order';
import { Octicons } from '@expo/vector-icons';

type Props =  IPressableProps & {
    data: IOrder,
}

const Order = ({ data, ...rest }: Props) => {
    const { colors } = useTheme();
    const colorType = data.status === 'closed' ? colors.green[300] : data.priority === 0 ? 'white' : data.priority === 1 ? colors.secondary[700] : colors.red[700];

    return (
        <Pressable {...rest}>
            <HStack
                bg="gray.600"
                mb={4}
                alignItems="center"
                justifyContent="space-between"
                rounded="sm"
                overflow="hidden"
            >
                <Box h="100%" w={2} bg={colorType} />
                <VStack flex={1} my={5} ml={5}>
                    <Text color="white" fontSize="md">
                        # {data.patrimony}
                    </Text>

                    <HStack alignItems="center">
                        <Octicons name="clock" color={colors.gray[300]} size={15} />
                        <Text color="gray.300" fontSize="xs" ml={1} mb={.5}>{data.when}</Text>
                    </HStack>
                </VStack>

                <Circle bg="gray.500" h={12} w={12} mr={5}>
                    {data.status === 'open'
                    ? <Octicons name="hourglass" color={colorType} size={15} />
                    : <Octicons name="checklist" color={colorType} size={15} />
                    }
                </Circle>

                <Circle bg="gray.700" h={6} w={2} mr={5} style={{position: 'absolute', top: -18, right: 55}}>
                </Circle>
                <Circle bg="gray.700" h={6} w={2} mr={5} style={{position: 'absolute', bottom: -18, right: 55}}>
                </Circle>
            </HStack>
        </Pressable>
    )
}

export default Order;
