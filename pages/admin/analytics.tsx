import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';

interface AnalyticsData {
  totalViews: number;
  todayViews: number;
  weekViews: number;
  monthViews: number;
  uniqueVisitors: number;
  topPages: { path: string; views: number }[];
  topCountries: { country: string; views: number }[];
  topCities: { city: string; country: string; views: number }[];
  recentVisits: {
    id: number;
    path: string;
    ip: string;
    country: string | null;
    city: string | null;
    userAgent: string;
    referer: string;
    createdAt: string;
  }[];
  dailyChart: { date: string; views: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'geo' | 'visitors'>('overview');

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const parseUA = (ua: string) => {
    if (!ua) return 'Unknown';
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edg')) return 'Edge';
    if (ua.includes('bot') || ua.includes('Bot') || ua.includes('crawl')) return 'Bot';
    return 'Other';
  };

  if (loading) {
    return (
      <AdminLayout title="Analytics">
        <div className="text-center py-5">
          <div className="spinner-border" role="status" />
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout title="Analytics">
        <div className="alert alert-danger">Failed to load analytics data.</div>
      </AdminLayout>
    );
  }

  const maxDaily = Math.max(...data.dailyChart.map((d) => d.views), 1);

  return (
    <AdminLayout title="Analytics">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">
          <i className="bi bi-bar-chart-line me-2"></i>
          Site Analytics
        </h3>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => window.location.reload()}
        >
          <i className="bi bi-arrow-clockwise me-1"></i> Refresh
        </button>
      </div>

      {/* Stat Cards */}
      <div className="row g-3 mb-4">
        {[
          { label: 'Total Views', value: data.totalViews, icon: 'bi-eye', color: '#6366f1' },
          { label: 'Today', value: data.todayViews, icon: 'bi-calendar-day', color: '#10b981' },
          { label: 'This Week', value: data.weekViews, icon: 'bi-calendar-week', color: '#f59e0b' },
          { label: 'This Month', value: data.monthViews, icon: 'bi-calendar-month', color: '#ef4444' },
          { label: 'Unique Visitors', value: data.uniqueVisitors, icon: 'bi-people', color: '#8b5cf6' },
        ].map((stat) => (
          <div key={stat.label} className="col-lg col-sm-6">
            <div
              className="card border-0 shadow-sm h-100"
              style={{ borderLeft: `4px solid ${stat.color}` }}
            >
              <div className="card-body d-flex align-items-center">
                <i
                  className={`bi ${stat.icon} me-3`}
                  style={{ fontSize: '1.8rem', color: stat.color }}
                ></i>
                <div>
                  <div className="text-muted small">{stat.label}</div>
                  <div className="fw-bold fs-4">{stat.value.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        {[
          { key: 'overview', label: 'Overview', icon: 'bi-graph-up' },
          { key: 'pages', label: 'Top Pages', icon: 'bi-file-earmark-text' },
          { key: 'geo', label: 'Geography', icon: 'bi-globe' },
          { key: 'visitors', label: 'Recent Visitors', icon: 'bi-person-lines-fill' },
        ].map((tab) => (
          <li className="nav-item" key={tab.key}>
            <button
              className={`nav-link ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key as any)}
            >
              <i className={`bi ${tab.icon} me-1`}></i> {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Overview Tab - Daily Chart */}
      {activeTab === 'overview' && (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white fw-bold">
            <i className="bi bi-bar-chart me-2"></i>
            Page Views — Last 30 Days
          </div>
          <div className="card-body">
            <div
              className="d-flex align-items-end gap-1"
              style={{ height: 200, overflowX: 'auto' }}
            >
              {data.dailyChart.map((day) => (
                <div
                  key={day.date}
                  className="d-flex flex-column align-items-center"
                  style={{ minWidth: 24, flex: 1 }}
                  title={`${day.date}: ${day.views} views`}
                >
                  <small
                    className="text-muted mb-1"
                    style={{ fontSize: '0.6rem' }}
                  >
                    {day.views > 0 ? day.views : ''}
                  </small>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: 30,
                      height: `${Math.max((day.views / maxDaily) * 160, 2)}px`,
                      backgroundColor: day.views > 0 ? '#6366f1' : '#e5e7eb',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.3s',
                    }}
                  />
                  <small
                    className="text-muted mt-1"
                    style={{ fontSize: '0.55rem', writingMode: 'vertical-lr', transform: 'rotate(180deg)', height: 50 }}
                  >
                    {day.date.slice(5)}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top Pages Tab */}
      {activeTab === 'pages' && (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white fw-bold">
            <i className="bi bi-file-earmark-text me-2"></i>
            Top Pages
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Page</th>
                    <th className="text-end">Views</th>
                    <th style={{ width: '30%' }}>Distribution</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topPages.map((page, i) => (
                    <tr key={page.path}>
                      <td className="text-muted">{i + 1}</td>
                      <td>
                        <code style={{ fontSize: '0.85rem' }}>{page.path}</code>
                      </td>
                      <td className="text-end fw-bold">{page.views}</td>
                      <td>
                        <div className="progress" style={{ height: 8 }}>
                          <div
                            className="progress-bar"
                            style={{
                              width: `${(page.views / data.topPages[0].views) * 100}%`,
                              backgroundColor: '#6366f1',
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Geography Tab */}
      {activeTab === 'geo' && (
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white fw-bold">
                <i className="bi bi-globe me-2"></i>
                Top Countries
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Country</th>
                        <th className="text-end">Views</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topCountries.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="text-center text-muted py-4">
                            No geo data yet. Views from localhost won't have country info.
                          </td>
                        </tr>
                      ) : (
                        data.topCountries.map((c, i) => (
                          <tr key={c.country}>
                            <td className="text-muted">{i + 1}</td>
                            <td>{c.country}</td>
                            <td className="text-end fw-bold">{c.views}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-header bg-white fw-bold">
                <i className="bi bi-geo-alt me-2"></i>
                Top Cities
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>City</th>
                        <th>Country</th>
                        <th className="text-end">Views</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.topCities.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="text-center text-muted py-4">
                            No geo data yet.
                          </td>
                        </tr>
                      ) : (
                        data.topCities.map((c, i) => (
                          <tr key={`${c.city}-${c.country}`}>
                            <td className="text-muted">{i + 1}</td>
                            <td>{c.city}</td>
                            <td className="text-muted">{c.country}</td>
                            <td className="text-end fw-bold">{c.views}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Visitors Tab */}
      {activeTab === 'visitors' && (
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white fw-bold">
            <i className="bi bi-person-lines-fill me-2"></i>
            Recent Visitors (Last 50)
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-sm mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Time</th>
                    <th>Page</th>
                    <th>IP</th>
                    <th>Location</th>
                    <th>Browser</th>
                    <th>Referer</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentVisits.map((v) => (
                    <tr key={v.id}>
                      <td className="text-nowrap" style={{ fontSize: '0.8rem' }}>
                        {formatDate(v.createdAt)}
                      </td>
                      <td>
                        <code style={{ fontSize: '0.8rem' }}>{v.path}</code>
                      </td>
                      <td style={{ fontSize: '0.8rem' }}>{v.ip}</td>
                      <td style={{ fontSize: '0.8rem' }}>
                        {v.city && v.country
                          ? `${v.city}, ${v.country}`
                          : v.country || '—'}
                      </td>
                      <td style={{ fontSize: '0.8rem' }}>{parseUA(v.userAgent)}</td>
                      <td
                        style={{
                          fontSize: '0.75rem',
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={v.referer}
                      >
                        {v.referer
                          ? (() => {
                              try {
                                return new URL(v.referer).pathname;
                              } catch {
                                return v.referer.substring(0, 40);
                              }
                            })()
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
