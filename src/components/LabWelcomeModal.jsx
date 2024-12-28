import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';

const LabWelcomeModal = ({ open, onClose }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 2
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
          Welcome to the Chemistry Lab! 🧪
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <Typography paragraph>
            Here you can explore the fascinating world of chemistry through:
          </Typography>
          <ul>
            <li>
              <Typography>Interactive Periodic Table</Typography>
            </li>
            <li>
              <Typography>Chemical Reaction Simulations</Typography>
            </li>
            <li>
              <Typography>Quiz Questions of varying difficulty</Typography>
            </li>
          </ul>
          <Typography paragraph sx={{ mt: 2 }}>
            Click on elements in the periodic table to learn more about them and experiment with chemical reactions!
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          variant="contained"
          sx={{
            borderRadius: '9999px',
            bgcolor: '#5151FF',
            '&:hover': {
              bgcolor: '#4040CC'
            }
          }}
        >
          Get Started
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LabWelcomeModal;
