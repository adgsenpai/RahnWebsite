import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';

interface Blog {
  id: number;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  author: string;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/admin/blogs');
      if (res.ok) {
        setBlogs(await res.json());
      }
    } catch (e) {
      console.error('Failed to fetch blogs', e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
    if (res.ok) fetchBlogs();
  };

  return (
    <AdminLayout title="Blog Posts">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">Blog Posts</h2>
        <Link href="/admin/blogs/new" className="btn btn-primary">
          <i className="bi bi-plus-lg me-1"></i> New Post
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border"></div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted mb-3">No blog posts yet.</p>
          <Link href="/admin/blogs/new" className="btn btn-primary">
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <Link
                        href={`/admin/blogs/edit/${blog.id}`}
                        className="text-decoration-none fw-bold"
                      >
                        {blog.title}
                      </Link>
                      <br />
                      <small className="text-muted">/blog/{blog.slug}</small>
                    </td>
                    <td>{blog.author}</td>
                    <td>
                      <span
                        className={`badge ${
                          blog.published
                            ? 'bg-success'
                            : 'bg-warning text-dark'
                        }`}
                      >
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <small>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </small>
                    </td>
                    <td>
                      <Link
                        href={`/admin/blogs/edit/${blog.id}`}
                        className="btn btn-sm btn-outline-primary me-1"
                      >
                        Edit
                      </Link>
                      <a
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-secondary me-1"
                      >
                        View
                      </a>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(blog.id, blog.title)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
