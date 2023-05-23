import { Box, Button, Center, FormControl, Heading, Modal, Input, Link, VStack } from 'native-base';
import { BackHandler } from 'react-native';
import React, { useState } from 'react';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import Icon from 'react-native-vector-icons/FontAwesome';

Amplify.configure(awsconfig);

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showVerificationModal, setShowVerificationModal] = useState(false);

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
            setShowVerificationModal(true);
            setUsername('')
            setPassword('')

        } catch (error) {
            console.log('Error signing in:', error);
        }
    };
    const handleSignOut = async () => {

        try {
            await Auth.signOut()
            BackHandler.exitApp()

        } catch (error) {
            console.log('Error SigningOut:', error);

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
                                    <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} />
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

            <Modal isOpen={showVerificationModal} onClose={() => setShowVerificationModal(false)}>
                <Modal.Content>
                    <Modal.Header>SignIn Successfull ! </Modal.Header>

                    <Modal.Footer>
                        <Button onPress={handleSignOut}>SignOut</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Center>
    );
};

export default Login;
