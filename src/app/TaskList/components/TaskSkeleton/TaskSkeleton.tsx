import React from 'react';
import { Skeleton, Box } from '@mui/material';
import { SkeletonCard, SkeletonContent } from 'src/styles/StyledComponents';

const TaskSkeleton: React.FC = () => {
  return (
    <SkeletonCard>
      <SkeletonContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Skeleton variant="text" width="70%" height={32} />
          <Skeleton variant="text" width={40} height={24} />
        </Box>

        <Box flex={1}>
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="90%" height={20} />
        </Box>

        <Box display="flex" gap={1} justifyContent="flex-start">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </SkeletonContent>
    </SkeletonCard>
  );
};

export default TaskSkeleton;
