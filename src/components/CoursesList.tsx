import { Box, VStack, Text, Flex, Heading, PaginationRoot, ButtonGroup, PaginationPrevTrigger, IconButton, PaginationNextTrigger, PaginationItem, PaginationContext, PaginationEllipsis } from "@chakra-ui/react";
import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"

interface Course {
    id: number;
    title: string;
    academicYear: string;
}

interface CoursesListProps {
    courses: Course[];
};

const CoursesList = ({courses}: CoursesListProps) => {
    const pageSize = 5;
    const count = courses.length;

    const [page, setPage] = useState(1)

    const startRange = (page - 1) * pageSize
    const endRange = startRange + pageSize

    const visibleCourses = courses.slice(startRange, endRange)

    if (count == 0) {
        return (
            <Flex flex={1} m={10}>
            <VStack align={"stretch"} flex={1}>
                <Heading alignSelf={"center"} mb={3}>КУРСЫ</Heading>
                <Text alignSelf={"center"}>На данный момент в проекте нет ни одного курса</Text>
            </VStack>
        </Flex>
        );
    }

    return (
        <Flex flex={1} m={10}>
            <VStack align={"stretch"} flex={1}>
                <Heading alignSelf={"center"} mb={3}>КУРСЫ</Heading>

                {visibleCourses.map((course) => (
                    <Box key={course.id} border={"1px solid"} p={5} borderRadius={"lg"} boxShadow={"md"}>
                        <Flex flex={1} flexDirection={"row"} justify={"space-between"} align={"center"}>
                            <VStack align={"start"}>
                                <Text fontSize={"xl"} fontWeight={"bold"}>
                                    {course.title}
                                </Text>
                                <Text fontSize={"sm"} color={"gray.500"}>
                                    Учебный год: {course.academicYear}
                                </Text>
                            </VStack>
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

export default CoursesList;