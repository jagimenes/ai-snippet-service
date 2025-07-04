import {
  useLoaderData,
  useLocation,
  useNavigate,
} from '@remix-run/react';
import type { LoaderFunction, ActionFunction } from '@remix-run/node';
import { toast } from 'react-toastify';
import { useEffect, useMemo } from 'react';
import { Snippet } from '~/models/snippet.model';
import { CreateSnippetForm } from '~/components/create-snippet-form.component';

export type ActionResponse =
  | { success: true }
  | { error: string };

const apiUrl = import.meta.env.VITE_API_URL;

export const loader: LoaderFunction = async () => {
  const res = await fetch(`${apiUrl}/snippets`);
  if (!res.ok) throw new Response('Error loading snippets', { status: res.status });
  const snippets: Snippet[] = await res.json();
  return snippets;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const text = form.get('text');

  if (!text || typeof text !== 'string') {
    return { error: 'Text is required' };
  }

  const res = await fetch(`${apiUrl}/snippets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    return { error: 'Error creating snippet' };
  }

  return { success: true };
};

export default function Index() {
  const snippets = useLoaderData<Snippet[]>();
  const location = useLocation();
  const navigate = useNavigate();

  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const notFound = params.get('notfound');

  useEffect(() => {
    if (notFound) {
      toast.error('Snippet not found');

      params.delete('notfound');
      const newSearch = params.toString();
      const newPath = location.pathname + (newSearch ? `?${newSearch}` : '');
      navigate(newPath, { replace: true });
    }
  }, [location.pathname, notFound, navigate, params]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center font-sans p-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md mb-8">
        <h1 className="mb-4 text-2xl font-semibold text-[#003844]">Create new Snippet</h1>
        <CreateSnippetForm />
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        <h2 className="mb-2 text-xl font-semibold text-[#003844]">Existing Snippets</h2>

        {snippets.length === 0 ? (
          <p className="text-gray-500">No snippets found.</p>
        ) : (
          snippets.map((s) => (
            <div
              key={s._id}
              className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <a
                href={`/snippets/${s._id}`}
                className="text-lg font-medium text-[#003844] no-underline hover:underline"
              >
                {s.summary || '(no summary)'}
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}