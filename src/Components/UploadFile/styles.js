import styled from 'styled-components/native';
export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;
export const Picture = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 300;
  width: 100%;
`;
