import { Box, VStack, Text, Flex, Heading, PaginationRoot, ButtonGroup, PaginationPrevTrigger, IconButton, PaginationNextTrigger, PaginationItem, PaginationContext, PaginationEllipsis } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip"
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { IoLogOutOutline } from "react-icons/io5";

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
    const pageSize = 5;
    const count = projects.length;

    const [page, setPage] = useState(1)

    const startRange = (page - 1) * pageSize
    const endRange = startRange + pageSize

    const visibleProjects = projects.slice(startRange, endRange)

    return (
        <Flex flex={1} m={10}>
            <VStack align={"stretch"} flex={1}>
                <Heading alignSelf={"center"} mb={3}>МОИ ПРОЕКТЫ</Heading>

                {visibleProjects.map((project) => (
                    <Box key={project.id} border={"1px solid"} p={5} borderRadius={"lg"} boxShadow={"md"}>
                        <Flex flex={1} flexDirection={"row"} justify={"space-between"} align={"center"}>
                            <VStack align={"start"}>
                                <Text fontSize={"xl"} fontWeight={"bold"}>
                                    {project.title}
                                </Text>
                                <Text fontSize={"sm"} color={"gray.500"}>
                                    Дата создания: {new Date(project.createdAt).toLocaleDateString("ru-RU")}
                                </Text>
                            </VStack>

                            <Tooltip content="Покинуть проект" showArrow positioning={{placement: "left"}} openDelay={10} contentProps={{ css: { "--tooltip-bg": "red" } }}>
                                <IconButton variant={"ghost"} color={"red"}>
                                    <IoLogOutOutline />
                                </IconButton>
                            </Tooltip>
                        </Flex>
                    </Box>
                ))}

                <PaginationRoot count={count} pageSize={pageSize} page={page} onPageChange={(e) => setPage(e.page)}>
                    <ButtonGroup variant={"outline"} size={"sm"}>
                        <PaginationPrevTrigger asChild>
                            <IconButton>
                                <HiChevronLeft />
                            </IconButton>
                        </PaginationPrevTrigger>

                        <PaginationContext>
                            {({ pages }) => pages.map((page, index) =>
                                page.type === "page" ? (
                                    <PaginationItem key={index} {...page}>
                                        <IconButton variant={{ base: "outline", _selected: "solid" }} zIndex={{ _selected: "1" }}>
                                            {page.value}
                                        </IconButton>
                                    </PaginationItem>
                                ) : (
                                    <PaginationEllipsis key={index} index={index}>
                                    </PaginationEllipsis>
                                ),
                            )}
                        </PaginationContext>

                        <PaginationNextTrigger asChild>
                            <IconButton>
                                <HiChevronRight />
                            </IconButton>
                        </PaginationNextTrigger>
                    </ButtonGroup>
                </PaginationRoot>
            </VStack>
        </Flex>
    );
};

export default ProjectsList;