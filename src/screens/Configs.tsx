import { Pressable, ScrollView, Box, HStack, IconButton, Text, Center, useTheme, VStack } from 'native-base';
import Header from '../components/Header';
import { Octicons } from '@expo/vector-icons';
import Input from '../components/Input';
import Popover from '../components/Popover';
import CardDetails from '../components/CardDetails';
import Button from "../components/Button";
import useConfigs from '../hooks/screens/useConfigs';
import Loading from '../components/Loading';

const Configs = () => {
    const { colors } = useTheme();
    const {
        isLoading,
        isSave1Loading,
        isSave2Loading,
        isSave3Loading,
        userConfig,
        linkedToOrganization,
        setLinkedToOrganization,
        handleLinkOrganization,
        handleOwnOrganization,
        ownOrganization,
        setOwnOrganization,
        organization,
        allowedUser,
        setAllowedUser,
        handleAllowedUser,
        handleRemoveAllowedUser
    } = useConfigs();

    return (
        <VStack flex={1} bg="gray.700">
            <Header p={8} title="Configuração" />

            {isLoading ? <Loading /> :
                <ScrollView>
                    <VStack pt={4}>
                        <CardDetails
                            title="Me vincular a uma organização"
                            icon='link'
                        >
                            <HStack alignItems="center">
                                <Popover
                                    text={"Você poderá visualizar, abrir e fechar chamados da organização.\n*O criador da organização precisa autorizar o seu acesso."} 
                                />
                                <Input
                                    placeholder="Nome exato da organização"
                                    flex={1}
                                    h={12}
                                    rounded={0}
                                    value={linkedToOrganization}
                                    onChangeText={setLinkedToOrganization}
                                />
                                
                                <Button
                                    title=""
                                    h={12}
                                    w={12} 
                                    borderLeftRadius={0}
                                    leftIcon={<Octicons name="sync" color={colors.gray[700]} size={24} />}    
                                    onPress={handleLinkOrganization}
                                    isLoading={isSave1Loading}
                                />
                            </HStack>
                        </CardDetails>

                        <CardDetails
                            title="Criar minha organização"
                            icon='organization'
                        >
                            <Box>
                                <HStack alignItems="center">
                                    <Popover
                                        text={"Usuários vinculados e autorizados poderão visualizar, abrir e fechar chamados da organização."} 
                                    />
                                    <Input
                                        placeholder="Nome da organização"
                                        flex={1}
                                        h={12}
                                        rounded={0}
                                        
                                        value={ownOrganization}
                                        onChangeText={setOwnOrganization}
                                    />
                                    
                                    <Button
                                        title=""
                                        h={12}
                                        w={12} 
                                        borderLeftRadius={0}
                                        leftIcon={<Octicons name="sync" color={colors.gray[700]} size={24} />}    
                                        onPress={handleOwnOrganization}
                                        isLoading={isSave2Loading}
                                    />
                                </HStack>
                                <VStack mt={2}>
                                    <HStack alignItems="center">
                                        <Popover
                                            text={"Informe o e-mail do usuário autorizado a gerênciar os chamados.\n*O usuário deve vincular-se a sua organização."} 
                                        />
                                        <Input
                                            placeholder="E-mail a ser autorizado"
                                            flex={1}
                                            h={12}
                                            rounded={0}
                                            value={allowedUser}
                                            onChangeText={setAllowedUser}
                                            isDisabled={!organization.allowedUsers}
                                        />
                                        
                                        <Button
                                            title=""
                                            h={12}
                                            w={12} 
                                            borderLeftRadius={0}
                                            leftIcon={<Octicons name="plus" color={colors.gray[700]} size={24} />}
                                            onPress={handleAllowedUser}
                                            isLoading={isSave3Loading}
                                        />
                                    </HStack>
                                </VStack>
                            </Box>
                        </CardDetails>
                    </VStack>            

                    <CardDetails
                        title="autorizados"
                        icon='code-of-conduct'
                        pb={4}
                    >
                        {organization.allowedUsers && organization.allowedUsers.length > 0 ?
                            <HStack mt={2} flexWrap="wrap" bg="gray.600">
                                {organization.allowedUsers.map((item, index) => {
                                return (
                                    <Pressable key={item} bg="gray.700" p={2} m={1} rounded="sm" _pressed={{ opacity: 0.5 }} onPress={() => handleRemoveAllowedUser(item)}>
                                        <HStack alignItems="center">
                                            <Octicons name="x-circle" color={colors.red[700]} size={18} />
                                            <Text color="white" fontSize="sm" ml={2}>{item}</Text>
                                        </HStack>
                                    </Pressable>
                                )})}
                            </HStack>
                        :
                            (
                                <Center>
                                    <Octicons name="inbox" color={colors.gray[400]} size={50} />
                                    <Text
                                        color="gray.300"
                                        fontSize="xl"
                                        mt={6}
                                        textAlign="center"
                                    >
                                        Você ainda não adicionou{'\n'}nenhum usuário
                                    </Text>
                                </Center>
                            )
                        }       
                    </CardDetails>
                </ScrollView>
            }
        </VStack>
    )
}

export default Configs;