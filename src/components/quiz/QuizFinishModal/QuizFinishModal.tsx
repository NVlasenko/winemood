import "./QuizFinishModal.scss";

type Props = {
  isOpen: boolean;
  onBackToQuiz: () => void;
  onFinish: () => void;
};

export const QuizFinishModal = ({ isOpen, onBackToQuiz, onFinish }: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="quiz-finish-modal" role="dialog" aria-modal="true">
      <button
        className="quiz-finish-modal__backdrop"
        type="button"
        aria-label="Back to quiz"
        onClick={onBackToQuiz}
      />

      <div className="quiz-finish-modal__panel">
        <h2 className="quiz-finish-modal__title">
          Are you sure you’re done?
        </h2>

        <p className="quiz-finish-modal__text">
          You have answered all the questions. Click below to complete the quiz
          and reveal your personalized wine recommendations.
        </p>

        <div className="quiz-finish-modal__actions">
          <button
            className="quiz-finish-modal__button quiz-finish-modal__button--secondary"
            type="button"
            onClick={onBackToQuiz}
          >
            Back to quiz
          </button>

          <button
            className="button-primary quiz-finish-modal__button quiz-finish-modal__button--primary"
            type="button"
            onClick={onFinish}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};