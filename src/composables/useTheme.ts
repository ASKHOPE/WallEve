import { ref, onMounted, onUnmounted, watch } from 'vue';

type Theme = 'light' | 'dark';

const theme = ref<Theme>(getInitialTheme());
//Gets and stores the theme in local storage to maintain the interoperablity and state preservation of the theme.
function getInitialTheme(): Theme {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      return storedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light'; // Default for SSR or non-browser environments
}

//Eventlistener to check for the system theme 
function setupSystemThemeListener() {
  if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      // Only update if the user hasn't manually set a theme
      if (!localStorage.getItem('theme')) {
        theme.value = e.matches ? 'dark' : 'light';
      }
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }
  return () => {}; // No-op cleanup function
}

// Theme Logic to look for changes and update the theme
export function useTheme() {
  let removeListener: () => void;

  onMounted(() => {
    removeListener = setupSystemThemeListener();
  });

  onUnmounted(() => {
    removeListener?.();
  });

  watch(theme, (newTheme) => {
    if (typeof window !== 'undefined') {
      // Persist manual choice
      localStorage.setItem('theme', newTheme);
      // Update HTML class immediately (also done in App.vue, but good for direct use)
      document.documentElement.className = newTheme;
    }
  });

  //Toggles the theme

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  return {
    theme,
    toggleTheme,
  };
}
