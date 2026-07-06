import { useCallback, useEffect, useMemo, useState } from "react";

import {
  QuizIntro,
  type QuizExperienceLevel,
} from "@/components/quiz/QuizIntro";
import { QuizFinishModal } from "@/components/quiz/QuizFinishModal";
import { QuizPreparingResults } from "@/components/quiz/QuizPreparingResults";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizResults } from "@/components/quiz/QuizResults";
import {
  beginnerQuestions,
  connoisseurQuestions,
  enthusiastQuestions,
} from "@/components/quiz/config";

import { StepFlowLayout } from "@/components/ui/StepFlowLayout";

import { quizApi } from "@/shared/api/quizApi";
import { buildQuizRequest } from "@/utils/buildQuizRequest";

import "./QuizPage.scss";
import { useQuizSession } from "@/context/QuizSessionContext";

const QUIZ_TOTAL_STEPS = 6;
const FIRST_QUESTION_STEP = 1;
const QUIZ_PROGRESS_STORAGE_KEY = "quizProgress";

type QuizAnswers = Record<number, string>;

type SavedQuizProgress = {
  currentStep: number;
  selectedLevel: QuizExperienceLevel | null;
  answers: QuizAnswers;
};

const questionsByLevel = {
  beginner: beginnerQuestions,
  enthusiast: enthusiastQuestions,
  connoisseur: connoisseurQuestions,
};

const isQuizExperienceLevel = (
  value: unknown,
): value is QuizExperienceLevel => {
  return (
    value === "beginner" ||
    value === "enthusiast" ||
    value === "connoisseur"
  );
};

const getSavedQuizProgress = (): SavedQuizProgress | null => {
  try {
    const savedProgress = localStorage.getItem(QUIZ_PROGRESS_STORAGE_KEY);

    if (!savedProgress) {
      return null;
    }

    const parsedProgress = JSON.parse(savedProgress) as SavedQuizProgress;

    const isValidStep =
      typeof parsedProgress.currentStep === "number" &&
      parsedProgress.currentStep >= FIRST_QUESTION_STEP &&
      parsedProgress.currentStep <= QUIZ_TOTAL_STEPS;

    const isValidLevel =
      parsedProgress.selectedLevel === null ||
      isQuizExperienceLevel(parsedProgress.selectedLevel);

    const isValidAnswers =
      parsedProgress.answers &&
      typeof parsedProgress.answers === "object" &&
      !Array.isArray(parsedProgress.answers);

    if (!isValidStep || !isValidLevel || !isValidAnswers) {
      localStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY);

      return null;
    }

    return parsedProgress;
  } catch {
    localStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY);

    return null;
  }
};

const scrollToPageTop = () => {
  requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  });
};

export const QuizPage = () => {
  const { quizResult, saveQuizResult, clearQuizResult } = useQuizSession();

  const savedProgress = useMemo(() => getSavedQuizProgress(), []);

  const [currentStep, setCurrentStep] = useState(
    savedProgress?.currentStep ?? FIRST_QUESTION_STEP,
  );

  const [selectedLevel, setSelectedLevel] = useState<QuizExperienceLevel | null>(
    savedProgress?.selectedLevel ?? null,
  );

  const [answers, setAnswers] = useState<QuizAnswers>(
    savedProgress?.answers ?? {},
  );

  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isPreparingResults, setIsPreparingResults] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);

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

  useEffect(() => {
    scrollToPageTop();
  }, [currentStep, quizResult]);

  useEffect(() => {
    if (!selectedLevel) {
      return;
    }

    const progress: SavedQuizProgress = {
      currentStep,
      selectedLevel,
      answers,
    };

    localStorage.setItem(QUIZ_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }, [answers, currentStep, selectedLevel]);

  const handleSelectLevel = useCallback(
    (level: QuizExperienceLevel) => {
      clearQuizResult();

      setSelectedLevel(level);
      setAnswers({});
      setCurrentStep(FIRST_QUESTION_STEP);
      setQuizError(null);
    },
    [clearQuizResult],
  );

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

  const handleFinishQuiz = useCallback(async () => {
    if (!selectedLevel) {
      return;
    }

    setIsFinishModalOpen(false);
    setIsPreparingResults(true);
    setQuizError(null);

    try {
      const payload = buildQuizRequest(selectedLevel, currentQuestions, answers);
      const result = await quizApi.getResult(payload);

      saveQuizResult(result);
      localStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to get quiz results";

      setQuizError(message);
    } finally {
      setIsPreparingResults(false);
    }
  }, [answers, currentQuestions, saveQuizResult, selectedLevel]);

  if (quizResult) {
    return <QuizResults wines={quizResult} />;
  }

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

        {quizError && <p className="quiz-page__error">{quizError}</p>}
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