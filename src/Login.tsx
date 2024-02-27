import { createStyles, Title, Text, Container, Flex, Button } from '@mantine/core';
import { ReactComponent as ZeroDevLogo } from './resources/assets/images/logo.svg';
import { ConnectButton } from '@rainbow-me/rainbowkit';
// import Passkey from './Passkey';
import  './global.css';


const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    backgroundImage: `url(/login-bg.jpg)`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    paddingTop: 40,
    paddingBottom: 30,
    minHeight: '100vh',

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  title: {
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 35,
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: '0rem',
    fontFamily: 'var(--base-font)',

    '@media (max-width: 520px)': {
      fontSize: 28,
    },
  },

  highlight: {
    color: theme.colors.pink[0],
  },

  introVideo: {
    mixBlendMode: 'screen'
  }
}));

export function Login() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container>
        <Flex justify={"center"} align="center" mih={'100%'} direction={'column'} gap={30}>
          <ZeroDevLogo width={300} height={'100%'} />
          <video className={classes.introVideo} muted autoPlay loop src="https://res.cloudinary.com/del9jfwf0/video/upload/v1709029824/snet/wmqtoz47guk9veyglbvg.mp4" width={350} height={350} />
          <Title className={classes.title}>
            Boilerplate Login Page with Web 2.5 & 3.0
          </Title>
          <div className="start-demo">
            <ConnectButton label={"Start Demo"} />
          </div>
          If you're signing up, we will create a new AA wallet for you.
        </Flex>
      </Container>
    </div>
  );
}