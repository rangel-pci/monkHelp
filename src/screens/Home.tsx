import { Center, FlatList, Heading, HStack, IconButton, Text, useTheme, VStack } from "native-base";
import Logo from '../assets/monkLogo2.svg'
import { Octicons } from '@expo/vector-icons';
import Filter from '../components/Filter';
import useHome from "../hooks/screens/useHome";
import Order from "../components/Order";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";

const Home = () => {
    const { colors } = useTheme();
    const { 
        isLoading,
        statusSelected,
        setStatusSelected,
        orders,
        setOrders,
        handleLogOut
    } = useHome();

    const navigation = useNavigation();
    const handleNewOrder = () => {
        navigation.navigate('register');
    }
    const handleOpenDetails = (orderId: string) => {
        navigation.navigate('details', { orderId });
    }

    return (
        <VStack flex={1} pb={6} bg="gray.700">
            <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                bg="gray.600"
                pt={12}
                pb={5}
                px={6}
            >
                <Logo />
                <IconButton
                    icon={<Octicons name="sign-out" color={colors.gray[300]} size={24} />}
                    onPress={handleLogOut}
                />
            </HStack>

            <VStack flex={1} px={6}>
                <HStack
                    w="100%"
                    mt={8}
                    mb={4}
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Heading color="gray.100">Solicitações</Heading>    
                    <Text color="gray.200">
                        {orders.length}
                    </Text>
                </HStack>

                <HStack space={2} mb={8}>
                    <Filter
                        type="open"
                        title="em andamento"
                        onPress={() => setStatusSelected('open')}
                        isActive={statusSelected === 'open'}
                    />
                    <Filter
                        type="closed"
                        title="finalizadas"
                        onPress={() => setStatusSelected('closed')}
                        isActive={statusSelected === 'closed'}
                    />
                </HStack>

                {isLoading ? <Loading /> : 
                    <FlatList
                        data={orders}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <Order data={item} onPress={() => handleOpenDetails(item.id)} /> }
                        contentContainerStyle={{ paddingBottom: 50 }}
                        ListEmptyComponent={() => (
                            <Center>
                                <Octicons name="inbox" color={colors.gray[400]} size={50} />
                                <Text
                                    color="gray.300"
                                    fontSize="xl"
                                    mt={6}
                                    textAlign="center"
                                >
                                    Você ainda não possui {'\n'}
                                    solicitações {statusSelected === 'open' ? 'em andamento' : 'finalizadas'}
                                </Text>
                            </Center>
                        )}
                    />
                }

                <Button
                    title="Nova solicitação"
                    bg="green.700"
                    _pressed={{ bg: "green.500" }}
                    onPress={handleNewOrder}
                />
            </VStack>
        </VStack>
    )
}

export default Home;