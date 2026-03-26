import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin/blogs');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
