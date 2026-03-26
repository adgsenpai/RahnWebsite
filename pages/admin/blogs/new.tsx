import AdminLayout from '../../../components/admin/AdminLayout';
import BlogForm from '../../../components/admin/BlogForm';

export default function NewBlog() {
  return (
    <AdminLayout title="New Post">
      <h2 className="fw-bold mb-4">New Blog Post</h2>
      <BlogForm />
    </AdminLayout>
  );
}
