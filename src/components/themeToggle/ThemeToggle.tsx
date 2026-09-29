import {useToggleHelper} from './hook/useToggleHelper';

export default function ThemeToggle() {
  const {isDark, setIsDark} = useToggleHelper();

  return (
    <button
      type="button"
      onClick={() => setIsDark(prev => !prev)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-base transition-colors hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 sm:h-10 sm:w-20 sm:rounded-full">
      <span className="sm:hidden">{isDark ? '🌙' : '☀️'}</span>

      <span
        className={`hidden h-8 w-8 items-center justify-center rounded-full bg-white text-lg shadow-sm transition-transform duration-300 dark:bg-gray-950 sm:flex ${
          isDark ? 'translate-x-5' : '-translate-x-5'
        }`}>
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
