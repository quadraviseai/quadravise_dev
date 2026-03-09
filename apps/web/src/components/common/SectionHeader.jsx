function SectionHeader({ title, subtitle, align = "left" }) {
  return (
    <div className={`section-header section-header-${align}`}>
      <h2 className="section-title">{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </div>
  );
}

export default SectionHeader;
