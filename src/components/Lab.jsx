import React, { useState, useEffect, useRef } from 'react';
import PeriodicTable from './PeriodicTable';
import { Box, Typography, Container, Tabs, Tab, Paper, Button, Modal, Dialog, DialogTitle, DialogContent, List, ListItem, Chip } from '@mui/material';
import QuestionCard from './QuestionCard';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import LabWelcomeModal from './LabWelcomeModal';

const questions = {
  easy: [
    {
      id: 1,
      question: "What is the atomic number of Hydrogen?",
      options: ["1", "2", "3", "4"],
      correctAnswer: "1"
    },
    {
      id: 2,
      question: "Which element is represented by the symbol 'O'?",
      options: ["Osmium", "Oxygen", "Oganesson", "Orthenium"],
      correctAnswer: "Oxygen"
    },
    {
      id: 3,
      question: "What is the most abundant element in the Earth's crust?",
      options: ["Iron", "Silicon", "Oxygen", "Carbon"],
      correctAnswer: "Oxygen"
    },
    {
      id: 4,
      question: "What is the symbol for Gold?",
      options: ["Ag", "Au", "Fe", "Cu"],
      correctAnswer: "Au"
    },
    {
      id: 5,
      question: "Which group do Noble gases belong to?",
      options: ["Group 1", "Group 17", "Group 18", "Group 16"],
      correctAnswer: "Group 18"
    },
    {
      id: 6,
      question: "What is the atomic number of Carbon?",
      options: ["4", "5", "6", "7"],
      correctAnswer: "6"
    },
    {
      id: 7,
      question: "What's the most common state of matter for noble gases?",
      options: ["Solid", "Liquid", "Gas", "Plasma"],
      correctAnswer: "Gas"
    },
    {
      id: 8,
      question: "Which element is essential for life and is found in all organic compounds?",
      options: ["Nitrogen", "Carbon", "Oxygen", "Hydrogen"],
      correctAnswer: "Carbon"
    },
    {
      id: 9,
      question: "Which element is the main component of air?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Argon"],
      correctAnswer: "Nitrogen"
    },
    {
      id: 10,
      question: "What is the symbol for Silver?",
      options: ["Si", "Ag", "Au", "Sr"],
      correctAnswer: "Ag"
    },
    {
      id: 11,
      question: "What is the lightest element in the periodic table?",
      options: ["Helium", "Hydrogen", "Lithium", "Beryllium"],
      correctAnswer: "Hydrogen"
    },
    {
      id: 12,
      question: "Which element is essential for human bones?",
      options: ["Calcium", "Potassium", "Sodium", "Magnesium"],
      correctAnswer: "Calcium"
    },
    {
      id: 13,
      question: "What is the symbol for Iron?",
      options: ["Ir", "In", "Fe", "F"],
      correctAnswer: "Fe"
    },
    {
      id: 14,
      question: "Which element is liquid at room temperature?",
      options: ["Bromine", "Chlorine", "Iodine", "Fluorine"],
      correctAnswer: "Bromine"
    },
    {
      id: 15,
      question: "What is the most abundant metal in Earth's crust?",
      options: ["Iron", "Aluminum", "Copper", "Zinc"],
      correctAnswer: "Aluminum"
    }
  ],
  medium: [
    {
      id: 1,
      question: "What is the electron configuration of Carbon?",
      options: ["1s² 2s² 2p²", "1s² 2s² 2p³", "1s² 2s¹ 2p³", "1s² 2s² 2p⁴"],
      correctAnswer: "1s² 2s² 2p²"
    },
    {
      id: 2,
      question: "Which element has the highest electronegativity?",
      options: ["Oxygen", "Chlorine", "Nitrogen", "Fluorine"],
      correctAnswer: "Fluorine"
    },
    {
      id: 3,
      question: "What is the atomic mass of Sodium to the nearest whole number?",
      options: ["11", "23", "22", "24"],
      correctAnswer: "23"
    },
    {
      id: 4,
      question: "Which element is essential for nuclear power plants?",
      options: ["Thorium", "Uranium", "Plutonium", "All of these"],
      correctAnswer: "All of these"
    },
    {
      id: 5,
      question: "What is the most common isotope of Hydrogen?",
      options: ["Protium", "Deuterium", "Tritium", "None of these"],
      correctAnswer: "Protium"
    },
    {
      id: 6,
      question: "Which metal is liquid at room temperature?",
      options: ["Gallium", "Mercury", "Cesium", "Francium"],
      correctAnswer: "Mercury"
    },
    {
      id: 7,
      question: "What type of bond is formed between sodium and chlorine?",
      options: ["Covalent", "Ionic", "Metallic", "Hydrogen"],
      correctAnswer: "Ionic"
    },
    {
      id: 8,
      question: "Which orbital type has a spherical shape?",
      options: ["s", "p", "d", "f"],
      correctAnswer: "s"
    },
    {
      id: 9,
      question: "What is the valence electron count of Chlorine?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7"
    },
    {
      id: 10,
      question: "Which element is used in semiconductor devices?",
      options: [
        "Silicon", "Carbon", "Sulfur", "Phosphorus"
      ],
      correctAnswer: "Silicon"
    },
    {
      id: 11,
      question: "What is the atomic radius trend in a period?",
      options: [
        "Increases left to right",
        "Decreases left to right",
        "Remains constant",
        "No specific trend"
      ],
      correctAnswer: "Decreases left to right"
    },
    {
      id: 12,
      question: "Which type of bond has the highest bond energy?",
      options: ["Single", "Double", "Triple", "Ionic"],
      correctAnswer: "Triple"
    },
    {
      id: 13,
      question: "What is the hybridization of carbon in ethene (C2H4)?",
      options: ["sp³", "sp²", "sp", "sp³d"],
      correctAnswer: "sp²"
    },
    {
      id: 14,
      question: "Which element has the highest first ionization energy?",
      options: ["Helium", "Neon", "Argon", "Krypton"],
      correctAnswer: "Helium"
    },
    {
      id: 15,
      question: "What causes the lanthanide contraction?",
      options: [
        "Poor shielding of f-orbitals",
        "Nuclear charge increase",
        "Electron affinity",
        "Atomic radius"
      ],
      correctAnswer: "Poor shielding of f-orbitals"
    }
  ],
  hard: [
    {
      id: 1,
      question: "What is the ground state electron configuration of Fe²⁺?",
      options: [
        "[Ar] 3d⁶ 4s°",
        "[Ar] 3d⁶ 4s¹",
        "[Ar] 3d⁵ 4s¹",
        "[Ar] 3d⁴ 4s²"
      ],
      correctAnswer: "[Ar] 3d⁶ 4s°"
    },
    {
      id: 2,
      question: "Which lanthanide element shows the strongest paramagnetic behavior?",
      options: ["Gadolinium", "Europium", "Dysprosium", "Holmium"],
      correctAnswer: "Gadolinium"
    },
    {
      id: 3,
      question: "What is the hybridization of the central atom in XeF₄?",
      options: ["sp³d", "sp³d²", "sp³", "dsp³"],
      correctAnswer: "sp³d²"
    },
    {
      id: 4,
      question: "What is the electron configuration of Cr²⁺?",
      options: [
        "[Ar] 3d⁴ 4s°",
        "[Ar] 3d³ 4s¹",
        "[Ar] 3d⁵ 4s°",
        "[Ar] 3d⁴ 4s¹"
      ],
      correctAnswer: "[Ar] 3d⁴ 4s°"
    },
    {
      id: 5,
      question: "Which quantum number determines the shape of an orbital?",
      options: ["Principal (n)", "Angular momentum (l)", "Magnetic (m)", "Spin (s)"],
      correctAnswer: "Angular momentum (l)"
    },
    {
      id: 6,
      question: "What is the hybridization of PCl₅?",
      options: ["sp³", "sp³d", "sp³d²", "dsp³"],
      correctAnswer: "sp³d"
    },
    {
      id: 7,
      question: "Calculate the spin-only magnetic moment of Mn²⁺ in BM (Bohr Magneton)",
      options: ["2.83", "3.87", "4.90", "5.92"],
      correctAnswer: "5.92"
    },
    {
      id: 8,
      question: "Calculate the effective nuclear charge for the valence electron in sodium",
      options: ["1.00", "2.20", "3.70", "4.91"],
      correctAnswer: "2.20"
    },
    {
      id: 9,
      question: "What is the ground state term symbol for Cr²⁺?",
      options: ["⁵D₄", "⁴F₉/₂", "³D₃", "²S₁/₂"],
      correctAnswer: "⁵D₄"
    },
    {
      id: 10,
      question: "What is Hund's rule of maximum multiplicity?",
      options: [
        "Electrons fill orbitals of lowest energy first",
        "Electrons in the same subshell have parallel spins",
        "No two electrons can have all quantum numbers the same",
        "Electrons pair up before filling new orbitals"
      ],
      correctAnswer: "Electrons in the same subshell have parallel spins"
    },
    {
      id: 11,
      question: "Calculate the crystal field splitting energy for [Fe(H2O)6]²⁺",
      options: ["10,000 cm⁻¹", "12,000 cm⁻¹", "14,000 cm⁻¹", "16,000 cm⁻¹"],
      correctAnswer: "14,000 cm⁻¹"
    },
    {
      id: 12,
      question: "What is the term symbol for the ground state of atomic nitrogen?",
      options: ["⁴S₃/₂", "³P₀", "²D₅/₂", "⁴P₅/₂"],
      correctAnswer: "⁴S₃/₂"
    },
    {
      id: 13,
      question: "Determine the point group of SF6",
      options: ["Oh", "Td", "D6h", "C6v"],
      correctAnswer: "Oh"
    },
    {
      id: 14,
      question: "Calculate the spin-only magnetic moment of Co²⁺ in high spin",
      options: ["3.87 BM", "4.90 BM", "5.92 BM", "6.93 BM"],
      correctAnswer: "3.87 BM"
    },
    {
      id: 15,
      question: "What is the CFSE for d⁸ in tetrahedral field?",
      options: ["-0.6Δt", "-0.4Δt", "-0.2Δt", "0.0Δt"],
      correctAnswer: "-0.6Δt"
    }
  ]
};

const ResultsModal = ({ open, onClose, questions, answers, difficulty }) => {
  const questionsAttempted = Object.keys(answers).length;
  const correctAnswers = Object.values(answers).filter(a => a).length;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 2
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography variant="h5">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level Results
          </Typography>
          <Typography variant="h6" component="div">
            Score: <span style={{ color: '#5151FF' }}>{correctAnswers}</span>/{questionsAttempted}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <List sx={{ width: '100%' }}>
          {questions.map((question) => {
            const userAnswer = answers[question.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = answers[question.id] === true;

            return (
              <ListItem
                key={question.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  borderBottom: '1px solid #eee',
                  py: 2
                }}
              >
                <Box sx={{ width: '100%', mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                    {question.id}. {question.question}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {question.options.map((option) => (
                      <Chip
                        key={option}
                        label={option}
                        sx={{
                          backgroundColor: isAnswered ? (
                            option === question.correctAnswer
                              ? '#44C367'
                              : option === question.options[question.selectedAnswer]
                                ? '#CC3300'
                                : '#f0f0f0'
                          ) : '#f0f0f0',
                          color: isAnswered ? (
                            option === question.correctAnswer || 
                            option === question.options[question.selectedAnswer]
                              ? 'white'
                              : 'text.primary'
                          ) : 'text.primary',
                          '& .MuiChip-label': {
                            fontWeight: option === question.correctAnswer ? 600 : 400
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};

const Lab = ({ shouldScrollToQuestions }) => {
  const questionsRef = useRef(null);

  useEffect(() => {
    if (shouldScrollToQuestions && questionsRef.current) {
      questionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [shouldScrollToQuestions]);

  // Replace single score with separate scores for each difficulty
  const [scores, setScores] = useState({
    easy: 0,
    medium: 0,
    hard: 0
  });
  const [difficulty, setDifficulty] = useState('easy');
  // Replace single answeredQuestions with separate ones for each difficulty
  const [answeredQuestions, setAnsweredQuestions] = useState({
    easy: {},
    medium: {},
    hard: {}
  });
  const [showResults, setShowResults] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    const hasVisitedLab = localStorage.getItem('hasVisitedLab');
    if (!hasVisitedLab) {
      setShowWelcomeModal(true);
      localStorage.setItem('hasVisitedLab', 'true');
    }
  }, []);

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
  };

  useEffect(() => {
    const currentQuestions = questions[difficulty];
    const answeredCount = Object.keys(answeredQuestions[difficulty]).length;
    if (answeredCount === currentQuestions.length) {
      setShowResults(true);
    }
  }, [answeredQuestions, difficulty]);

  const handleDifficultyChange = (event, newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const handleAnswer = (questionId, isCorrect) => {
    setAnsweredQuestions(prev => ({
      ...prev,
      [difficulty]: {
        ...prev[difficulty],
        [questionId]: isCorrect
      }
    }));
    if (isCorrect) {
      setScores(prev => ({
        ...prev,
        [difficulty]: prev[difficulty] + 1
      }));
    }
  };

  const handleRetry = () => {
    setScores({
      easy: 0,
      medium: 0,
      hard: 0
    });
    setAnsweredQuestions({
      easy: {},
      medium: {},
      hard: {}
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 17, mb: 4 }}>
      <LabWelcomeModal 
        open={showWelcomeModal} 
        onClose={handleCloseWelcomeModal} 
      />
      {/* Periodic Table Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 700,
            color: '#2A3335',
            letterSpacing: '0.02em',
            marginBottom: '1rem'
          }}>
          Periodic Table
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Know more about the elements and how they react
        </Typography>
              </Box>

      {/* Periodic Table Component */}
      <Box sx={{ 
        bgcolor: 'background.paper', 
        borderRadius: 1, 
        p: 4,  // Increased padding from 3 to 4
        mt: 3,
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
          height: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#bdbdbd',
          borderRadius: '4px',
        }
      }}>
        <PeriodicTable />
      </Box>

      {/* Lab Questions Section */}
      <Box sx={{ mt: 6 }} ref={questionsRef} className="questions-section">
        {/* Header with Score */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography 
            variant="h5" 
            component="h2"
            sx={{ 
              fontWeight: 600,
              color: '#2A3335'
            }}
          >
            Lab Questions
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={handleRetry}
              sx={{
                borderRadius: '9999px',
                borderColor: '#5151FF',
                color: '#5151FF',
                '&:hover': {
                  borderColor: '#5151FF',
                  bgcolor: 'rgba(81, 81, 255, 0.04)'
                }
              }}
            >
              Retry Exam
            </Button>
            <Typography 
              variant="h6"
              sx={{ 
                fontWeight: 500,
                '& span': { color: '#5151FF' }  // Only the number will be blue
              }}
            >
              Score: <span>{scores[difficulty]}/15</span>
            </Typography>
          </Box>
        </Box>

        {/* Difficulty Tabs */}
        <Box sx={{ mb: 3 }}>
          <Tabs
            value={difficulty}
            onChange={handleDifficultyChange}
            sx={{
              '& .MuiTabs-indicator': {
                display: 'none',
              },
              '& .MuiTab-root': {
                borderRadius: '9999px',
                mx: 1,
                minHeight: '40px',
                textTransform: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#2A3335',
                '&.Mui-selected': {
                  color: 'white',
                  backgroundColor: '#5151FF',
                }
              }
            }}
          >
            <Tab 
              label="Easy" 
              value="easy"
              sx={{
                backgroundColor: difficulty === 'easy' ? '#5151FF' : '#f0f0f0',
              }}
            />
            <Tab 
              label="Medium" 
              value="medium"
              sx={{
                backgroundColor: difficulty === 'medium' ? '#5151FF' : '#f0f0f0',
              }}
            />
            <Tab 
              label="Hard" 
              value="hard"
              sx={{
                backgroundColor: difficulty === 'hard' ? '#5151FF' : '#f0f0f0',
              }}
            />
          </Tabs>
        </Box>

        {/* Updated Questions Grid */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)', // Changed to exactly 5 columns
          gap: 3,  // Increased gap between cards
          mt: 3,
          '& > *': {  // Add minimum width to each card
            minWidth: '200px',
            width: '100%'
          }
        }}>
          {questions[difficulty].map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onAnswer={(isCorrect) => handleAnswer(question.id, isCorrect)}
              isAnswered={answeredQuestions[difficulty][question.id] !== undefined}
            />
          ))}
        </Box>
      </Box>

      {/* Results Modal */}
      <ResultsModal
        open={showResults}
        onClose={() => setShowResults(false)}
        questions={questions[difficulty]}
        answers={answeredQuestions[difficulty]}
        difficulty={difficulty}
      />
    </Container>
  );
};

export default Lab;
