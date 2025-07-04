import { LoaderFunction, redirect} from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { Snippet } from '~/models/snippet.model';

const apiUrl = import.meta.env.VITE_API_URL;

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`${apiUrl}/snippets/${params.id}`);
  if (res.status === 400 || res.status === 404) {
    return redirect('/?notfound=1');
  }
  if (!res.ok) {
    throw new Response('Error loading snippet', { status: res.status });
  }
  const snippet: Snippet = await res.json();
  return snippet;
};

export default function SnippetDetail() {
  const snippet = useLoaderData<Snippet>();

  return (
    <div className="min-h-screen bg-[#f2f9f9] flex justify-center items-start p-12 font-sans">
      <div className="max-w-3xl w-full bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-2xl mb-4 text-[#003844] font-bold">Summary</h1>
        <p className="text-lg mb-8 text-[#003844]">{snippet.summary || '(no summary)'}</p>

        <h2 className="text-xl mb-2 text-gray-800 font-semibold">Complete text</h2>
        <pre className="bg-gray-100 text-[#003844] p-4 rounded-md whitespace-pre-wrap break-words text-base leading-relaxed">
          {snippet.text}
        </pre>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-block bg-[rgb(0_108_103)] text-white py-3 px-5 rounded-md font-bold no-underline hover:bg-[rgb(0_90_86)] transition-colors"
          >
            ← Back to snippets
          </Link>
        </div>
      </div>
    </div>
  );
}