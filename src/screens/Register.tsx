import { Icon, VStack, useTheme, ScrollView, Box, Slider, Text, HStack } from 'native-base';
import Input from '../components/Input';
import Button from '../components/Button';
import Header from '../components/Header';
import useRegister from '../hooks/screens/useRegister';
import PriorityButton from '../components/PriorityButton';

const Register = () => {
    const { colors } = useTheme();
    const {
        patrimony,
        setPatrimony,
        description,
        setDescription,
        isLoading,
        handleNewOrderRegister,
        patrimonyUser,
        setPatrimonyUser,
        priority,
        setPriority
    } = useRegister();

    const colorType = priority === 0 ? 'white' : priority === 1 ? colors.secondary[700] : colors.red[700];

    return (
        <VStack flex={1} p={8} pb={0} bg="gray.600">
            <Header title="Nova Solicitação" />
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
            
            
            <VStack mb={4} alignItems="center">
                <Text color="white" fontSize="md">Prioridade</Text>

                <HStack p={2}>
                    <PriorityButton title="Baixa" selected={priority === 0} color={colorType} w="1/3" onPress={() => setPriority(0)} />
                    <PriorityButton title="Normal" selected={priority === 1} color={colorType} w="1/3" onPress={() => setPriority(1)} />
                    <PriorityButton title="Alta" selected={priority === 2} color={colorType} w="1/3" onPress={() => setPriority(2)} />
                </HStack>
            </VStack>
            
            
                <Input
                    placeholder="Nome ou Número do Patrimônio"
                    mt={4}
                    mb={4}
                    value={patrimony}
                    onChangeText={setPatrimony}
                />
                <Input
                    placeholder="Nome do Usuário"
                    mb={4}
                    value={patrimonyUser}
                    onChangeText={setPatrimonyUser}
                />
                <Input
                    placeholder="Descrição do Problema"
                    mb={4}
                    flex={1}
                    textAlignVertical="top"
                    value={description}
                    onChangeText={setDescription}
                />
                <Button 
                    title="Salvar"  
                    bg="green.700"
                    _pressed={{ bg: "green.500" }}
                    isLoading={isLoading}
                    onPress={handleNewOrderRegister}
                    mb={4}
                />
            </ScrollView>
        </VStack>
    )
}

export default Register;