"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import InterviewCard from "./interview-card"

const categories = [
  { id: "software", name: "Software", icon: "🔧" },
  { id: "data-science", name: "Data science", icon: "📊" },
  { id: "finance", name: "Finance", icon: "📈" },
  { id: "product", name: "Product", icon: "🧩" },
  { id: "consulting", name: "Consulting", icon: "👥" },
  { id: "writing", name: "Writing", icon: "📝" },
  { id: "legal", name: "Legal", icon: "⚖️" },
  { id: "marketing", name: "Marketing", icon: "📣" },
]

const interviews = [
  {
    id: "software-engineering",
    title: "Software Engineering",
    description: "New Grad E3: Technical interview #1",
    duration: 20,
    difficulty: "Medium",
    category: "software",
    backgroundColor: "bg-purple-100",
  },
  {
    id: "stacks-vs-queues",
    title: "Stacks vs Queues",
    description: "Learn the FIFO and LIFO flows",
    duration: 5,
    difficulty: "Medium",
    category: "software",
    backgroundColor: "bg-green-100",
  },
  {
    id: "hash-tables",
    title: "Hash Tables",
    description: "Master the magic of key-to-index storage",
    duration: 5,
    difficulty: "Medium",
    category: "software",
    backgroundColor: "bg-purple-100",
  },
  {
    id: "mvc-models",
    title: "MVC Models",
    description: "Explain this core design architecture",
    duration: 5,
    difficulty: "Medium",
    category: "software",
    backgroundColor: "bg-blue-100",
  },
  {
    id: "binary-search",
    title: "Binary Search",
    description: "Optimize search in sorted arrays",
    duration: 5,
    difficulty: "Easy",
    category: "software",
    backgroundColor: "bg-purple-100",
  },
  {
    id: "dynamic-programming",
    title: "Dynamic Programming",
    description: "Master complex optimization problems",
    duration: 15,
    difficulty: "Hard",
    category: "software",
    backgroundColor: "bg-blue-100",
  },
  {
    id: "system-design",
    title: "System Design",
    description: "Design scalable distributed systems",
    duration: 30,
    difficulty: "Hard",
    category: "software",
    backgroundColor: "bg-green-100",
  },
  {
    id: "react-hooks",
    title: "React Hooks",
    description: "Understand functional component state",
    duration: 10,
    difficulty: "Medium",
    category: "software",
    backgroundColor: "bg-purple-100",
  },
]

export default function InterviewListPage() {
  const [selectedCategory, setSelectedCategory] = useState("software")
  const [headerVisible, setHeaderVisible] = useState(true)
  const lastScrollY = useRef(0)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHeaderVisible(false)
      } else {
        setHeaderVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredInterviews = interviews.filter((interview) => interview.category === selectedCategory)

  return (
    <div className="min-h-screen px-24">
      {/* Header Section - This will hide on scroll */}
      <div
        ref={headerRef}
        className={`transition-all duration-300 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
          } sticky top-0 z-10 border-b`}
      >
        <div className="container py-8">
          <h1 className="text-5xl font-bold text-center">Software mock interviews</h1>
          <p className="text-center mt-4 max-w-2xl mx-auto">
            Practice with 100+ expert-vetted interviews, get feedback on your performance, and land your dream
            opportunity.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="border-b sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex space-x-4 min-w-max justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
              >
                <span className="text-xl mb-1">{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Interview Cards */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredInterviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
      </div>
    </div>
  )
}
