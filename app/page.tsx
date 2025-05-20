import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart, CheckCircle, Code, Users } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen px-24">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-8 h-8 rounded-md" />
            <span className="text-xl font-bold">Prepy</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-purple-600 transition-colors">
              How it works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-purple-600 transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
            <div className="inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 mb-4">
              YC S23 • Backed by top investors
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
              Ace your next interview with AI-powered preparation
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              Practice technical, behavioral, and system design interviews with our AI interviewer. Get real-time
              feedback and improve your skills.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/signup">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  Get started for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline">
                  See how it works
                </Button>
              </Link>
            </div>
            <div className="mt-8 text-sm text-muted-foreground">No credit card required • Free plan available</div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y py-10">
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-muted-foreground">TRUSTED BY CANDIDATES FROM TOP COMPANIES</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
            <div className="h-8 w-auto">Google</div>
            <div className="h-8 w-auto">Meta</div>
            <div className="h-8 w-auto">Amazon</div>
            <div className="h-8 w-auto">Microsoft</div>
            <div className="h-8 w-auto">Apple</div>
            <div className="h-8 w-auto">Netflix</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything you need to succeed</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive interview preparation tools designed to help you land your dream job.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col p-6  rounded-xl border shadow-sm">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Technical Interviews</h3>
              <p className="text-muted-foreground flex-grow">
                Practice coding challenges, algorithms, and data structures with real-time feedback.
              </p>
              <div className="mt-4 pt-4 border-t">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Multiple programming languages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Code execution & validation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Detailed explanations</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col p-6  rounded-xl border shadow-sm">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Behavioral Interviews</h3>
              <p className="text-muted-foreground flex-grow">
                Master the art of storytelling and showcase your soft skills with structured practice.
              </p>
              <div className="mt-4 pt-4 border-t">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">STAR method guidance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Company-specific questions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Personalized feedback</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col p-6  rounded-xl border shadow-sm">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">System Design</h3>
              <p className="text-muted-foreground flex-grow">
                Learn to design scalable systems and articulate your thought process clearly.
              </p>
              <div className="mt-4 pt-4 border-t">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Interactive whiteboarding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Architecture best practices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Real-world scenarios</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 ">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How Prepy works</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple three-step process to improve your interview skills
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Choose your interview</h3>
              <p className="text-muted-foreground">
                Select from technical, behavioral, or system design interviews with your preferred difficulty and
                duration.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Practice with AI</h3>
              <p className="text-muted-foreground">
                Engage in a realistic interview with our AI interviewer that adapts to your responses in real-time.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="rounded-full bg-purple-100 w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get detailed feedback</h3>
              <p className="text-muted-foreground">
                Receive personalized feedback, improvement suggestions, and track your progress over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What our users say</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful job seekers who landed their dream roles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col p-6  rounded-xl border shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full  w-12 h-12"></div>
                <div>
                  <p className="font-medium">Alex Johnson</p>
                  <p className="text-sm text-muted-foreground">Software Engineer at Google</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "Prepy helped me prepare for my Google interview in just two weeks. The technical practice sessions were
                incredibly similar to the actual interview questions I received."
              </p>
            </div>
            <div className="flex flex-col p-6  rounded-xl border shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full  w-12 h-12"></div>
                <div>
                  <p className="font-medium">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">Product Manager at Meta</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "The behavioral interview practice was a game-changer. I felt so much more confident articulating my
                experiences using the STAR method Prepy taught me."
              </p>
            </div>
            <div className="flex flex-col p-6  rounded-xl border shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="rounded-full  w-12 h-12"></div>
                <div>
                  <p className="font-medium">Michael Okonjo</p>
                  <p className="text-sm text-muted-foreground">Senior Engineer at Amazon</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                "System design interviews were always my weakness. Prepy's interactive sessions helped me understand the
                key principles and communicate my ideas effectively."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 ">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, transparent pricing</h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
              Start for free, upgrade when you're ready
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col p-6  rounded-xl border shadow-sm">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Free</h3>
                <p className="text-muted-foreground">For casual preparation</p>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">3 practice interviews/month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Basic feedback</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Community access</span>
                </li>
              </ul>
              <Link href="/signup">
                <Button className="w-full" variant="outline">
                  Get started
                </Button>
              </Link>
            </div>
            <div className="flex flex-col p-6 bg-gradient-to-b rounded-xl border border-purple-200 shadow-md relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold">Pro</h3>
                <p className="text-muted-foreground">For serious job seekers</p>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited interviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Detailed feedback & analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Company-specific preparation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Progress tracking</span>
                </li>
              </ul>
              <Link href="/signup">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                  Get started
                </Button>
              </Link>
            </div>
            <div className="flex flex-col p-6  rounded-xl border shadow-sm">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Enterprise</h3>
                <p className="text-muted-foreground">For teams & organizations</p>
              </div>
              <div className="mb-4">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Everything in Pro</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Team management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Custom interview questions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Dedicated support</span>
                </li>
              </ul>
              <Link href="/contact">
                <Button className="w-full" variant="outline">
                  Contact sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to ace your next interview?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of successful candidates who landed their dream jobs with Prepy.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white mt-4">
                Get started for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">No credit card required • Free plan available</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-auto">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-8 h-8 rounded-md"></div>
                <span className="text-xl font-bold">Prepy</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered interview preparation for ambitious professionals.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-purple-600 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-purple-600 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-600 transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-600 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-purple-600 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-600 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-600 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-600 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-purple-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-600 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2025 Prepy, Inc. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                <span className="sr-only">Twitter</span>
                Twitter
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                LinkedIn
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-purple-600 transition-colors">
                <span className="sr-only">GitHub</span>
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
