import { Box, Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function NoItemsAvailable({ message = 'No items available' }) {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <SearchOffIcon
        sx={{
          fontSize: 60,
          color: 'text.secondary',
          mb: 2,
        }}
      />
      <Typography variant="h6" color="textSecondary" textAlign="center">
        {message}
      </Typography>
    </Box>
  );
}
