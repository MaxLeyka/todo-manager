import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { EmptyStateContainer } from 'src/styles/StyledComponents';

const TaskEmpty: React.FC = () => {
  return (
    <EmptyStateContainer elevation={0}>
      <Typography variant="h2" component="h2" id="empty-heading" gutterBottom>
        Задачи не найдены
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Попробуйте изменить фильтры или создать новую задачу.
      </Typography>
      <Button component={Link} to="/add" variant="contained" size="large">
        Создать первую задачу
      </Button>
    </EmptyStateContainer>
  );
};

export default TaskEmpty;
