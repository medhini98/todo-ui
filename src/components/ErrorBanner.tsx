// src/components/ErrorBanner.tsx
interface Props {
  message: string;
}

export default function ErrorBanner({ message }: Props) {
  return (
    <div className="error" role="alert">
      {message}
    </div>
  );
}