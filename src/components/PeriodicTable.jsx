import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Popper, Card, CardContent } from '@mui/material';
import { PeriodicTableJSON } from './PeriodicTableJSON';  // Import the data directly

// Element colors based on categories
const categoryColors = {
  'alkali metal': '#ff8a80',
  'alkaline earth metal': '#ff80ab',
  'transition metal': '#82b1ff',
  'post-transition metal': '#80d8ff',
  'metalloid': '#84ffff',
  'diatomic nonmetal': '#b9f6ca',
  'polyatomic nonmetal': '#ccff90',
  'noble gas': '#ea80fc',
  'lanthanide': '#b388ff',
  'actinide': '#8c9eff',
  'unknown': '#CFD8DC'
};

// Update the knownReactions object
const knownReactions = {
  'H,O': 'H2O (Water)',
  'Na,Cl': 'NaCl (Table Salt)',
  'C,O2': 'CO2 (Carbon Dioxide)',
  'H,Cl': 'HCl (Hydrochloric Acid)',
  'Fe,O2': 'Fe2O3 (Iron Oxide/Rust)',
  // Add more combinations as needed
};

const ElementKey = () => (
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: 2,
      mb: 4,
      p: 2,
      bgcolor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 1,
      boxShadow: 1,
    }}
  >
    {Object.entries(categoryColors).map(([category, color]) => (
      <Box
        key={category}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            bgcolor: color,
            borderRadius: 0.5,
            border: '1px solid rgba(0,0,0,0.1)',
          }}
        />
        <Typography
          variant="body2"
          sx={{
            textTransform: 'capitalize',
            color: 'text.secondary',
            fontSize: '0.875rem',
          }}
        >
          {category}
        </Typography>
      </Box>
    ))}
  </Box>
);

const ElementDetails = ({ element, anchorEl, open }) => (
  <Popper open={open} anchorEl={anchorEl} placement="right" style={{ zIndex: 1500 }}>
    <Card sx={{ minWidth: 250, bgcolor: 'background.paper', boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">{element.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Atomic Number: {element.number}<br />
          Atomic Mass: {element.atomic_mass}<br />
          Category: {element.category}<br />
          {element.electron_configuration && <>
            Electron Configuration: {element.electron_configuration}<br />
          </>}
          {element.electronegativity_pauling && <>
            Electronegativity: {element.electronegativity_pauling}<br />
          </>}
          {element.summary && <><br />{element.summary}</>}
        </Typography>
      </CardContent>
    </Card>
  </Popper>
);

const Element = ({ element, handleElementClick, selectedElements }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isSelected = selectedElements.some(el => el.symbol === element.symbol);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Paper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleElementClick(element)}
        sx={{
          width: '70px',  // Increased from 64px
          height: '70px', // Increased from 64px
          position: 'absolute',
          left: `${(element.xpos - 1) * 75}px`,  // Increased from 66px
          top: `${(element.ypos - 1) * 75 + (element.ypos > 7 ? 75 : 0)}px`,  // Increased from 66px
          padding: '8px',  // Added padding
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: categoryColors[element.category] || categoryColors.unknown,
          '&:hover': {
            transform: 'scale(1.1)',
            zIndex: 1,
            boxShadow: 3
          },
          transition: 'transform 0.2s',
          cursor: 'pointer',
          border: isSelected ? '2px solid #4743EF' : 'none',
          transform: isSelected ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
          {element.number}
        </Typography>
        <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
          {element.symbol}
        </Typography>
        <Typography variant="caption" sx={{ fontSize: '0.6rem', textAlign: 'center' }}>
          {element.name}
        </Typography>
      </Paper>
      <ElementDetails 
        element={element} 
        anchorEl={anchorEl} 
        open={Boolean(anchorEl)}
      />
    </>
  );
};

const ReactionDisplay = ({ selectedElements, reaction }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      mt: 4,
      p: 2,
      bgcolor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: 1,
      boxShadow: 1,
    }}
  >
    <Typography variant="h6">Selected Elements</Typography>
    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      {selectedElements.map((element) => (
        <Paper
          key={element.symbol}
          sx={{
            width: '70px',
            height: '70px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: categoryColors[element.category] || categoryColors.unknown,
            padding: '8px',
          }}
        >
          <Typography variant="caption" sx={{ fontSize: '0.6rem' }}>
            {element.number}
          </Typography>
          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            {element.symbol}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '0.6rem', textAlign: 'center' }}>
            {element.name}
          </Typography>
        </Paper>
      ))}
    </Box>
    {reaction && (
      <Typography variant="h6" sx={{ mt: 2 }}>
        Reaction: {reaction}
      </Typography>
    )}
  </Box>
);

const PeriodicTable = () => {
  const [selectedElements, setSelectedElements] = useState([]);
  const [reaction, setReaction] = useState(null);
  const [reactionMessage, setReactionMessage] = useState(null);

  const handleElementClick = (element) => {
    setSelectedElements((prevSelected) => {
      const newSelected = prevSelected.some((el) => el.symbol === element.symbol)
        ? prevSelected.filter((el) => el.symbol !== element.symbol)
        : [...prevSelected, element];

      // Update reaction if we have exactly 2 elements
      if (newSelected.length === 2) {
        const symbols = newSelected.map((el) => el.symbol).sort().join(',');
        setReaction(knownReactions[symbols] || 'No known reaction');
      } else {
        setReaction(null);
      }

      return newSelected;
    });
  };

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          width: '1400px',
          height: '900px',
          margin: '0 auto',
          padding: '20px'
        }}
      >
        {PeriodicTableJSON.elements.map((element) => (
          <Element 
            key={element.number} 
            element={element} 
            handleElementClick={handleElementClick}
            selectedElements={selectedElements}
          />
        ))}
        
        <Typography
          sx={{
            position: 'absolute',
            left: '90px',
            top: '635px',
            fontSize: '0.8rem'
          }}
        >
          Actinides
        </Typography>
      </Box>
      <ReactionDisplay 
        selectedElements={selectedElements}
        reaction={reaction}
      />
      <ElementKey />
    </Box>
  );
};

export default PeriodicTable;
