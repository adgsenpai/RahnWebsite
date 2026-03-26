import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface BlogData {
  id?: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  published: boolean;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  metaKeywords: string;
  metaDescription: string;
}

const defaultBlog: BlogData = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  featuredImage: '',
  author: 'RAHN Team',
  published: false,
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  metaKeywords: '',
  metaDescription: '',
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
}

export default function BlogForm({ blogId }: { blogId?: number }) {
  const router = useRouter();
  const [form, setForm] = useState<BlogData>(defaultBlog);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (blogId) {
      fetch(`/api/admin/blogs/${blogId}`)
        .then((r) => {
          if (!r.ok) throw new Error();
          return r.json();
        })
        .then((data) =>
          setForm({
            ...data,
            excerpt: data.excerpt || '',
            featuredImage: data.featuredImage || '',
            author: data.author || 'RAHN Team',
            ogTitle: data.ogTitle || '',
            ogDescription: data.ogDescription || '',
            ogImage: data.ogImage || '',
            metaKeywords: data.metaKeywords || '',
            metaDescription: data.metaDescription || '',
          })
        )
        .catch(() => router.push('/admin/blogs'));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const newForm = {
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    };
    // Auto-generate slug from title for new posts
    if (name === 'title' && !blogId) {
      newForm.slug = slugify(value);
    }
    setForm(newForm);
  };

  const handleSave = async (publish?: boolean) => {
    setSaving(true);
    setMessage('');
    const data = { ...form };
    if (publish !== undefined) data.published = publish;

    try {
      const url = blogId
        ? `/api/admin/blogs/${blogId}`
        : '/api/admin/blogs';
      const method = blogId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        setMessage('Saved successfully!');
        if (!blogId) {
          router.push(`/admin/blogs/edit/${result.id}`);
        }
      } else {
        const err = await res.json();
        setMessage(`Error: ${err.error}`);
      }
    } catch (e: any) {
      setMessage(`Error: ${e.message}`);
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setForm((prev) => ({ ...prev, featuredImage: data.url, ogImage: data.url }));
        setMessage('Image uploaded!');
      } else {
        setMessage(`Upload error: ${data.error}`);
      }
    } catch {
      setMessage('Upload failed');
    }
    setUploading(false);
  };

  const handleAIGenerateImage = async () => {
    if (!aiPrompt) return;
    setAiLoading(true);
    setMessage('Generating AI image...');
    try {
      const res = await fetch('/api/admin/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const data = await res.json();
      if (data.url) {
        setForm((prev) => ({ ...prev, featuredImage: data.url, ogImage: data.url }));
        setMessage('AI image generated!');
      } else {
        setMessage(`AI Error: ${data.error}`);
      }
    } catch (e: any) {
      setMessage(`AI Error: ${e.message}`);
    }
    setAiLoading(false);
  };

  const handleAISEO = async () => {
    if (!form.title) {
      setMessage('Enter a title first');
      return;
    }
    setAiLoading(true);
    setMessage('Generating SEO metadata...');
    try {
      const res = await fetch('/api/admin/ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'seo', input: form.title }),
      });
      const data = await res.json();
      if (data.result) {
        try {
          const cleaned = data.result
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();
          const seo = JSON.parse(cleaned);
          setForm((prev) => ({
            ...prev,
            metaDescription: seo.metaDescription || prev.metaDescription,
            metaKeywords: seo.metaKeywords || prev.metaKeywords,
            ogTitle: seo.ogTitle || prev.ogTitle,
            ogDescription: seo.ogDescription || prev.ogDescription,
          }));
          setMessage('SEO metadata generated!');
        } catch {
          setMessage('AI returned non-JSON. Raw: ' + data.result.substring(0, 100));
        }
      }
    } catch (e: any) {
      setMessage(`AI Error: ${e.message}`);
    }
    setAiLoading(false);
  };

  const handleAIExcerpt = async () => {
    if (!form.content) {
      setMessage('Add content first');
      return;
    }
    setAiLoading(true);
    setMessage('Generating excerpt...');
    try {
      const res = await fetch('/api/admin/ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'excerpt', input: form.content }),
      });
      const data = await res.json();
      if (data.result) {
        setForm((prev) => ({ ...prev, excerpt: data.result.trim() }));
        setMessage('Excerpt generated!');
      }
    } catch (e: any) {
      setMessage(`AI Error: ${e.message}`);
    }
    setAiLoading(false);
  };

  const handleAIOutline = async () => {
    if (!form.title) {
      setMessage('Enter a title first');
      return;
    }
    setAiLoading(true);
    setMessage('Generating content outline...');
    try {
      const res = await fetch('/api/admin/ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'outline', input: form.title }),
      });
      const data = await res.json();
      if (data.result) {
        const cleaned = data.result
          .replace(/```html\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();
        setForm((prev) => ({ ...prev, content: cleaned }));
        setMessage('Content outline generated!');
      }
    } catch (e: any) {
      setMessage(`AI Error: ${e.message}`);
    }
    setAiLoading(false);
  };

  const insertImageToContent = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        const imgTag = `\n<img src="${data.url}" alt="${form.title || 'Blog image'}" class="img-fluid my-3" />\n`;
        setForm((prev) => ({ ...prev, content: prev.content + imgTag }));
        setMessage('Image inserted into content!');
      }
    } catch {
      setMessage('Image upload failed');
    }
  };

  return (
    <div>
      {message && (
        <div
          className={`alert ${
            message.includes('Error') || message.includes('error') || message.includes('failed')
              ? 'alert-danger'
              : 'alert-success'
          } alert-dismissible`}
        >
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage('')}
          ></button>
        </div>
      )}

      <div className="row">
        {/* Main column */}
        <div className="col-lg-8">
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-bold">Title</label>
            <input
              type="text"
              name="title"
              className="form-control form-control-lg"
              value={form.title}
              onChange={handleChange}
              placeholder="Blog post title"
            />
          </div>

          {/* Slug */}
          <div className="mb-3">
            <label className="form-label fw-bold">Slug</label>
            <div className="input-group">
              <span className="input-group-text">/blog/</span>
              <input
                type="text"
                name="slug"
                className="form-control"
                value={form.slug}
                onChange={handleChange}
                placeholder="url-friendly-slug"
              />
            </div>
          </div>

          {/* Content */}
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label fw-bold mb-0">Content (HTML)</label>
              <div>
                <label className="btn btn-sm btn-outline-secondary me-2">
                  <i className="bi bi-image"></i> Insert Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={insertImageToContent}
                    style={{ display: 'none' }}
                  />
                </label>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setPreview(!preview)}
                >
                  {preview ? 'Edit' : 'Preview'}
                </button>
              </div>
            </div>
            {preview ? (
              <div
                className="border rounded p-3 bg-white"
                style={{ minHeight: '400px' }}
                dangerouslySetInnerHTML={{ __html: form.content }}
              />
            ) : (
              <textarea
                name="content"
                className="form-control font-monospace"
                rows={20}
                value={form.content}
                onChange={handleChange}
                placeholder="<p>Write your blog content in HTML...</p>"
                style={{ fontSize: '0.85rem' }}
              />
            )}
          </div>

          {/* Excerpt */}
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label fw-bold mb-0">Excerpt</label>
              <button
                className="btn btn-sm btn-outline-info"
                onClick={handleAIExcerpt}
                disabled={aiLoading}
              >
                <i className="bi bi-robot"></i> AI Generate
              </button>
            </div>
            <textarea
              name="excerpt"
              className="form-control"
              rows={3}
              value={form.excerpt}
              onChange={handleChange}
              placeholder="Short description for blog listing..."
            />
          </div>
        </div>

        {/* Sidebar column */}
        <div className="col-lg-4">
          {/* Publish card */}
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="card-title fw-bold">Publish</h6>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="published"
                  checked={form.published}
                  onChange={handleChange}
                  id="publishCheck"
                />
                <label className="form-check-label" htmlFor="publishCheck">
                  Published
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label small">Author</label>
                <input
                  type="text"
                  name="author"
                  className="form-control form-control-sm"
                  value={form.author}
                  onChange={handleChange}
                />
              </div>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => handleSave()}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : blogId ? 'Update' : 'Save Draft'}
                </button>
                {!form.published && (
                  <button
                    className="btn btn-success"
                    onClick={() => handleSave(true)}
                    disabled={saving}
                  >
                    Publish
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Featured Image card */}
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="card-title fw-bold">Featured Image</h6>
              {form.featuredImage && (
                <img
                  src={form.featuredImage}
                  alt="Featured"
                  className="img-fluid rounded mb-2"
                />
              )}
              <input
                type="text"
                name="featuredImage"
                className="form-control form-control-sm mb-2"
                value={form.featuredImage}
                onChange={handleChange}
                placeholder="Image URL"
              />
              <label className="btn btn-sm btn-outline-secondary w-100 mb-2">
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
              </label>
              <hr />
              <small className="text-muted d-block mb-1">
                AI Image Generation (Gemini)
              </small>
              <div className="input-group input-group-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Describe the image..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                <button
                  className="btn btn-outline-info"
                  onClick={handleAIGenerateImage}
                  disabled={aiLoading}
                >
                  {aiLoading ? '...' : 'Generate'}
                </button>
              </div>
            </div>
          </div>

          {/* SEO card */}
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title fw-bold mb-0">SEO Settings</h6>
                <button
                  className="btn btn-sm btn-outline-info"
                  onClick={handleAISEO}
                  disabled={aiLoading}
                >
                  <i className="bi bi-robot"></i> AI Fill
                </button>
              </div>
              <div className="mb-2">
                <label className="form-label small">Meta Description</label>
                <textarea
                  name="metaDescription"
                  className="form-control form-control-sm"
                  rows={2}
                  value={form.metaDescription}
                  onChange={handleChange}
                  placeholder="SEO description (max 160 chars)"
                />
                <small className="text-muted">
                  {(form.metaDescription || '').length}/160
                </small>
              </div>
              <div className="mb-2">
                <label className="form-label small">Meta Keywords</label>
                <input
                  type="text"
                  name="metaKeywords"
                  className="form-control form-control-sm"
                  value={form.metaKeywords}
                  onChange={handleChange}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </div>
          </div>

          {/* Open Graph card */}
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="card-title fw-bold">Open Graph</h6>
              <div className="mb-2">
                <label className="form-label small">OG Title</label>
                <input
                  type="text"
                  name="ogTitle"
                  className="form-control form-control-sm"
                  value={form.ogTitle}
                  onChange={handleChange}
                  placeholder={form.title || 'OG Title'}
                />
              </div>
              <div className="mb-2">
                <label className="form-label small">OG Description</label>
                <textarea
                  name="ogDescription"
                  className="form-control form-control-sm"
                  rows={2}
                  value={form.ogDescription}
                  onChange={handleChange}
                  placeholder={form.excerpt || 'OG Description'}
                />
              </div>
              <div className="mb-2">
                <label className="form-label small">OG Image URL</label>
                <input
                  type="text"
                  name="ogImage"
                  className="form-control form-control-sm"
                  value={form.ogImage}
                  onChange={handleChange}
                  placeholder={form.featuredImage || 'https://...'}
                />
              </div>
              {/* OG Preview */}
              <div
                className="border rounded p-2 mt-2"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <small className="text-muted d-block mb-1">
                  Social Preview:
                </small>
                {(form.ogImage || form.featuredImage) && (
                  <img
                    src={form.ogImage || form.featuredImage}
                    alt="OG Preview"
                    className="img-fluid rounded mb-1"
                    style={{ maxHeight: '100px' }}
                  />
                )}
                <div className="fw-bold small">
                  {form.ogTitle || form.title || 'Page Title'}
                </div>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {form.ogDescription || form.excerpt || 'Page description...'}
                </div>
                <div className="text-success" style={{ fontSize: '0.7rem' }}>
                  rahn.co.za/blog/{form.slug || '...'}
                </div>
              </div>
            </div>
          </div>

          {/* AI Assistant card */}
          <div className="card mb-3">
            <div className="card-body">
              <h6 className="card-title fw-bold">
                <i className="bi bi-stars me-1"></i>
                AI Assistant
              </h6>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleAIOutline}
                  disabled={aiLoading}
                >
                  <i className="bi bi-list-stars me-1"></i> Generate Content
                  Outline
                </button>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleAIExcerpt}
                  disabled={aiLoading}
                >
                  <i className="bi bi-text-paragraph me-1"></i> Generate Excerpt
                </button>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={handleAISEO}
                  disabled={aiLoading}
                >
                  <i className="bi bi-search me-1"></i> Generate SEO Data
                </button>
              </div>
              {aiLoading && (
                <div className="text-center mt-2">
                  <div
                    className="spinner-border spinner-border-sm"
                    role="status"
                  ></div>
                  <small className="ms-2">AI is thinking...</small>
                </div>
              )}
            </div>
          </div>

          {/* AI Placeholder card */}
          <div className="card mb-3" style={{ borderStyle: 'dashed' }}>
            <div className="card-body text-center text-muted">
              <i
                className="bi bi-stars d-block mb-2"
                style={{ fontSize: '2rem' }}
              ></i>
              <h6 className="fw-bold">More AI Features Coming</h6>
              <small>
                Auto-translations, sentiment analysis, content scoring,
                predictive analytics, and automated social media posting coming
                soon.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
