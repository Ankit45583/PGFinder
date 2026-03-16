import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PGContext } from "../../context/PGContext";
import PGCard from "../../components/pg/PGCard";
import PGFilter from "../../components/pg/PgFilter";
import "./pg-list.css";

const PGList = () => {
  const { pgs } = useContext(PGContext);
  const [searchParams] = useSearchParams();

  const featureType = searchParams.get("type");

  const [search, setSearch] = useState("");
  const [sharing, setSharing] = useState("all");

  // Verified PGs only
  let filteredPGs = pgs.filter((pg) => pg.isVerified);

  // Owner filter
  if (featureType === "owner") {
    filteredPGs = filteredPGs.filter((pg) => pg.ownerRole === "owner");
  }

  // Search + sharing filter
  filteredPGs = filteredPGs.filter(
    (pg) =>
      (pg.name.toLowerCase().includes(search.toLowerCase()) ||
        pg.location.toLowerCase().includes(search.toLowerCase())) &&
      (sharing === "all" || pg.sharing === sharing)
  );

  return (
    <div className="container">
      {/* HERO */}
      <div className="hero">
        <h1>
          {featureType === "verified" && "Verified PGs"}
          {featureType === "pricing" && "Transparent Pricing PGs"}
          {featureType === "owner" && "Direct Owner Contact PGs"}
          {!featureType && "Find Your Perfect PG"}
        </h1>

        <p>
          {featureType
            ? "Showing PGs based on your selection."
            : "Verified PGs near your college. No brokers."}
        </p>
      </div>

      {/* FILTER COMPONENT */}
      <PGFilter
        search={search}
        setSearch={setSearch}
        sharing={sharing}
        setSharing={setSharing}
      />

      {/* PG GRID */}
      <div className="pg-grid">
        {filteredPGs.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No PGs found</p>
        ) : (
          filteredPGs.map((pg) => <PGCard key={pg.id} pg={pg} />)
        )}
      </div>
    </div>
  );
};

export default PGList;