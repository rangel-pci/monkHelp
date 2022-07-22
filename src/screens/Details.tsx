import { Box, HStack, ScrollView, Text, useTheme, View, VStack } from 'native-base';
import Header from '../components/Header';
import Loading from '../components/Loading';
import useDetails from '../hooks/screens/useDetails';
import { Octicons } from '@expo/vector-icons';
import CardDetails from '../components/CardDetails';
import Input from '../components/Input';
import Button from '../components/Button';
import PriorityButton from '../components/PriorityButton';

const Details = () => {
    const { colors } = useTheme();
    const {
        order,
        setOrder,
        isLoading,
        setIsLoading,
        solution,
        setSolution,
        handleOrderClose,
        isSaveLoading
    } = useDetails();

    const colorType = order.status === 'closed' ? colors.green[300] : order.priority === 0 ? 'white' : order.priority === 1 ? colors.secondary[700] : colors.red[700];
    
    return (
        <VStack flex={1} bg="gray.700">
            <Header p={8} title="Solicitação" />

            {isLoading ? <Loading /> :
                <Box flex={1}>
                    <HStack bg="gray.500" justifyContent="center" p={4}>
                        {order.status === 'open'
                            ? <Octicons name="hourglass" color={colorType} size={15} />
                            : <Octicons name="checklist" color={colors.green[300]} size={15} />
                        }

                        <Text
                            fontSize="sm"
                            color={colorType}
                            ml={2}
                            mt={-1}
                            textTransform="uppercase"
                        >
                            {order.status === 'open' ? 'em andamento' : 'finalizada'}
                        </Text>
                    </HStack>

                    <ScrollView flex={1} mx={5}>
                        <Box pb={4}>
                            <Box px={5} mt={5}>
                                <HStack alignItems="center">
                                    <Octicons name="person" color={colors.primary[700]} size={15}  />
                                    <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
                                        {order.patrimonyUser}
                                    </Text>
                                </HStack>
                                <Box>
                                    <Text color="gray.300" fontSize={11}>
                                        {order.when}
                                    </Text>
                                </Box>
                            </Box>

                            <CardDetails
                                title="equipamento"
                                description={'# ' + order.patrimony}
                                icon='device-desktop'
                            />

                            <CardDetails
                                title="descrição do problema"
                                description={order.description}
                                icon='comment'
                            />

                            <CardDetails
                                title="solução"
                                icon='verified'
                                footer={order.closed && 'Encerrado em ' + order.closed}
                                description={order.solution}
                            >
                                {order.status === 'open' &&
                                    <Input
                                        placeholder='Descrição da solução'
                                        onChangeText={setSolution}
                                        h={24}
                                        textAlignVertical="top"
                                        multiline
                                    />
                                }
                            </CardDetails>

                            {order.status === 'open' && 
                                <Button
                                    title="Fechar solicitação"
                                    mt={4}
                                    onPress={handleOrderClose}
                                    isLoading={isSaveLoading}
                                />
                            }
                        </Box>
                    </ScrollView>
                </Box>
            }
        </VStack>
    )
}

export default Details;