import {themeToggleHelper} from './helper/themeToggleHelper';

export default function ThemeToggle() {
  const {isDark, setIsDark} = themeToggleHelper();
  return (
    <button
      type="button"
      onClick={() => setIsDark(prev => !prev)}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex h-10 w-20 items-center rounded-full border border-gray-300 bg-gray-100 px-1 transition-colors dark:border-gray-700 dark:bg-gray-800">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg shadow-sm transition-transform duration-300 dark:bg-gray-950 ${
          isDark ? 'translate-x-10' : 'translate-x-0'
        }`}>
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
