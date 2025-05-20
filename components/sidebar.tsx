"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText, Home, Lock, Search, Settings, Video } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    {
      name: "Home",
      href: "/home",
      icon: Home,
    },
    {
      name: "Explore",
      href: "/explore",
      icon: Search,
    },
    {
      name: "Interviews",
      href: "/interview-list",
      icon: Video,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="fixed left-0 top-0 h-full w-[80px] border-r flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-8">
        <div className="h-12 w-12 rounded-xl flex items-center justify-center">
          <span className="font-bold text-2xl">P</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center gap-6 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center w-full px-2 py-2 text-xs ${isActive(item.href) ? "text-primary" : "hover:text-muted-foreground"
              }`}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="mt-auto">
        <Avatar className="h-10 w-10 rounded-xl">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
