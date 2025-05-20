import type { ChildrenProps } from '@/types';
import { ThemeProvider } from './theme-provider';

const GlobalProvider = ({ children }: ChildrenProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}

export default GlobalProvider