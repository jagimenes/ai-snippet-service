import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type ActionResponse =
  | { success: true }
  | { error: string };

export function CreateSnippetForm() {
  const fetcher = useFetcher<ActionResponse>();
  const [text, setText] = useState('');
  const isSubmitting = fetcher.state === 'submitting';

  useEffect(() => {
    if (fetcher.data && 'success' in fetcher.data) {
      toast.success('Snippet successfully created!');
      setText('');
    }
    if (fetcher.data && 'error' in fetcher.data) {
      toast.error(fetcher.data.error);
    }
  }, [fetcher.data]);

  return (
    <fetcher.Form method="post" className="flex flex-col gap-4">
      <textarea
        name="text"
        rows={4}
        required
        placeholder="Type text to summarize..."
        className="p-4 text-base rounded-md border border-gray-300 resize-y bg-gray-100 text-[#003844] focus:outline-none focus:ring-2 focus:ring-[#006c67]"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={`self-start px-6 py-3 rounded-md font-bold text-white transition-colors
          ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#e0f2f1]'}`}
        style={{ backgroundColor: 'rgb(0 108 103)' }}
      >
        {isSubmitting ? 'Creating...' : 'Create Snippet'}
      </button>
    </fetcher.Form>
  );
}
