import { Heading, Icon, VStack, useTheme, ScrollView, Box, Pressable, Text } from 'native-base';
import Logo from '../assets/monkLogo.svg';
import Input from '../components/Input';
import Button from '../components/Button';
import { Octicons } from '@expo/vector-icons';
import useSignUp from '../hooks/screens/useSignUp';
import Header from '../components/Header';

const SignUp = () => {
    const { colors } = useTheme();
    const { 
        email,
        setEmail,
        password,
        setPassword,
        handleNewSignUp,
        isLoading,
        passwordConfirm,
        setPasswordConfirm
    } = useSignUp();

    return (
        <ScrollView bg="gray.600" showsVerticalScrollIndicator={false}>
            <VStack flex={1} alignItems="center" px={8}>
                <Header title="" />

                <Logo />

                <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                    Novo cadastro
                </Heading>

                <Input
                    placeholder="E-mail"
                    mb={4}
                    InputLeftElement={<Icon as={<Octicons name="mail" color={colors.gray[300]} />} ml={4} />}
                    value={email}
                    onChangeText={setEmail}

                />
                <Input
                    placeholder="Senha"
                    mb={4}
                    InputLeftElement={<Icon as={<Octicons name="key" color={colors.gray[300]} />} ml={4} />}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Input
                    placeholder="Confirme sua senha"
                    mb={8}
                    InputLeftElement={<Icon as={<Octicons name="key" color={colors.gray[300]} />} ml={4} />}
                    secureTextEntry
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                />

                <Button 
                    title="Cadastrar"  
                    onPress={handleNewSignUp}
                    isLoading={isLoading}
                />
            </VStack>
        </ScrollView>
    )
}

export default SignUp;