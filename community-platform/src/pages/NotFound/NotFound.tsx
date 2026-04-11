import type { FC } from 'react';
import { Link } from 'react-router';
import Main from 'src/pages/common/Layout/Main';
import { Flex, Image, Text } from 'theme-ui';
import errorImage from '../../assets/images/404error.png';

export const NotFoundPage: FC = () => (
  <Main>
    <Flex
      sx={{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
        fontFamily: "'Times New Roman', Times, serif"
      }}
    >
      <Image
        src={errorImage}
        sx={{
          maxWidth: '45em',
          width: '98%',
          marginBottom: '2vw',
        }}
      />
      <Text data-test="NotFound: Heading">
        404 - Page not fond.
        <br />
        Return to the <Link to="/">home page</Link>
      </Text>
    </Flex>
  </Main>
);
