import { Flex } from '@chakra-ui/react';
import './App.css'
import { Link } from 'react-router';

function App() {
	return (
		<Flex flexDirection={"column"} flex={1} align={"center"} justify={"center"}>
			<Link to="/login">
				Форма логина
			</Link>
			<Link to="/register">
				Форма регистрации
			</Link>
		</Flex>
	);
};

export default App;
