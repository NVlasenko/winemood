import { useCallback, useMemo, useState } from "react";

import {
  QuizIntro,
  type QuizExperienceLevel,
} from "@/components/quiz/QuizIntro";
import { QuizFinishModal } from "@/components/quiz/QuizFinishModal";
import { QuizPreparingResults } from "@/components/quiz/QuizPreparingResults";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import {
  beginnerQuestions,
  connoisseurQuestions,
  enthusiastQuestions,
} from "@/components/quiz/config";
import { StepFlowLayout } from "@/components/ui/StepFlowLayout";

import "./QuizPage.scss";

const QUIZ_TOTAL_STEPS = 6;
const FIRST_QUESTION_STEP = 1;

type QuizAnswers = Record<number, string>;

const questionsByLevel = {
  beginner: beginnerQuestions,
  enthusiast: enthusiastQuestions,
  connoisseur: connoisseurQuestions,
};

export const QuizPage = () => {
  const [currentStep, setCurrentStep] = useState(FIRST_QUESTION_STEP);
  const [selectedLevel, setSelectedLevel] =
    useState<QuizExperienceLevel | null>(null);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isPreparingResults, setIsPreparingResults] = useState(false);

  const currentQuestions = useMemo(() => {
    if (!selectedLevel) {
      return [];
    }

    return questionsByLevel[selectedLevel];
  }, [selectedLevel]);

  const currentQuestion = currentQuestions.find(
    (question) => question.step === currentStep,
  );

  const selectedAnswerId = answers[currentStep] || null;

  const canGoNext =
    currentStep === FIRST_QUESTION_STEP
      ? Boolean(selectedLevel)
      : Boolean(selectedAnswerId);

  const handleSelectLevel = useCallback((level: QuizExperienceLevel) => {
    setSelectedLevel(level);
    setAnswers({});
    setCurrentStep(FIRST_QUESTION_STEP);
  }, []);

  const handleSelectAnswer = useCallback(
    (optionId: string) => {
      setAnswers((prev) => ({
        ...prev,
        [currentStep]: optionId,
      }));
    },
    [currentStep],
  );

  const handlePreviousQuestion = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, FIRST_QUESTION_STEP));
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (!canGoNext) {
      return;
    }

    if (currentStep === QUIZ_TOTAL_STEPS) {
      setIsFinishModalOpen(true);
      return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, QUIZ_TOTAL_STEPS));
  }, [canGoNext, currentStep]);

  const handleCloseFinishModal = useCallback(() => {
    setIsFinishModalOpen(false);
  }, []);

  const handleFinishQuiz = useCallback(() => {
    setIsFinishModalOpen(false);
    setIsPreparingResults(true);

    console.log("Quiz finished", {
      selectedLevel,
      answers,
    });
  }, [answers, selectedLevel]);

  return (
    <>
      <StepFlowLayout
        title="Wine Quiz"
        backTo="/"
        backLabel="Home"
        currentStep={currentStep}
        totalSteps={QUIZ_TOTAL_STEPS}
        canGoNext={canGoNext}
        previousLabel="Previous question"
        nextLabel="Next question"
        completedNextLabel="Finish"
        progressAriaLabel="Quiz progress"
        className="quiz-page"
        onPrevious={handlePreviousQuestion}
        onNext={handleNextQuestion}
      >
        {currentStep === FIRST_QUESTION_STEP && (
          <QuizIntro
            selectedLevel={selectedLevel}
            onSelectLevel={handleSelectLevel}
          />
        )}

        {currentStep > FIRST_QUESTION_STEP && currentQuestion && (
          <QuizQuestion
            step={currentQuestion.step}
            totalSteps={QUIZ_TOTAL_STEPS}
            question={currentQuestion.question}
            options={currentQuestion.options}
            selectedOptionId={selectedAnswerId}
            onSelectOption={handleSelectAnswer}
          />
        )}

        {currentStep > FIRST_QUESTION_STEP && !currentQuestion && (
          <div className="quiz-page__placeholder">
            <p className="quiz-page__placeholder-step">
              Question {currentStep} of {QUIZ_TOTAL_STEPS}
            </p>

            <h2 className="quiz-page__placeholder-title">
              This question is not ready yet
            </h2>

            <p className="quiz-page__placeholder-text">
              Selected path: {selectedLevel}
            </p>
          </div>
        )}
      </StepFlowLayout>

      <QuizFinishModal
        isOpen={isFinishModalOpen}
        onBackToQuiz={handleCloseFinishModal}
        onFinish={handleFinishQuiz}
      />

      <QuizPreparingResults isOpen={isPreparingResults} />
    </>
  );
};