import { Octicons } from '@expo/vector-icons';
import { Box, HStack, Text, useTheme, VStack } from 'native-base';
import { ReactNode } from 'react';

type Props = {
    title: string,
    description?: string,
    footer?: string,
    icon: React.ComponentProps<typeof Octicons>['name'],
    children?: ReactNode
}

const CardDetails = ({
    title,
    description,
    footer = null,
    icon,
    children
}: Props) => {
    const { colors } = useTheme();

    return (
        <VStack bg="gray.600" p={5} mt={5} rounded="sm">
            <HStack alignItems="center" mb={4}>
                <Octicons name={icon} color={colors.primary[700]} size={15}  />
                <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase">
                    {title}
                </Text>
            </HStack>

            {!!description && 
                <Text color="gray.100" fontSize="md">{description}</Text>
            }

            {children}
        </VStack>
    )
}

export default CardDetails