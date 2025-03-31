import { Box, VStack, Text, Flex, Heading } from "@chakra-ui/react";

interface Project {
    id: number;
    title: string;
    createdAt: string;
    creatorId: number;
    accessCode: string;
};

interface ProjectsListProps {
    projects: Project[];
};

const ProjectsList = ({projects}: ProjectsListProps) => {
    return (
        <Flex flex={1} m={10}>
            <VStack align={"stretch"} flex={1}>
                <Heading alignSelf={"center"}>МОИ ПРОЕКТЫ</Heading>

                {projects.map((project) => (
                    <Box key={project.id} border={"1px solid"} p={5} borderRadius={"lg"} boxShadow={"md"}>
                        <Text fontSize={"xl"} fontWeight={"bold"}>
                            {project.title}
                        </Text>
                        <Text fontSize={"sm"} color={"gray.500"}>
                            Дата создания: {new Date(project.createdAt).toLocaleDateString("ru-RU")}
                        </Text>
                    </Box>
                ))}
            </VStack>
        </Flex>
    );
};

export default ProjectsList;