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

import { useQuizSession } from "@/context/QuizSessionContext";

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
  const { quizResult, saveQuizResult, clearQuizResult } = useQuizSession();
  const [currentStep, setCurrentStep] = useState(FIRST_QUESTION_STEP);
  const [selectedLevel, setSelectedLevel] =
    useState<QuizExperienceLevel | null>(null);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isPreparingResults, setIsPreparingResults] = useState(false);
  const [quizError, setQuizError] = useState<string | null>(null);

  const currentQuestions = useMemo(() => {
    if (!selectedLevel) return [];
    return questionsByLevel[selectedLevel];
  }, [selectedLevel]);

  const currentQuestion = currentQuestions.find(
    (q) => q.step === currentStep
  );

  const selectedAnswerId = answers[currentStep];

  const canGoNext =
    currentStep === FIRST_QUESTION_STEP
      ? Boolean(selectedLevel)
      : Boolean(selectedAnswerId);

  const handleSelectLevel = useCallback(
    (level: QuizExperienceLevel) => {
      clearQuizResult();

      setSelectedLevel(level);
      setAnswers({});
      setCurrentStep(FIRST_QUESTION_STEP);
      setQuizError(null);
    },
    [clearQuizResult]
  );

  const handleSelectAnswer = useCallback(
    (optionId: string) => {
      setAnswers((prev) => ({
        ...prev,
        [currentStep]: optionId,
      }));
    },
    [currentStep]
  );

  const handlePrevious = useCallback(() => {
    setCurrentStep((prev) =>
      Math.max(prev - 1, FIRST_QUESTION_STEP)
    );
  }, []);

  const handleNext = useCallback(() => {
    if (!canGoNext) return;

    if (currentStep === QUIZ_TOTAL_STEPS) {
      setIsFinishModalOpen(true);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  }, [canGoNext, currentStep]);

  const handleFinish = useCallback(async () => {
    if (!selectedLevel) return;

    setIsFinishModalOpen(false);
    setIsPreparingResults(true);
    setQuizError(null);

    try {
      const payload = buildQuizRequest(
        selectedLevel,
        currentQuestions,
        answers
      );

      const result = await quizApi.getResult(payload);

      saveQuizResult(result);
    } catch {
      setQuizError("Failed to get quiz results");
    } finally {
      setIsPreparingResults(false);
    }
  }, [answers, currentQuestions, selectedLevel, saveQuizResult]);

  useEffect(() => {
    if (!quizResult) {
      setCurrentStep(FIRST_QUESTION_STEP);
      setSelectedLevel(null);
      setAnswers({});
    }
  }, [quizResult]);


  return (
    <div key={quizResult ? "result" : "quiz"}>
    {quizResult ? (
      <QuizResults wines={quizResult} />
    ) : (
      <>
      <StepFlowLayout
        title="Wine Quiz"
        backTo="/"
        backLabel="Home"
        currentStep={currentStep}
        totalSteps={QUIZ_TOTAL_STEPS}
        canGoNext={canGoNext}
        previousLabel="Previous"
        nextLabel="Next"
        completedNextLabel="Finish"
        progressAriaLabel="Quiz progress"
        className="quiz-page"
        onPrevious={handlePrevious}
        onNext={handleNext}
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

        {quizError && (
          <p className="quiz-page__error">{quizError}</p>
        )}
      </StepFlowLayout>

      <QuizFinishModal
        isOpen={isFinishModalOpen}
        onBackToQuiz={() => setIsFinishModalOpen(false)}
        onFinish={handleFinish}
      />

      <QuizPreparingResults isOpen={isPreparingResults} />
      </>
    )}
  </div>
  );
};