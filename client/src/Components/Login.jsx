import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from '~/redux/auth/action';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      username: "",
      userPassword: "",
    };
  }

  navigate = useNavigate();
  location = useLocation();
  dispatch = useDispatch();
  auth = useSelector((store) => store.auth.isLogin);

  handleUserEmail = (e) => {
    this.setState({ userEmail: e.target.value });
  }

  handleUserPassword = (e) => {
    this.setState({ userPassword: e.target.value });
  }

  handleUserName = (e) => {
    this.setState({ username: e.target.value });
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.dispatch(loginUser({ username: this.state.username, password: this.state.userPassword }));
  }

  componentDidMount() {
    if (this.props.auth) {
      this.props.navigate("/home", { replace: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location?.state?.pathname && this.props.auth) {
      this.props.navigate(this.props.location.state.pathname, { replace: true });
    }
  }

  render() {
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <form onSubmit={this.submitHandler}>
                <FormControl id="username" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input type="username" value={this.state.username} onChange={this.handleUserName} />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" value={this.state.userEmail} onChange={this.handleUserEmail} />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" value={this.state.userPassword} onChange={this.handleUserPassword} />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                
                  type="submit"
                  >
                Login
                </Button>
              </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }
}