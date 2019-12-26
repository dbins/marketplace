import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Title = styled.Text`
	font-size: 14px;
    font-weight: bold;
    color: #000000
`;
	
export const Row = styled.TouchableOpacity`
	flex-direction: row;
    justify-content: space-between;
    height: 56px;
    padding-left: 25px;
    padding-right: 18px;
    align-items: center;
    background-color: #CCCCCC
`;
	
export const ParentHR = styled.View`	
    height: 1px;
    color: #FFFFFF;
    width: 100%
`;

export const Child = styled.View`	
    background-color: #EEEEEE;
    padding: 16px
`;
