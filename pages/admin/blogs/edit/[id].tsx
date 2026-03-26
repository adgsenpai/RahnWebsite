import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/admin/AdminLayout';
import BlogForm from '../../../../components/admin/BlogForm';

export default function EditBlog() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  return (
    <AdminLayout title="Edit Post">
      <h2 className="fw-bold mb-4">Edit Blog Post</h2>
      <BlogForm blogId={parseInt(id as string)} />
    </AdminLayout>
  );
}
