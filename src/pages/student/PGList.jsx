import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PGContext } from "../../context/PGContext";
import PGCard from "../../components/pg/PGCard";
import "./pg-list.css";

const PGList = () => {
  const { pgs } = useContext(PGContext);
  const [searchParams] = useSearchParams();

  const featureType = searchParams.get("type"); // verified | pricing | owner

  const [search, setSearch] = useState("");
  const [sharing, setSharing] = useState("all");

  let filteredPGs = pgs.filter((pg) => pg.isVerified);

  if (featureType === "owner") {
    filteredPGs = filteredPGs.filter((pg) => pg.ownerRole === "owner");
  }

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

      {/* 🔍 FILTER BAR */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by PG name or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sharing}
          onChange={(e) => setSharing(e.target.value)}
        >
          <option value="all">All Sharing</option>
          <option value="Single">Single</option>
          <option value="2 Sharing">2 Sharing</option>
        </select>
      </div>

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
