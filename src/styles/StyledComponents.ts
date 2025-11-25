import { styled } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  IconButton,
  FormControlLabel,
  FormGroup,
  Alert,
  Container,
  Paper,
  Typography,
} from '@mui/material';

export const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

export const PageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

export const StyledCard = styled(Card)(() => ({
  height: '100%',
  minHeight: 200,
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}));

export const TaskCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  padding: theme.spacing(2),
  height: '100%',
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));

export const TaskGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: theme.spacing(3),
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
  },
}));

export const FormContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiFormLabel-asterisk': {
    color: theme.palette.error.main,
  },
}));

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'flex-end',
  marginTop: theme.spacing(4),
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const PrimaryButton = styled(Button)(({ theme }) => ({
  minWidth: 140,
  padding: theme.spacing(1, 3),
}));

export const SecondaryButton = styled(Button)(({ theme }) => ({
  minWidth: 140,
  padding: theme.spacing(1, 3),
}));

export const FilterSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
}));

export const FilterRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: theme.spacing(3),
  alignItems: 'end',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const TaskActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
  marginTop: 'auto',
  paddingTop: theme.spacing(1),
}));

export const ActionIconButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  border: '1px solid',
  borderColor: theme.palette.grey[300],
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.grey[100],
  },
  '&.Mui-disabled': {
    opacity: 0.5,
    backgroundColor: theme.palette.grey[100],
  },
}));

export const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  gap: theme.spacing(1),
}));

export const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  marginLeft: 0,
  marginRight: 0,
  '& .MuiCheckbox-root': {
    padding: theme.spacing(1),
  },
}));

export const ErrorAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

export const SkeletonCard = styled(Card)(({ theme }) => ({
  height: 200,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
}));

export const SkeletonContent = styled(CardContent)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  '& > div:first-of-type': {
    marginBottom: theme.spacing(2),
  },
  '& > div:nth-of-type(2)': {
    marginBottom: theme.spacing(3),
    flex: 1,
    '& .MuiSkeleton-text': {
      marginBottom: theme.spacing(1),
    },
  },
}));

export const EmptyStateContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.grey[50],
}));

export const TaskHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export const TaskChipsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  flexWrap: 'wrap',
  marginBottom: theme.spacing(2),
}));

export const TaskTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isCompleted',
})<{ isCompleted: boolean }>(({ isCompleted }) => ({
  textDecoration: isCompleted ? 'line-through' : 'none',
  opacity: isCompleted ? 0.7 : 1,
  flex: 1,
  wordBreak: 'break-word',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  lineHeight: 1.3,
  maxHeight: '2.6em',
  cursor: 'pointer',
}));

export const TaskDescription = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isCompleted',
})<{ isCompleted: boolean }>(({ theme, isCompleted }) => ({
  opacity: isCompleted ? 0.7 : 1,
  flex: 1,
  wordBreak: 'break-word',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  lineHeight: 1.4,
  maxHeight: '4.2em',
  marginBottom: theme.spacing(2),
  cursor: 'pointer',
}));

export const RetryButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const HiddenHeading = styled(Typography)(() => ({
  display: 'none',
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));
