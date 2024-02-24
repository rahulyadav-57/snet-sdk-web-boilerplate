import { useEffect, useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  MediaQuery,
  Burger,
  useMantineTheme,
  createStyles,
  Group,
  ScrollArea
} from '@mantine/core';
import { ReactComponent as SnetLogo } from './resources/assets/images/logo.svg';
import { useMediaQuery } from '@mantine/hooks';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link, useLocation } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { Login } from './Login';
import { ZeroDevWeb3Auth } from '@zerodev/web3auth';
import { useBalance } from 'wagmi';
import './global.css';

const useStyles = createStyles((theme, _params) => {
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`
    },
    navbar: {
      backgroundColor: '#7F1BA4'
    },

    link: {
      fontFamily: 'alias',
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      color: '#fff',
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      marginBottom: `${theme.spacing.xs}px`,
      borderRadius: theme.radius.md,
      fontWeight: 500,
      border: '1px solid black',

      '&:hover': {
        backgroundColor: theme.white,
        color: '#7F1BA4'
      }
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.black,
        color: '#fff'
      }
    }
  };
});

export interface DashboardProps {
  children: React.ReactNode;
  links: { path: string; label: string }[];
}

export function Dashboard({ children, links }: DashboardProps) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`);
  const mdMatches = useMediaQuery(`(min-width: ${theme.breakpoints.lg}px)`);
  const [opened, setOpened] = useState(false);
  const { pathname } = useLocation();
  const { isConnected } = useAccount();

  // Fetching wallet balances
  const { address } = useAccount();
  const AGIXTokenAddress = '0x5B7533812759B45C2B44C19e320ba2cD2681b542'; // Replace with AGIX token address
  const { data: ethBalance } = useBalance({
    address: address,
    watch: true
  });

  const { data: agixBalance } = useBalance({
    address: address,
    token: AGIXTokenAddress,
    watch: true
  });

  // Format ETH balance to 4 decimal places
  const formattedEthBalance = ethBalance
    ? parseFloat(ethBalance.formatted).toFixed(4)
    : 'Loading...';

  useEffect(() => {
    if (isConnected) {
      const zeroDevWeb3Auth = new ZeroDevWeb3Auth([
        process.env.REACT_APP_ZERODEV_PROJECT_ID ||
          '46278c0a-5be6-42d6-974d-5863fc4cd132'
      ]);
      //   zeroDevWeb3Auth.getUserInfo().then(console.log);
    }
  }, [isConnected]);

  if (!isConnected) {
    return <Login />;
  }
  return (
    <AppShell
      styles={{
        main: {
          background: theme.black
        }
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      navbar={
        <Navbar
          p='md'
          hiddenBreakpoint='sm'
          hidden={!opened}
          width={{ sm: 120, lg: 220 }}
          className={classes.navbar}
        >
          <Navbar.Section grow mt='md' component={ScrollArea}>
            {matches ? (
              <MediaQuery
                largerThan={'sm'}
                styles={{ paddingLeft: 20, paddingRight: 20 }}
              >
                <Group className={classes.header} position='apart'>
                  <SnetLogo width={'100%'} />
                </Group>
              </MediaQuery>
            ) : null}
            {links.map((item) => (
              <Link
                className={cx(classes.link, {
                  [classes.linkActive]: item.path === pathname
                })}
                to={item.path}
                key={item.label}
                onClick={() => {
                  setOpened(false);
                }}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </Navbar.Section>
          <Navbar.Section>
            <h4>
              <b>ETH Balance:</b> {formattedEthBalance} ETH
            </h4>
            <h4>
              <b>AGIX Balance:</b> {agixBalance?.formatted ?? 'Loading...'} AGIX
            </h4>
          </Navbar.Section>
          {mdMatches && (
            <Navbar.Section className={classes.footer}>
              <div className='ConnectedButtonClass'>
                <ConnectButton />
              </div>
            </Navbar.Section>
          )}
        </Navbar>
      }
      header={
        matches ? undefined : (
          <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
            <Header height={{ base: 50, md: 70 }} p='md'>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  height: '100%'
                }}
              >
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size='sm'
                  color={theme.colors.gray[6]}
                  mr='sm'
                />

                <SnetLogo height={30} width={116} />
              </div>
            </Header>
          </MediaQuery>
        )
      }
    >
      {children}
    </AppShell>
  );
}