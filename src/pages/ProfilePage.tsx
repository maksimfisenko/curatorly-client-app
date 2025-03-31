import Header from "@/components/Header";
import ProfileInfo from "@/components/ProfileInfo";
import { Toaster } from "@/components/ui/toaster";
import { useGetCurrentUser } from "@/usecases/useGetCurrentUser";
import { Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router";

const ProfilePage = () => {
    const { data: userData } = useGetCurrentUser();

    if (userData?.user.email === "") {
        return (
            <Flex w="100%" h="100vh" align="center" justify="center">
                <Heading>Чтобы просмотреть содержимое данной страницы, необходимо <Link to={"/login"}>войти в аккаунт</Link></Heading>
            </Flex>
        );
    }

    return (
        <Flex w={"100%"} flexDirection={"column"}>
            <Header userName={userData?.user.name ?? ""} userSurname={userData?.user.surname ?? " "} />
            <ProfileInfo name={userData?.user.name ?? ""} surname={userData?.user.surname ?? ""} email={userData?.user.email ?? ""} />
            <Toaster />
        </Flex>
    );
};

export default ProfilePage;