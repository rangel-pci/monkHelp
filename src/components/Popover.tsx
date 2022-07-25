
import { IconButton, Popover as NBPopover, Text, useTheme } from 'native-base';
import { Octicons } from '@expo/vector-icons';

type Props = {
    text: string,
}

const Popover = ({ text }: Props) => {
    const { colors } = useTheme();

    return (
        <NBPopover trigger={triggerProps => {
            return <IconButton {...triggerProps}
                    icon={<Octicons name="unverified" color={colors.gray[300]} size={18} />}
                    >
                    </IconButton>;
            }}>
                <NBPopover.Content w="56" borderColor="gray.700" shadow={8}>
                    <NBPopover.Arrow bg="gray.500" borderColor="gray.500" zIndex={2} />
                    <NBPopover.CloseButton m={0} p={0} />
                    <NBPopover.Body bg="gray.500" borderColor="gray.500">
                        <Text color="white">
                            {text}
                        </Text>
                    </NBPopover.Body>
                </NBPopover.Content>
        </NBPopover>
    )
}

export default Popover;