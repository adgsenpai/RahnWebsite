import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function AdminLayout({
  children,
  title = 'Admin',
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/me')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        setUser(data.username);
        setLoading(false);
      })
      .catch(() => {
        router.push('/admin/login');
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{title} - RAHN Admin</title>
      </Head>
      <div className="d-flex" style={{ minHeight: '100vh' }}>
        {/* Sidebar */}
        <nav
          className="d-flex flex-column flex-shrink-0 p-3 text-white"
          style={{
            width: '260px',
            backgroundColor: '#1a1a2e',
            minHeight: '100vh',
          }}
        >
          <Link
            href="/admin"
            className="d-flex align-items-center mb-3 text-white text-decoration-none"
          >
            <span className="fs-4 fw-bold">RAHN Admin</span>
          </Link>
          <hr style={{ borderColor: '#444' }} />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link
                href="/admin/blogs"
                className={`nav-link text-white ${
                  router.pathname.includes('/admin/blogs') ? 'active' : ''
                }`}
              >
                <i className="bi bi-file-earmark-text me-2"></i>
                Blog Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/admin/blogs/new" className="nav-link text-white">
                <i className="bi bi-plus-circle me-2"></i>
                New Post
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/admin/analytics"
                className={`nav-link text-white ${
                  router.pathname === '/admin/analytics' ? 'active' : ''
                }`}
              >
                <i className="bi bi-bar-chart-line me-2"></i>
                Analytics
              </Link>
            </li>

            <li className="nav-item mt-4">
              <span className="nav-link text-secondary small text-uppercase fw-bold">
                AI Features
              </span>
            </li>
            <li className="nav-item">
              <Link
                href="/admin/blogs/new"
                className="nav-link text-white opacity-75"
              >
                <i className="bi bi-robot me-2"></i>
                Content Generator
                <span
                  className="badge bg-warning text-dark ms-2"
                  style={{ fontSize: '0.6rem' }}
                >
                  BETA
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link text-white" style={{ opacity: 0.4 }}>
                <i className="bi bi-image me-2"></i>
                AI Image Gen
                <span
                  className="badge bg-warning text-dark ms-2"
                  style={{ fontSize: '0.6rem' }}
                >
                  BETA
                </span>
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link text-white" style={{ opacity: 0.3 }}>
                <i className="bi bi-lightbulb me-2"></i>
                SEO Advisor
                <span
                  className="badge bg-secondary ms-2"
                  style={{ fontSize: '0.6rem' }}
                >
                  SOON
                </span>
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link text-white" style={{ opacity: 0.3 }}>
                <i className="bi bi-graph-up me-2"></i>
                Analytics AI
                <span
                  className="badge bg-secondary ms-2"
                  style={{ fontSize: '0.6rem' }}
                >
                  SOON
                </span>
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link text-white" style={{ opacity: 0.3 }}>
                <i className="bi bi-translate me-2"></i>
                Auto Translate
                <span
                  className="badge bg-secondary ms-2"
                  style={{ fontSize: '0.6rem' }}
                >
                  SOON
                </span>
              </span>
            </li>
          </ul>
          <hr style={{ borderColor: '#444' }} />
          <div className="d-flex align-items-center">
            <span className="text-white me-auto">
              <i className="bi bi-person-circle me-2"></i>
              {user}
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline-light"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main content */}
        <div className="flex-grow-1" style={{ backgroundColor: '#f5f6fa' }}>
          <div className="p-4">{children}</div>
        </div>
      </div>
    </>
  );
}
