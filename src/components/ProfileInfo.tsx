import { VStack, Flex, Heading, Stack, DataListRoot, DataListItem, DataListItemLabel, DataListItemValue } from "@chakra-ui/react";


interface ProfileInfoProps {
    name: string;
    surname: string;
    email: string
};

const ProfileInfo = ({name, surname, email}: ProfileInfoProps) => {

    console.log(name, surname, email)

    return (
        <Flex flex={1} m={10}>
            <VStack align={"stretch"} flex={1}>
                <Heading alignSelf={"center"} mb={3}>МОЙ ПРОФИЛЬ</Heading>

                <Stack gap={4}>
                    <DataListRoot size={"lg"} variant={"subtle"}>
                        <DataListItem>
                            <DataListItemLabel>Имя</DataListItemLabel>
                            <DataListItemValue>{name}</DataListItemValue>
                        </DataListItem>
                        <DataListItem>
                            <DataListItemLabel>Фамилия</DataListItemLabel>
                            <DataListItemValue>{surname}</DataListItemValue>
                        </DataListItem>
                        <DataListItem>
                            <DataListItemLabel>Электронная почта</DataListItemLabel>
                            <DataListItemValue>{email}</DataListItemValue>
                        </DataListItem>
                    </DataListRoot>
                </Stack>
            </VStack>
        </Flex>
    );
};

export default ProfileInfo;