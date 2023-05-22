import { Box, Button, Center, FormControl, Heading, Input, VStack } from 'native-base';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const OTP = ({ email }) => {
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');

    const handleVerificationCodeChange = (text) => {
        setVerificationCode(text);
    };

    const handleVerify = async () => {
        try {
            await Auth.confirmSignUp(email, verificationCode);
            console.log('Email verification successful');

        } catch (error) {
            console.log('Error verifying email:', error);
            setError(error.message || 'Error verifying email');
        }
    };

    return (
        <Center w="100%" flex={1}>
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading size="lg" color="coolGray.800" _dark={{ color: 'warmGray.50' }} fontWeight="semibold">
                    Verify Email
                </Heading>
                <VStack space={3} mt="5">
                    <FormControl>
                        <FormControl.Label>Verification Code</FormControl.Label>
                        <Input
                            type="text"
                            placeholder="Enter the verification code"
                            onChangeText={handleVerificationCodeChange}
                            value={verificationCode}
                        />
                    </FormControl>

                    {error ? <Text color="red.500">{error}</Text> : null}

                    <Button mt="2" colorScheme="indigo" onPress={handleVerify}>
                        Verify
                    </Button>
                </VStack>
            </Box>
        </Center>
    );
};

export default OTP;
