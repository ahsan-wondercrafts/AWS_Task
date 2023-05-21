import { Box, Button, Center, FormControl, Heading, HStack, Input, Link, Stack, Text, VStack, WarningOutlineIcon } from 'native-base';
import React, { useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import Icon from 'react-native-vector-icons/FontAwesome';

Amplify.configure(awsconfig);

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };
    const handleTogglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSignIn = async () => {
        try {
            await Auth.signIn(username, password);
            console.log('Successfully signed in');
            // Navigate to the next screen or perform any additional actions
        } catch (error) {
            console.log('Error signing in:', error);
        }
    };

    return (
        <Center w="100%" flex={1} safeArea>
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
                    Welcome
                </Heading>
                <Heading mt="1" _dark={{ color: "warmGray.200" }} color="coolGray.600" fontWeight="medium" size="xs">
                    Sign in to continue!
                </Heading>

                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Username or Email</FormControl.Label>
                        <Input
                            type="text"
                            placeholder="Enter Your Username or Email"
                            onChangeText={handleUsernameChange}
                            value={username}
                        />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Enter Your Password"
                            onChangeText={handlePasswordChange}
                            value={password}
                            InputRightElement={
                                <Button variant="unstyled" onPress={handleTogglePasswordVisibility}>
                                    <Icon
                                        name={passwordVisible ? 'eye-slash' : 'eye'}
                                        size={20}
                                    />
                                </Button>
                            }
                        />
                        <Link _text={{ fontSize: "xs", fontWeight: "500", color: "indigo.500" }} alignSelf="flex-end" mt="1">
                            Forget Password?
                        </Link>
                    </FormControl>

                    <Button mt="2" colorScheme="indigo" onPress={handleSignIn}>
                        Sign in
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
}

export default Login;
