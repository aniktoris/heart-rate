import ChartForm from './components/ChartForm';

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto pt-20 min-h-screen">
      <header>
        <h1 className="text-5xl font-bold mb-6 uppercase tracking-wide">
          Heart Rate
        </h1>
        <p className="text-xl">
          Welcome to a space that allows you to watch real-time heart rate data.
        </p>
      </header>
      <ChartForm />
    </main>
  );
}
