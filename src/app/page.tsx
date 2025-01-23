import ChartForm from './components/ChartForm';

export default function Home() {
  return (
    <main className="pl-40 pt-10 min-h-screen bg-gradient-to-r from-gray-900 to-black text-white">
      <header className="mb-10">
        <h1 className="text-6xl font-bold mb-4 uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-500">
          Heart Rate
        </h1>
        <p className="text-lg md:text-xl leading-relaxed mb-6">
          Welcome to a space that allows you to watch real-time heart rate data.
        </p>
      </header>
      <div className="bg-black bg-opacity-70 px-6 py-1 rounded-lg shadow-lg">
        <ChartForm />
      </div>
    </main>
  );
}
