import { View, Heading, Text, Flex, Button, Loader } from '@aws-amplify/ui-react';
import { useEffect, useState } from "react";
import { MathJax } from "better-react-mathjax";
import axios from 'axios';

function Profile() {
    const [saves, setSaves] = useState<{ num: number, content: string | undefined }[]>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getResults();
    }, []);

    async function getResults() {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/shares');
            setSaves(response.data);
        } catch (err) {
            console.error('Error fetching saves:', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View className="main" margin={'auto'} padding={'20px'} >
            <View>
                <Flex justifyContent={'space-between'}>
                    <Heading level={6}> Hello!</Heading>
                </Flex>

                {!loading ?
                    <View margin='40px 20px'>
                        {saves?.length ? 
                            <View> 
                                <Heading level={4}>My saved expressions</Heading>
                                {saves.map((save, i) => (
                                    <View key={i} marginTop='20px'> 
                                        <Text>Value: {save.num} </Text>
                                        <Flex 
                                            className="output" 
                                            height={'90px'} 
                                            border={'1px solid aliceblue'} 
                                            justifyContent={'center'} 
                                            alignItems={'center'}
                                        >
                                            <MathJax>{`\\(${save.content}\\)`}</MathJax>
                                        </Flex>
                                    </View>
                                ))} 
                            </View> 
                            : <Text> Nothing saved yet.</Text>
                        }
                    </View> 
                    : <Flex width='100%' justifyContent={'center'} padding='50px 0'> 
                        <Text> Loading...</Text>
                        <Loader size='large' />
                    </Flex>
                }
            </View>
        </View>
    );
}

export default Profile;