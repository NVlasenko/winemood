import "./SectionTitle.scss";

type Props = {
  title: string;
};

export const SectionTitle = ({ title }: Props) => {
  return (
    <div className="section-title">
      <span className="section-title__line section-title__line--left" />

      <span className="section-title__text-wrap">
        <h1 className="section-title__text">{title}</h1>
      </span>

      <span className="section-title__line section-title__line--right" />
    </div>
  );
};