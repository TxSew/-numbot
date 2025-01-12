import { Box } from '@mui/material';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" width="calc(100vw)" overflow="hidden">
      <Box position="fixed" top={0} left={0} right={0} zIndex={1000}>
        <div />
      </Box>

      <Box flex={1} mt="64px" overflow="auto"> {children}</Box>
      <Box component="footer" />
    </Box>
  );
}
