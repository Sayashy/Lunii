import { Container, Grid } from '@mui/material';

const MainLayout = ({ children }) => {
  return (
    <Container>
      <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
        {children}
      </Grid>
    </Container>
  );
};

export default MainLayout;
