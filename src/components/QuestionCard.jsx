import React, { useState } from 'react';
import { Box, Card, Typography, CardContent, CardActionArea, Radio, RadioGroup, FormControlLabel, Fade } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';  // Added import for X icon
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const QuestionCard = ({ question, onAnswer, isAnswered }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleClick = () => {
    if (!isAnswered) {
      setShowAnswers(!showAnswers);
    }
  };

  const handleAnswerSubmit = (event) => {
    const answer = event.target.value;
    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    onAnswer(correct);
  };

  return (
    <Card 
      sx={{ 
        position: 'relative',
        minWidth: 275,
        maxWidth: 345,
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #5151FF 0%, #7A7AFF 100%)',
        color: 'white',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)'
        }
      }}
    >
      <CardActionArea 
        onClick={handleClick}
        sx={{
          height: '100%',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: '1.25rem',
              fontWeight: 600,
              mb: 1
            }}
          >
            Question {question.id}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '0.875rem',
              opacity: 0.9,
              mb: 2
            }}
          >
            {question.question}
          </Typography>
        </Box>

        {showAnswers && (
          <Box sx={{ width: '100%', mt: 'auto' }}>
            <RadioGroup 
              value={selectedAnswer} 
              onChange={handleAnswerSubmit}
              sx={{
                '.MuiFormControlLabel-root': {
                  color: 'white',
                  marginY: 0.5
                },
                '.MuiRadio-root': {
                  color: 'white'
                }
              }}
            >
              {question.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled={isAnswered}
                />
              ))}
            </RadioGroup>
          </Box>
        )}

        {!showAnswers && (
          <Box 
            sx={{ 
              mt: 'auto', 
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Typography sx={{ fontSize: '0.875rem' }}>
              Click to answer
            </Typography>
            <ArrowForwardIcon sx={{ fontSize: '1rem' }} />
          </Box>
        )}
      </CardActionArea>

      {/* Modified Overlay Logic - show for both correct and incorrect answers */}
      {isAnswered && (
        <Fade in={true}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: isCorrect ? '#44C367' : '#CC3300',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.95,
            }}
          >
            {isCorrect ? (
              <CheckCircleIcon sx={{ 
                color: 'white',
                fontSize: 60,
                p: 1,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.2)'
              }} />
            ) : (
              <CloseIcon sx={{ 
                color: 'white',
                fontSize: 60,
                p: 1,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.2)'
              }} />
            )}
          </Box>
        </Fade>
      )}
    </Card>
  );
};

export default QuestionCard;
