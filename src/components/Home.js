import { useState, useEffect } from 'react';
import { getUsers } from '../services/api';
import './Home.css';

const Home = () => {

  const [localUsers, setLocalUsers] = useState([]);
  const [localCount, setLocalCount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const tableHeaderStyle = {
    padding: '8px 6px',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '0.75em',
    borderRight: '1px solid rgba(255,255,255,0.2)'
  };

  const tableCellStyle = {
    padding: '8px',
    fontSize: '0.6em',
    borderRight: '1px solid rgba(255,255,255,0.1)',
    verticalAlign: 'middle'
  };

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setLocalUsers(data);
        setLocalCount(data.length);
        setError(null);
      } catch (err) {
        setError("Erreur serveur, impossible de récupérer les utilisateurs.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

  }, []);

  return (
    <div className="Home">
      <header className="Home-header">
        <h1>Bienvenue sur votre annuaire !</h1>
      </header>

      {loading && <p>Chargement...</p>}

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      {!loading && !error && localUsers.length > 0 ? (
        <div style={{ margin: '20px 0', overflowX: 'auto' }}>
          <h3 style={{ marginBottom: '15px', color: '#61dafb' }}>
            {localCount} utilisateur(s) inscrit(s)
          </h3>

          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            <thead>
              <tr style={{ background: '#61dafb', color: '#282c34' }}>
                <th style={tableHeaderStyle}>Prénom</th>
                <th style={tableHeaderStyle}>Nom</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Ville</th>
              </tr>
            </thead>
            <tbody>
              {localUsers.map((user, index) => (
                <tr key={user.id || index}>
                  <td style={tableCellStyle}>{user.firstName || user.name?.split(" ")[0]}</td>
                  <td style={tableCellStyle}>{user.lastName || user.name?.split(" ")[1]}</td>
                  <td style={tableCellStyle}>{user.email}</td>
                  <td style={tableCellStyle}>{user.address?.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && !error && (
          <p style={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>
            Aucun inscrit pour le moment
          </p>
        )
      )}

    </div>
  );
}

export default Home;