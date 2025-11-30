export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Simple Banking System</h1>
        <p className="text-gray-600 mb-8">A beginner-friendly banking application</p>
        <a
          href="/login"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 inline-block"
        >
          Go to Login
        </a>
      </div>
    </main>
  );
}
