import { AvatarFallback, AvatarRoot, Box, Button, Flex, Heading, HStack, MenuContent, MenuItem, MenuPositioner, MenuRoot, MenuTrigger, Portal } from "@chakra-ui/react";
import ThemeToggle from "./ThemeToggle";
import { Link, useNavigate } from "react-router";


interface HeaderProps {
    userName: string;
    userSurname: string;
};

const Header = ({userName, userSurname}: HeaderProps) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return (
        <Box borderBottom={"1px solid"}>
            <Flex justify={"space-between"} align={"center"} my={1} mx={3}>
                <Heading fontWeight={"bold"}><Link to="/projects">CuratorLy</Link></Heading>
                <HStack>
                    <MenuRoot>
                        <MenuTrigger asChild>
                            <Button variant={"ghost"}>
                                <AvatarRoot size={"sm"}>
                                    <AvatarFallback name={userName + " " + userSurname} />
                                </AvatarRoot>
                                {userName + " " + userSurname}
                            </Button>
                        </MenuTrigger>
                        <Portal>
                            <MenuPositioner>
                                <MenuContent>
                                    <MenuItem value="profile"><Link to="/profile">Мой профиль</Link></MenuItem>
                                    <MenuItem value="logout" color="fg.error" _hover={{ bg: "bg.error", color: "fg.error" }} onClick={handleLogout}>Выйти</MenuItem>
                                </MenuContent>
                            </MenuPositioner>
                        </Portal>
                    </MenuRoot>
                    <ThemeToggle />
                </HStack>
            </Flex>
        </Box>
    );
};

export default Header;