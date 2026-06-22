type Props = {
  message: string;
};

export const WineDetailsErrorState = ({ message }: Props) => {
  return (
    <div className="wine-details-page__empty">
      <h1 className="wine-details-page__title">Failed to load wine</h1>

      <p className="wine-details-page__text">{message}</p>
    </div>
  );
};