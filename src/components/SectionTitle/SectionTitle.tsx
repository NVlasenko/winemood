import "./SectionTitle.scss";

type Props = {
  title: string;
};

export const SectionTitle = ({ title }: Props) => {
  return (
    <div className="section-title">
      <span className="section-title__line section-title__line--left" />

      <h2 className="section-title__text">{title}</h2>

      <span className="section-title__line section-title__line--right" />
    </div>
  );
};
