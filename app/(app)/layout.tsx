import { Sidebar } from '@/components/sidebar'
import { ChildrenProps } from '@/types'

const AppLayout = ({ children }: ChildrenProps) => {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <div className="ml-[80px] flex-1">{children}</div>
    </main>
  )
}

export default AppLayout