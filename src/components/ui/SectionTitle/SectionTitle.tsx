import "./SectionTitle.scss";

type Props = {
  title: string;
};

export const SectionTitle = ({ title }: Props) => {
  return (
    <div className="section-title">
      <span
        className="section-title__line section-title__line--left"
        aria-hidden="true"
      />

      <span className="section-title__text-wrap">
        <h2 className="section-title__text">{title}</h2>
      </span>

      <span
        className="section-title__line section-title__line--right"
        aria-hidden="true"
      />
    </div>
  );
};