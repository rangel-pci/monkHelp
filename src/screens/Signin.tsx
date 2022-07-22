import { Heading, Icon, VStack, useTheme, ScrollView, Pressable, Text, Box } from 'native-base';
import Logo from '../assets/monkLogo.svg';
import Input from '../components/Input';
import Button from '../components/Button';
import { Octicons } from '@expo/vector-icons';
import useSignIn from '../hooks/screens/useSignIn';
import { useNavigation } from '@react-navigation/native';

const SignIn = () => {
    const { colors } = useTheme();
    const { 
        email,
        setEmail,
        password,
        setPassword,
        handleSignIn,
        isLoading,
    } = useSignIn();

    const navigation = useNavigation();
    const handleSignUp = () => {
        navigation.navigate('signup');
    }

    return (
        <Box bg="gray.600" flex={1}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <VStack flex={1} alignItems="center" px={8} pt={24}>
                    <Logo />

                    <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                        Acesse sua conta
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
                        mb={8}
                        InputLeftElement={<Icon as={<Octicons name="key" color={colors.gray[300]} />} ml={4} />}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Button 
                        title="Entrar"  
                        onPress={handleSignIn}
                        isLoading={isLoading}
                    />

                    <Pressable
                        onPress={handleSignUp}
                        mt={4}
                        borderBottomWidth={1}
                        borderBottomColor="green.700"
                    >
                        <Heading fontSize="sm" color="green.700">
                            Cadastrar-se
                        </Heading>
                    </Pressable>
                </VStack>
            </ScrollView>
        </Box>
    )
}

export default SignIn;