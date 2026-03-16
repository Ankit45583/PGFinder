import PGCard from "./PGCard";

const PGGallery = ({ pgs }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {pgs.map((pg) => (
        <PGCard key={pg.id} pg={pg} />
      ))}
    </div>
  );
};

export default PGGallery;