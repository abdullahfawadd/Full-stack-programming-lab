import { AlertCircle, RefreshCw } from "lucide-react";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-[2rem] border border-red-100 bg-white p-10 text-center shadow-lg">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <AlertCircle size={26} />
      </div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-ink">
        Something went wrong
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-graphite">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        <RefreshCw size={16} />
        Try again
      </button>
    </div>
  );
}
