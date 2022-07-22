import { Heading, HStack, IconButton, StyledProps, Text, useTheme } from "native-base";
import { Octicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

type Props = StyledProps & {
    title: string,
}

const Header = ({ title, ...rest }: Props) => {
    const { colors } = useTheme();

    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack();
    }

    return (
        <HStack
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.600"
            pb={6}
            pt={12}
            {...rest}
        >
            <IconButton icon={<Octicons name="chevron-left" color={colors.gray[200]} size={24} />} onPress={handleGoBack} />
            <Heading
                color="gray.100"
                textAlign="center"
                fontSize="lg"
                flex={1}
            >
                {title}
            </Heading>
        </HStack>
    )
}

export default Header;