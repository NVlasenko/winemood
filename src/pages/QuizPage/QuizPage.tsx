import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

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
import { userApi } from "@/shared/api/userApi";

import { buildQuizRequest } from "@/utils/buildQuizRequest";

import { useAuth } from "@/context/AuthContext";
import { useQuizSession } from "@/context/QuizSessionContext";

import "./QuizPage.scss";

const QUIZ_TOTAL_STEPS = 6;
const FIRST_QUESTION_STEP = 1;

const QUIZ_DRAFT_STORAGE_KEY = "quizDraft:v1";
const QUIZ_VIEW_STORAGE_KEY = "quizView:v1";

type QuizAnswers = Record<number, string>;

type QuizDraft = {
  currentStep: number;
  selectedLevel: QuizExperienceLevel | null;
  answers: QuizAnswers;
};

const questionsByLevel = {
  beginner: beginnerQuestions,
  enthusiast: enthusiastQuestions,
  connoisseur: connoisseurQuestions,
};

const getSavedQuizDraft = (): QuizDraft | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const saved = sessionStorage.getItem(
      QUIZ_DRAFT_STORAGE_KEY,
    );

    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved) as QuizDraft;

    if (
      !parsed ||
      typeof parsed !== "object" ||
      !Number.isInteger(parsed.currentStep)
    ) {
      sessionStorage.removeItem(
        QUIZ_DRAFT_STORAGE_KEY,
      );

      return null;
    }

    return parsed;
  } catch {
    sessionStorage.removeItem(
      QUIZ_DRAFT_STORAGE_KEY,
    );

    return null;
  }
};

const saveQuizDraft = (draft: QuizDraft) => {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(
    QUIZ_DRAFT_STORAGE_KEY,
    JSON.stringify(draft),
  );
};

const clearQuizDraft = () => {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(
    QUIZ_DRAFT_STORAGE_KEY,
  );
};

const getSavedQuizView = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return sessionStorage.getItem(
    QUIZ_VIEW_STORAGE_KEY,
  );
};

const clearSavedQuizView = () => {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(
    QUIZ_VIEW_STORAGE_KEY,
  );
};

export const QuizPage = () => {
  const {
    isAuthenticated,
  } = useAuth();

  const {
    quizResult,
    saveQuizResult,
    clearQuizResult,
  } = useQuizSession();

  const [currentStep, setCurrentStep] =
    useState(FIRST_QUESTION_STEP);

  const [
    selectedLevel,
    setSelectedLevel,
  ] = useState<QuizExperienceLevel | null>(
    null,
  );

  const [answers, setAnswers] =
    useState<QuizAnswers>({});

  const [
    isDraftRestored,
    setIsDraftRestored,
  ] = useState(false);

  const [
    isFinishModalOpen,
    setIsFinishModalOpen,
  ] = useState(false);

  const [
    isPreparingResults,
    setIsPreparingResults,
  ] = useState(false);

  const [quizError, setQuizError] =
    useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const restoreQuiz = async () => {
      const savedQuizView =
        getSavedQuizView();

      if (
        savedQuizView === "results" &&
        isAuthenticated &&
        !quizResult
      ) {
        try {
          const wines =
            await userApi.getQuizHistory();

          if (!isMounted) {
            return;
          }

          if (wines.length > 0) {
            clearQuizDraft();

            saveQuizResult(wines);

            setIsDraftRestored(true);

            return;
          }

          clearSavedQuizView();
        } catch (error) {
          console.error(
            "Failed to restore quiz results:",
            error,
          );

          clearSavedQuizView();
        }
      }

      const savedDraft =
        getSavedQuizDraft();

      if (savedDraft) {
        setCurrentStep(
          savedDraft.currentStep,
        );

        setSelectedLevel(
          savedDraft.selectedLevel,
        );

        setAnswers(
          savedDraft.answers,
        );
      }

      if (isMounted) {
        setIsDraftRestored(true);
      }
    };

    restoreQuiz();

    return () => {
      isMounted = false;
    };
  }, [
    isAuthenticated,
    quizResult,
    saveQuizResult,
  ]);

  useEffect(() => {
    if (
      !isDraftRestored ||
      quizResult
    ) {
      return;
    }

    saveQuizDraft({
      currentStep,
      selectedLevel,
      answers,
    });
  }, [
    currentStep,
    selectedLevel,
    answers,
    quizResult,
    isDraftRestored,
  ]);

  const currentQuestions =
    useMemo(() => {
      if (!selectedLevel) {
        return [];
      }

      return questionsByLevel[
        selectedLevel
      ];
    }, [selectedLevel]);

  const currentQuestion =
    currentQuestions.find(
      (question) =>
        question.step ===
        currentStep,
    );

  const selectedAnswerId =
    answers[currentStep];

  const canGoNext =
    currentStep ===
    FIRST_QUESTION_STEP
      ? Boolean(selectedLevel)
      : Boolean(
          selectedAnswerId,
        );

  const handleSelectLevel =
    useCallback(
      (
        level: QuizExperienceLevel,
      ) => {
        clearSavedQuizView();

        clearQuizResult();

        setSelectedLevel(
          level,
        );

        setAnswers({});

        setCurrentStep(
          FIRST_QUESTION_STEP,
        );

        setQuizError(null);
      },
      [clearQuizResult],
    );

  const handleSelectAnswer =
    useCallback(
      (optionId: string) => {
        setAnswers(
          (previous) => ({
            ...previous,
            [currentStep]:
              optionId,
          }),
        );
      },
      [currentStep],
    );

  const handlePrevious =
    useCallback(() => {
      setCurrentStep(
        (previous) =>
          Math.max(
            previous - 1,
            FIRST_QUESTION_STEP,
          ),
      );
    }, []);

  const handleNext =
    useCallback(() => {
      if (!canGoNext) {
        return;
      }

      if (
        currentStep ===
        QUIZ_TOTAL_STEPS
      ) {
        setIsFinishModalOpen(
          true,
        );

        return;
      }

      setCurrentStep(
        (previous) =>
          previous + 1,
      );
    }, [
      canGoNext,
      currentStep,
    ]);

  const restartQuiz =
    useCallback(() => {
      clearSavedQuizView();

      clearQuizDraft();

      setCurrentStep(
        FIRST_QUESTION_STEP,
      );

      setSelectedLevel(
        null,
      );

      setAnswers({});

      setQuizError(null);

      setIsFinishModalOpen(
        false,
      );

      clearQuizResult();
    }, [
      clearQuizResult,
    ]);

  const handleFinish =
    useCallback(
      async () => {
        if (!selectedLevel) {
          return;
        }

        setIsFinishModalOpen(
          false,
        );

        setIsPreparingResults(
          true,
        );

        setQuizError(null);

        try {
          const payload =
            buildQuizRequest(
              selectedLevel,
              currentQuestions,
              answers,
            );

          const result =
            await quizApi.getResult(
              payload,
            );

          clearQuizDraft();

          saveQuizResult(
            result,
          );
        } catch (error) {
          console.error(
            "QUIZ FINISH ERROR:",
            error,
          );

          setQuizError(
            "Failed to get quiz results",
          );
        } finally {
          setIsPreparingResults(
            false,
          );
        }
      },
      [
        answers,
        currentQuestions,
        selectedLevel,
        saveQuizResult,
      ],
    );

  if (!isDraftRestored) {
    return (
      <div className="quiz-page quiz-page--restoring" />
    );
  }

  return (
    <div
      key={
        quizResult
          ? "result"
          : "quiz"
      }
    >
      {quizResult ? (
        <QuizResults
          wines={quizResult}
          onRestart={
            restartQuiz
          }
        />
      ) : (
        <>
          <StepFlowLayout
            title="Wine Quiz"
            backTo="/"
            backLabel="Home"
            currentStep={
              currentStep
            }
            totalSteps={
              QUIZ_TOTAL_STEPS
            }
            canGoNext={
              canGoNext
            }
            previousLabel="Previous"
            nextLabel="Next"
            completedNextLabel="Finish"
            progressAriaLabel="Quiz progress"
            className="quiz-page"
            onPrevious={
              handlePrevious
            }
            onNext={
              handleNext
            }
          >
            {currentStep ===
              FIRST_QUESTION_STEP && (
              <QuizIntro
                selectedLevel={
                  selectedLevel
                }
                onSelectLevel={
                  handleSelectLevel
                }
              />
            )}

            {currentStep >
              FIRST_QUESTION_STEP &&
              currentQuestion && (
                <QuizQuestion
                  step={
                    currentQuestion.step
                  }
                  totalSteps={
                    QUIZ_TOTAL_STEPS
                  }
                  question={
                    currentQuestion.question
                  }
                  options={
                    currentQuestion.options
                  }
                  selectedOptionId={
                    selectedAnswerId
                  }
                  onSelectOption={
                    handleSelectAnswer
                  }
                />
              )}

            {quizError && (
              <p className="quiz-page__error">
                {quizError}
              </p>
            )}
          </StepFlowLayout>

          <QuizFinishModal
            isOpen={
              isFinishModalOpen
            }
            onBackToQuiz={() =>
              setIsFinishModalOpen(
                false,
              )
            }
            onFinish={
              handleFinish
            }
          />

          <QuizPreparingResults
            isOpen={
              isPreparingResults
            }
          />
        </>
      )}
    </div>
  );
};