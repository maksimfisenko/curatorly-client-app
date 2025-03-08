import { Center, DataListItem, DataListItemLabel, DataListItemValue, DataListRoot, Flex } from "@chakra-ui/react";


interface HealthcheckInfoProps {
    status: string;
    environment: string;
    version: string;
};

const HealthcheckInfo = ({status, environment, version}: HealthcheckInfoProps) => {
    return (
        <Flex flex={1} align={"center"} justify={"center"}>
            <Center border={"1px solid"} borderRadius={"md"} p={6} width={"25vw"}>
                <DataListRoot orientation={"horizontal"} divideY={"1px"} maxW={"md"} size={"lg"}>
                    <DataListItem>
                        <DataListItemLabel>Статус</DataListItemLabel>
                        <DataListItemValue>{status}</DataListItemValue>
                    </DataListItem>
                    <DataListItem>
                        <DataListItemLabel>Среда</DataListItemLabel>
                        <DataListItemValue>{environment}</DataListItemValue>
                    </DataListItem>
                    <DataListItem>
                        <DataListItemLabel>Версия</DataListItemLabel>
                        <DataListItemValue>{version}</DataListItemValue>
                    </DataListItem>
                </DataListRoot>
            </Center>
        </Flex>
    );
};

export default HealthcheckInfo;