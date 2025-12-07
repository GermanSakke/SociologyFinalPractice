import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Clock, BookOpen } from 'lucide-react';

const SociologyPracticeTest = () => {
  const [answers, setAnswers] = useState({} as Record<number,string>);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(75 * 60); // 75 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const questions = [
    { id: 1, question: "Which of the following is an example of material culture?", options: ["The belief that education is important", "A smartphone", "The norm of shaking hands when meeting someone", "The value of freedom"], answer: "B" },
    { id: 2, question: "Symbolic culture includes all of the following EXCEPT:", options: ["Language", "Beliefs", "Tools and technology", "Gestures"], answer: "C" },
    { id: 3, question: "When someone uses their own culture as the standard to judge other cultures, they are practicing:", options: ["Cultural relativism", "Ethnocentrism", "Cultural diffusion", "Multiculturalism"], answer: "B" },
    { id: 4, question: "Cultural relativism is best defined as:", options: ["Believing your culture is superior to others", "Understanding cultures on their own terms without judgment", "The spread of cultural traits from one society to another", "The process of adopting another culture's practices"], answer: "B" },
    { id: 5, question: "Which term describes everyday customs like holding the door open for someone?", options: ["Mores", "Taboos", "Folkways", "Laws"], answer: "C" },
    { id: 6, question: "Mores differ from folkways in that mores:", options: ["Are less important to society", "Have strong moral significance", "Are always written down as laws", "Change more frequently"], answer: "B" },
    { id: 7, question: "Which represents the STRONGEST form of norm?", options: ["Folkways", "Mores", "Taboos", "Informal norms"], answer: "C" },
    { id: 8, question: "The difference between ideal culture and real culture is:", options: ["Ideal culture is what society claims to value; real culture is actual behavior", "Ideal culture is old; real culture is new", "Ideal culture is material; real culture is symbolic", "There is no difference"], answer: "A" },
    { id: 9, question: "A subculture is best described as:", options: ["A group that directly opposes mainstream values", "A group with distinct values while accepting mainstream culture", "The dominant culture of a society", "A culture that no longer exists"], answer: "B" },
    { id: 10, question: "Which of the following is an example of a counterculture?", options: ["College students", "Medical professionals", "1960s hippie movement", "Sports fans"], answer: "C" },
    { id: 11, question: "Culture lag refers to:", options: ["When material culture changes faster than symbolic culture", "When symbolic culture changes faster than material culture", "The time it takes to learn a new culture", "Forgetting your original culture"], answer: "A" },
    { id: 12, question: "Pierre Bourdieu's concept of habitus refers to:", options: ["Physical homes and living spaces", "Internalized dispositions and habits from one's social position", "Legal residency status", "Cultural artifacts and objects"], answer: "B" },
    { id: 13, question: "Cultural capital includes:", options: ["Money and financial assets", "Education, knowledge, and cultural competencies", "Only formal degrees", "Physical property"], answer: "B" },
    { id: 14, question: "According to Marshall McLuhan, 'the medium is the message' means:", options: ["Content is more important than the form of media", "The form of media shapes how we understand content", "Media always tells the truth", "Messages are only important in print media"], answer: "B" },
    { id: 15, question: "The culture industry refers to:", options: ["Factories that produce cultural artifacts", "Mass production and commercialization of culture", "Museums and art galleries", "Individual artists and creators"], answer: "B" },
    { id: 16, question: "Cultural diffusion is:", options: ["The confusion that results from encountering new cultures", "The spread of cultural traits from one society to another", "The loss of culture over time", "Teaching culture in schools"], answer: "B" },
    { id: 17, question: "Assimilation occurs when:", options: ["Multiple cultures coexist equally", "A minority group adopts the dominant culture", "Cultures remain completely separate", "A new culture is created from mixing two cultures"], answer: "B" },
    { id: 18, question: "A pluralistic society is one in which:", options: ["Only one culture exists", "Multiple distinct cultural groups coexist", "All minorities must assimilate", "Cultural diversity is illegal"], answer: "B" },
    { id: 19, question: "From a sociological perspective, deviance is BEST defined as:", options: ["Behavior that is always criminal", "Behavior that violates social norms and generates negative reactions", "Behavior that is statistically rare", "Behavior that is morally wrong in all contexts"], answer: "B" },
    { id: 20, question: "Statistical deviance differs from social deviance in that:", options: ["Statistical deviance is rare; social deviance violates norms and generates negative reactions", "Statistical deviance is always illegal", "Social deviance is more common", "They mean the same thing"], answer: "A" },
    { id: 21, question: "Deviance is considered a social construct because:", options: ["It is built by construction workers", "What counts as deviant varies by time, place, and social context", "It only exists in modern societies", "It is biologically determined"], answer: "B" },
    { id: 22, question: "Merton's Strain Theory argues that deviance results from:", options: ["Genetic factors", "The gap between cultural goals and legitimate means to achieve them", "Lack of punishment", "Too many laws"], answer: "B" },
    { id: 23, question: "According to Merton, an individual who rejects both cultural goals and means and creates new goals represents:", options: ["Conformity", "Innovation", "Ritualism", "Rebellion"], answer: "D" },
    { id: 24, question: "Differential Association Theory (Sutherland) suggests deviance is:", options: ["Genetically inherited", "Learned through interaction with others", "Caused by poverty", "Random and unpredictable"], answer: "B" },
    { id: 25, question: "Travis Hirschi's Social Bond Theory identifies four bonds that prevent deviance. Which is NOT one of them?", options: ["Attachment", "Commitment", "Innovation", "Belief"], answer: "C" },
    { id: 26, question: "Labeling Theory emphasizes that:", options: ["Deviance is objective and absolute", "Being labeled deviant can lead to further deviance", "Labels have no social consequences", "Only criminals are labeled"], answer: "B" },
    { id: 27, question: "Secondary deviance occurs when:", options: ["Someone commits a minor offense", "Someone commits a second crime", "A person accepts the deviant label and continues deviant behavior", "Two people commit crime together"], answer: "C" },
    { id: 28, question: "A moral panic is:", options: ["Personal anxiety about ethics", "Exaggerated social reaction to a perceived threat", "A type of mental illness", "Legal term for serious crimes"], answer: "B" },
    { id: 29, question: "Stigma refers to:", options: ["A reward for good behavior", "A deeply discrediting attribute that spoils social identity", "A type of punishment", "A neutral characteristic"], answer: "B" },
    { id: 30, question: "From a functionalist perspective, limited amounts of deviance are functional because it:", options: ["Increases crime rates", "Clarifies norms and promotes social unity", "Eliminates all rules", "Makes everyone deviant"], answer: "B" },
    { id: 31, question: "The conflict perspective on crime emphasizes:", options: ["Crime is equally distributed across all social classes", "Laws protect the interests of the powerful", "Crime is always functional", "Criminal justice is perfectly fair"], answer: "B" },
    { id: 32, question: "Mass incarceration in the United States is characterized by:", options: ["Equal imprisonment rates across racial groups", "Declining prison populations since 1970", "The highest incarceration rate in the world with racial disparities", "Only violent offenders being imprisoned"], answer: "C" },
    { id: 33, question: "The Prison Industrial Complex refers to:", options: ["Factories inside prisons", "Economic and political interests in maintaining high incarceration", "A type of prison architecture", "Educational programs in prisons"], answer: "B" },
    { id: 34, question: "Recidivism is:", options: ["The initial crime someone commits", "Re-offending after release from prison", "A type of punishment", "Rehabilitation program"], answer: "B" },
    { id: 35, question: "Which factor contributes MOST to high recidivism rates?", options: ["Too much support for ex-offenders", "Lack of employment opportunities and social support after release", "Prisons being too comfortable", "Sentences being too short"], answer: "B" },
    { id: 36, question: "The medicalization of deviance means:", options: ["Doctors commit more crimes", "Treating deviance as a medical condition rather than moral failing", "Hospitals are sites of deviance", "Medical research is deviant"], answer: "B" },
    { id: 37, question: "Research on the death penalty shows:", options: ["It is applied equally across races and classes", "Racial and class biases exist in its application", "It significantly reduces crime rates", "It is used in all 50 states"], answer: "B" },
    { id: 38, question: "Broken Windows Theory suggests:", options: ["Property crime is the most serious offense", "Visible signs of disorder encourage more serious crime", "Windows should always be repaired", "Crime is random"], answer: "B" },
    { id: 39, question: "From a sociological perspective, race is:", options: ["A biological category with clear genetic differences", "A socially constructed category with real social consequences", "Completely imaginary with no real effects", "Only about skin color"], answer: "B" },
    { id: 40, question: "The fact that racial categories have changed over time (e.g., Irish and Italians becoming 'white') demonstrates:", options: ["Biology changes over time", "Race is socially constructed", "Race doesn't matter", "Ethnicity and race are identical"], answer: "B" },
    { id: 41, question: "Ethnicity refers to:", options: ["Only physical characteristics", "Shared cultural heritage, ancestry, and traditions", "Economic status", "Political affiliation"], answer: "B" },
    { id: 42, question: "Prejudice is best defined as:", options: ["Actions that discriminate", "Preconceived attitudes about groups", "Always based on race", "Legal segregation"], answer: "B" },
    { id: 43, question: "Discrimination differs from prejudice in that discrimination involves:", options: ["Thoughts and attitudes", "Actions that treat people unequally", "Positive feelings only", "Religious beliefs"], answer: "B" },
    { id: 44, question: "Institutional racism refers to:", options: ["Individual racist attitudes", "Policies and practices embedded in institutions that disadvantage minorities", "Racism that only exists in the past", "Personal prejudice"], answer: "B" },
    { id: 45, question: "Stereotypes are:", options: ["Always accurate generalizations", "Oversimplified beliefs about groups", "Only negative", "Based on personal experience only"], answer: "B" },
    { id: 46, question: "Segregation involves:", options: ["Complete acceptance of all groups", "Physical and social separation of groups", "Forced removal from territory", "Systematic destruction of a group"], answer: "B" },
    { id: 47, question: "Genocide is:", options: ["The study of genes", "Forced assimilation", "Systematic destruction of an ethnic/racial group", "Physical separation of groups"], answer: "C" },
    { id: 48, question: "Which pattern of intergroup relations is MOST inclusive?", options: ["Segregation", "Assimilation", "Pluralism/Multiculturalism", "Ethnic cleansing"], answer: "C" },
    { id: 49, question: "Disparities in the U.S. by race exist in all of the following areas EXCEPT:", options: ["Wealth and income", "Educational attainment", "Criminal justice involvement", "None of the above (disparities exist in all these areas)"], answer: "D" },
    { id: 50, question: "The one-drop rule in U.S. history demonstrates:", options: ["Biology determines race", "The social construction of racial categories", "Race doesn't exist", "Ethnicity is more important than race"], answer: "B" }
  ];

  const correctAnswers = {
    1: "B", 2: "C", 3: "B", 4: "B", 5: "C", 6: "B", 7: "C", 8: "A", 9: "B", 10: "C",
    11: "A", 12: "B", 13: "B", 14: "B", 15: "B", 16: "B", 17: "B", 18: "B", 19: "B", 20: "A",
    21: "B", 22: "B", 23: "D", 24: "B", 25: "C", 26: "B", 27: "C", 28: "B", 29: "B", 30: "B",
    31: "B", 32: "C", 33: "B", 34: "B", 35: "B", 36: "B", 37: "B", 38: "B", 39: "B", 40: "B",
    41: "B", 42: "B", 43: "B", 44: "B", 45: "B", 46: "B", 47: "C", 48: "C", 49: "D", 50: "B"
  };

  useEffect(() => {
    let interval: number | undefined;
    if (isTimerRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => interval && clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    setShowResults(true);
    setIsTimerRunning(false);
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
    setTimeLeft(75 * 60);
    setIsTimerRunning(false);
    window.scrollTo(0, 0);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === correctAnswers[q.id]) correct++;
    });
    return correct;
  };

  const score = showResults ? calculateScore() : 0;
  const percentage = showResults ? ((score / questions.length) * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 md:p-8">
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sociology Final Exam - Practice Test</h1>
          <div className="flex flex-wrap gap-4 items-center text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Time Limit: 75 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>50 questions × 2 points = 100 points</span>
            </div>
          </div>
        </div>

        {!isTimerRunning && !showResults && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3 text-blue-900">Instructions</h2>
            <p className="text-gray-700 mb-4">Choose the BEST answer for each question. Click "Start Timer" to begin the timed test, or proceed without timing.</p>
            <button
              onClick={() => setIsTimerRunning(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Start Timer
            </button>
          </div>
        )}

        {isTimerRunning && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold text-indigo-900">Time Remaining:</span>
            </div>
            <span className={`text-2xl font-bold ${timeLeft < 300 ? 'text-red-600' : 'text-indigo-600'}`}>
              {formatTime(timeLeft)}
            </span>
          </div>
        )}

        {showResults && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-green-900 mb-2">Test Results</h2>
            <div className="text-lg">
              <p className="mb-1">Score: <span className="font-bold">{score} / {questions.length}</span></p>
              <p>Percentage: <span className="font-bold">{percentage}%</span></p>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {questions.map((q, idx) => {
            const userAnswer = answers[q.id];
            const isCorrect = showResults && userAnswer === correctAnswers[q.id];
            const isIncorrect = showResults && userAnswer && userAnswer !== correctAnswers[q.id];

            return (
              <div key={q.id} className={`p-6 rounded-lg border-2 ${
                showResults 
                  ? isCorrect ? 'bg-green-50 border-green-300' 
                  : isIncorrect ? 'bg-red-50 border-red-300' 
                  : 'bg-gray-50 border-gray-200'
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-start gap-3 mb-4">
                  <span className="font-bold text-lg text-gray-700">{q.id}.</span>
                  <p className="text-gray-800 font-medium flex-1">{q.question}</p>
                  {showResults && isCorrect && <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />}
                  {showResults && isIncorrect && <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />}
                </div>
                
                <div className="space-y-2 ml-8">
                  {q.options.map((option, optIdx) => {
                    const optionLetter = String.fromCharCode(65 + optIdx);
                    const isSelected = userAnswer === optionLetter;
                    const isCorrectAnswer = showResults && correctAnswers[q.id] === optionLetter;
                    
                    return (
                      <label
                        key={optIdx}
                        className={`flex items-start gap-3 p-3 rounded cursor-pointer transition ${
                          showResults
                            ? isCorrectAnswer ? 'bg-green-100 border border-green-300'
                            : isSelected && !isCorrectAnswer ? 'bg-red-100 border border-red-300'
                            : 'bg-white border border-gray-200'
                            : isSelected ? 'bg-blue-100 border border-blue-300' 
                            : 'bg-white border border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          value={optionLetter}
                          checked={isSelected}
                          onChange={() => handleAnswerChange(q.id, optionLetter)}
                          disabled={showResults}
                          className="mt-1"
                        />
                        <span className="flex-1">
                          <span className="font-semibold">{optionLetter})</span> {option}
                          {showResults && isCorrectAnswer && (
                            <span className="ml-2 text-green-700 font-semibold">(Correct Answer)</span>
                          )}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex gap-4 justify-center">
          {!showResults ? (
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition font-semibold text-lg"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition font-semibold text-lg flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Reset Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SociologyPracticeTest;
