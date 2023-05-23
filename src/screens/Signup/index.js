import { Box, Button, Center, FormControl, Heading, Input, Modal, VStack } from 'native-base';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {

    const navigation = useNavigation()

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
    };

    const handleVerificationCodeChange = (text) => {
        setVerificationCode(text);
    };

    const handleTogglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            console.log('Error===', "Passwords don't match");
            return;
        }

        try {
            await Auth.signUp({
                username: username,
                password: password,
                attributes: {
                    email: email,
                },
            });
            console.log('Sign-up successful');
            console.log('Sign-up info ::  username=', username, ' password= ', password, ' email= ', email);

            setShowVerificationModal(true);

        } catch (error) {
            console.log('Error signing up:', error);
        }
    };

    const handleVerifyCode = async () => {
        
        console.log('verificationCode===',verificationCode);

        try {
            await Auth.confirmSignUp(username, verificationCode.trim());
            console.log('Verification successful');
            navigation.navigate('Sign In')
            setUsername('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')


        } catch (error) {
            console.log('Error verifying code:', error);

        }

    };

    const resendCode = async () => {

        try {
            await Auth.resendSignUp(email);
            console.log('New verification code has been sent to ', email);

        } catch (resendError) {
            console.log('Error resending verification code:', resendError);
        }
    }



    return (
        <Center w="100%" flex={1}>
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading size="lg" color="coolGray.800" _dark={{ color: 'warmGray.50' }} fontWeight="semibold">
                    Welcome
                </Heading>
                <VStack space={3} mt="5">

                    <FormControl>
                        <FormControl.Label>Username</FormControl.Label>
                        <Input
                            type="text"
                            placeholder="Enter Your Username"
                            onChangeText={handleUsernameChange}
                            value={username}
                        />
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input
                            type="text"
                            placeholder="Enter Your Email"
                            onChangeText={handleEmailChange}
                            value={email}
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
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Confirm Password</FormControl.Label>
                        <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            onChangeText={handleConfirmPasswordChange}
                            value={confirmPassword}
                            InputRightElement={
                                <Button variant="unstyled" onPress={toggleShowConfirmPassword}>
                                    <Icon
                                        name={showConfirmPassword ? 'eye-slash' : 'eye'}
                                        size={20}
                                    />
                                </Button>
                            }
                        />
                    </FormControl>

                    <Button mt="2" colorScheme="indigo" onPress={handleSignUp}>
                        Sign up
                    </Button>
                </VStack>
            </Box>

            <Modal isOpen={showVerificationModal} onClose={() => setShowVerificationModal(false)}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Enter Verification Code</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Verification Code</FormControl.Label>
                            <Input
                                type="text"
                                placeholder="Enter Verification Code"
                                onChangeText={handleVerificationCodeChange}
                                value={verificationCode}
                            />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button marginRight={2} onPress={handleVerifyCode}>Verify</Button>
                        <Button onPress={resendCode}>Resend Code</Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

        </Center>
    );
};

export default SignUp;
