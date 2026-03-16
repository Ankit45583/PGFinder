import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PGContext } from "../../context/PGContext";
import "./admin.css";

const Users = () => {

  const { users, setUsers } = useContext(AuthContext);
  const { pgs } = useContext(PGContext);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const deleteUser = (email) => {
    const updated = users.filter((u) => u.email !== email);
    setUsers(updated);
  };

  const filteredUsers = users
    .filter((u) => u.role !== "admin")
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .filter((u) => roleFilter === "all" || u.role === roleFilter);

  const getOwnerPGCount = (email) => {
    return pgs.filter((pg) => pg.ownerEmail === email).length;
  };

  return (
    <div className="admin-dashboard">

      <h2 className="admin-title">Users Management</h2>

      {/* Search + Filter */}
      <div className="user-controls">

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="role-filter"
        >
          <option value="all">All</option>
          <option value="student">Student</option>
          <option value="owner">Owner</option>
        </select>

      </div>

      <table className="users-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Owner PGs</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredUsers.map((user, index) => (
            <tr key={index}>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>
                <span className={`role-badge role-${user.role}`}>
                  {user.role}
                </span>
              </td>

              <td>
                {user.role === "owner"
                  ? getOwnerPGCount(user.email)
                  : "-"}
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.email)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Users;