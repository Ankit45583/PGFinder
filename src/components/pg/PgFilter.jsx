import "./pg-filter.css";

const PGFilter = ({ search, setSearch, sharing, setSharing }) => {
  return (
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
        <option value="3 Sharing">3 Sharing</option>
      </select>
    </div>
  );
};

export default PGFilter;