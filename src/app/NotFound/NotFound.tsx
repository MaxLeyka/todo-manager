import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { MainContainer, EmptyStateContainer } from 'src/styles/StyledComponents';

const NotFound: React.FC = () => {
  return (
    <MainContainer>
      <EmptyStateContainer elevation={0}>
        <Typography variant="h1" component="h1" id="not-found-heading" gutterBottom>
          404 - Страница не найдена
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Запрашиваемая страница не существует.
        </Typography>
        <Button component={Link} to="/" variant="contained" size="large">
          Перейти на главную
        </Button>
      </EmptyStateContainer>
    </MainContainer>
  );
};

export default NotFound;
