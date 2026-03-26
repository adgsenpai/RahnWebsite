import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch {
      setError('Connection error');
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Admin Login - RAHN</title>
      </Head>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        }}
      >
        <div className="card shadow-lg" style={{ width: '400px' }}>
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <h3 className="fw-bold">RAHN Admin</h3>
              <p className="text-muted">Sign in to manage your content</p>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
