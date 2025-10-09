"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowRight,
  TrendingUp,
  Users,
  Zap,
  Globe,
  Shield,
  Target,
  CheckCircle,
  Building,
  Truck,
  Car,
  Lightbulb,
  MapPin,
  AlertTriangle,
  Smartphone,
  Database,
  Settings,
  DollarSign,
} from "lucide-react"
import { useState, useEffect, useMemo } from "react"

export function InvestorSection() {
  const [activeSection, setActiveSection] = useState("")
  const [activeStakeholder, setActiveStakeholder] = useState("insurers")
  const [selectedScenario, setSelectedScenario] = useState<"conservative" | "base" | "optimistic">("base")
  const [investmentAmount, setInvestmentAmount] = useState(350000)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    investmentRange: "",
    investorType: "",
    timeline: "",
  })

  const investmentScenarios = useMemo(() => {
    const taxRelief = investmentAmount * 0.5
    const netCost = investmentAmount - taxRelief

    return {
      conservative: {
        name: "Conservative",
        multiple: "3x",
        multiplier: 3,
        description: "Strategic acquisition by regional player",
        investment: investmentAmount,
        taxRelief: taxRelief,
        netCost: netCost,
        exitValue: investmentAmount * 3,
        grossProfit: investmentAmount * 3 - investmentAmount,
        netProfit: investmentAmount * 3 - netCost,
        netReturn: ((investmentAmount * 3) / netCost).toFixed(1) + "x",
        timeline: "3-4 years",
        color: "bg-blue-500",
      },
      base: {
        name: "Base Case",
        multiple: "5x",
        multiplier: 5,
        description: "Acquisition by major insurer or automotive group",
        investment: investmentAmount,
        taxRelief: taxRelief,
        netCost: netCost,
        exitValue: investmentAmount * 5,
        grossProfit: investmentAmount * 5 - investmentAmount,
        netProfit: investmentAmount * 5 - netCost,
        netReturn: ((investmentAmount * 5) / netCost).toFixed(1) + "x",
        timeline: "3-5 years",
        color: "bg-primary",
      },
      optimistic: {
        name: "Optimistic",
        multiple: "10x",
        multiplier: 10,
        description: "Series A funding or competitive acquisition",
        investment: investmentAmount,
        taxRelief: taxRelief,
        netCost: netCost,
        exitValue: investmentAmount * 10,
        grossProfit: investmentAmount * 10 - investmentAmount,
        netProfit: investmentAmount * 10 - netCost,
        netReturn: ((investmentAmount * 10) / netCost).toFixed(1) + "x",
        timeline: "4-5 years",
        color: "bg-emerald-500",
      },
    }
  }, [investmentAmount])

  const currentScenario = investmentScenarios[selectedScenario]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleInvestmentChange = (value: string) => {
    const numValue = Number.parseFloat(value.replace(/[^0-9.]/g, ""))
    if (!isNaN(numValue) && numValue >= 0) {
      setInvestmentAmount(numValue)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Investor form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Thank you for your interest! We'll be in touch within 24 hours.")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const navigationItems = [
    { id: "opportunity", label: "Opportunity", icon: TrendingUp },
    { id: "solution", label: "Solution", icon: Lightbulb },
    { id: "growth", label: "Growth & Traction", icon: MapPin },
    { id: "return", label: "Your Return", icon: DollarSign },
    { id: "invest", label: "Invest Now", icon: Target },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map((item) => item.id)
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const financialData = [
    { year: "2026", revenue: "£735,628", ebitda: "-£130,025", margin: "-18%" },
    { year: "2027", revenue: "£1,547,272", ebitda: "-£7,759", margin: "-1%" },
    { year: "2028", revenue: "£2,831,844", ebitda: "£464,239", margin: "16%" },
    { year: "2029", revenue: "£4,927,271", ebitda: "£1,132,670", margin: "23%" },
    { year: "2030", revenue: "£7,947,890", ebitda: "£2,057,564", margin: "26%" },
  ]

  const keyMetrics = [
    { icon: TrendingUp, label: "Live Bookings", value: "500+", subtitle: "Pre-funding", color: "text-primary" },
    {
      icon: Building,
      label: "National Suppliers",
      value: "4",
      subtitle: "Signed & Integrated",
      color: "text-secondary",
    },
    { icon: Zap, label: "Mobile Conversion", value: "60%", subtitle: "Quote to Booking", color: "text-tertiary" },
    { icon: Users, label: "Monthly Clicks", value: "946", subtitle: "SEO & PPC", color: "text-success" },
  ]

  const competitiveAdvantages = [
    "Instant AI Pricing",
    "Live Supplier API Integration",
    "Technician Match AI",
    "ADAS Damage Detection",
    "Real-time Network Effects",
  ]

  const supplyChainStakeholders = [
    {
      icon: Car,
      title: "Vehicle Owners",
      before: "Hours of searching, unclear pricing, risky delays",
      after: "Instant quote, trusted technician, same-day booking",
      delivered: [
        "Mobile-first quoting journey",
        "Verified technician network",
        "Multiple payment options (Stripe, Klarna, Clearpay)",
      ],
    },
    {
      icon: Users,
      title: "Technicians",
      before: "High ad spend for leads, wasted stock calls, no central job system",
      after: "Accept jobs, check stock, route to customers, and get paid instantly — all in one app",
      delivered: [
        "CRM & app with Google Maps API routing",
        "Live supplier stock checks",
        "Instant payout upon job completion",
      ],
    },
    {
      icon: Building,
      title: "Suppliers / Distributors",
      before: "Endless stock-check calls, delayed orders, limited reach",
      after: "Automated orders, direct visibility to technicians, promotional slots inside the platform",
      delivered: ["Supplier API integration", "Automated ordering system", "In-platform marketing"],
    },
    {
      icon: Truck,
      title: "Fleets & Trade",
      before: "Multiple vendors, slow scheduling, no central tracking",
      after: "Bulk bookings, live job tracking, flexible payment terms",
      delivered: ["Fleet/trade portal", "BNPL & direct debit", "Real-time progress tracking"],
    },
  ]

  const achievements = [
    "500+ live bookings processed in past 90 days",
    "Four national suppliers signed with API integrations",
    "SEO & PPC delivering 946 clicks/month, converting 60% of mobile quotes",
    "Technician scheduling app live with early adopter network onboarded",
    "Fleet/trade portal in beta with active pilot accounts",
    "First-mover advantage in market with no central aggregator",
  ]

  const teamMembers = [
    {
      name: "Mehrdad Khodabandi",
      role: "CEO",
      experience: "10+ years in e-commerce & digital transformation (MG Motors, Michelin)",
    },
    {
      name: "Thomas Brierley-Downs",
      role: "CMO",
      experience: "Global campaigns for Trivago, Apple; SEO & performance marketing",
    },
    { name: "James Lees", role: "CTO", experience: "SaaS & API architecture specialist" },
    { name: "Muhammad Ali", role: "Lead Tech", experience: "Full-stack development & platform engineering specialist" },
    { name: "Omid Haghighian", role: "Partnerships Director", experience: "Supplier network and distribution expert" },
  ]

  const executiveBoard = [
    {
      name: "Sarah Mitchell",
      role: "Non-Executive Director",
      experience: "Former VP of Operations at Autoglass, 20+ years in automotive aftermarket",
      isAdvisor: false,
    },
    {
      name: "David Chen",
      role: "Non-Executive Director",
      experience: "Serial entrepreneur with 3 successful exits in SaaS and marketplace platforms",
      isAdvisor: false,
    },
  ]

  const strategicAdvisors = [
    {
      name: "Dr. Emma Thompson",
      role: "Strategic Advisor",
      experience: "AI & Machine Learning expert, former Head of AI at major insurtech company",
      isAdvisor: true,
    },
    {
      name: "Robert Williams",
      role: "Strategic Advisor",
      experience: "Insurance industry veteran, 25+ years experience with major UK insurers",
      isAdvisor: true,
    },
  ]

  const roadmapItems = [
    {
      period: "2025 Q1–Q2",
      items: [
        "API V2 (multi-supplier pricing)",
        "Fleet/trade portals fully live",
        "Technician App V2 with payments & ADAS calibration booking",
      ],
    },
    {
      period: "2025 Q3–Q4",
      items: ["AI image quoting", "ADAS damage detection", "Ireland & Portugal launch"],
    },
    {
      period: "2026–2027",
      items: ["EU expansion", "White-label API for insurers", "ESG carbon offset reporting"],
    },
  ]

  const platformInterfaces = [
    {
      title: "Customer Quote & Booking Flow",
      subtitle: "Public Website",
      icon: Smartphone,
      color: "text-white",
      bgColor: "bg-primary",
      borderColor: "border-primary/20",
      features: [
        "New look and feel quote process with live pricing",
        "ARGIC generator for automatic code creation",
        "VRN lookup with auto vehicle details",
        "ADAS detection prompt",
        "Instant Clear Price AI quote",
        "Same-day / next-day time slots",
        "Secure online payment (Stripe, Klarna, Clearpay)",
      ],
      tagline: "Where the money starts",
    },
    {
      title: "Technician CRM & Mobile App",
      subtitle: "Job Dashboard & Mobile Portal",
      icon: Users,
      color: "text-white",
      bgColor: "bg-secondary",
      borderColor: "border-secondary/20",
      features: [
        "Mobile App & Portal - Run jobs from anywhere",
        "Account Manager - Business support",
        "Quotes & Jobs - Accept jobs & schedule",
        "Technician Match AI - Book more jobs faster",
        "Payments - Faster payouts",
        "Business Financing - Quick access to funds",
        "Vehicle GPS (Coming Soon)",
        "AI Technician Helper (Coming Soon)",
      ],
      tagline: "Where the jobs get done",
    },
    {
      title: "Trade Portal",
      subtitle: "Discount Glass Booking Software",
      icon: Building,
      color: "text-white",
      bgColor: "bg-tertiary",
      borderColor: "border-tertiary/20",
      features: [
        "Trade Discount Glass Booking Software",
        "Quick Quote - Auto generates ARGIC code",
        "Account Manager - Business support",
        "Clear Price AI - Instant pricing",
        "Online Bookings - Book more jobs faster",
        "Payments - Faster payouts",
        "WhatsApp Integration (Coming Soon)",
      ],
      tagline: "Where trade customers scale",
    },
    {
      title: "Supplier API Portal",
      subtitle: "Live Stock & Pricing Integration",
      icon: Database,
      color: "text-white",
      bgColor: "bg-success",
      borderColor: "border-success/20",
      features: [
        "API Integration - Real-time price and availability",
        "Real-time product stock & pricing feed",
        "Automated order placement",
        "Delivery ETA confirmation",
        "Supplier dashboard with order history",
        "Analytics and performance metrics",
      ],
      tagline: "Where the supply chain connects",
    },
    {
      title: "Insurance Integration Dashboard",
      subtitle: "API-Ready Claim Automation",
      icon: Shield,
      color: "text-white",
      bgColor: "bg-quinary",
      borderColor: "border-quinary/20",
      features: [
        "Integration Pending - MAG API link",
        "Instant quote & booking API endpoints",
        "Claim status tracking",
        "Automated invoice submission",
        "Audit trail of all communications",
        "Job updates in real-time",
      ],
      tagline: "Where enterprise contracts plug in",
    },
    {
      title: "Admin Control Panel",
      subtitle: "Platform-Wide Core Features",
      icon: Settings,
      color: "text-white",
      bgColor: "bg-quaternary",
      borderColor: "border-quaternary/20",
      features: [
        "CRM - Controls the entire ecosystem of operations",
        "Subscription Discounts & Offers",
        "AI Sales Agent - Never miss a call",
        "AI Customer Support Team - 24/7 assistance",
        "AI Damage Detection (Coming Soon)",
        "WhatsApp Communication (Coming Soon)",
      ],
      tagline: "Where everything is controlled",
    },
  ]

  const stakeholderData = {
    owners: {
      title: "Vehicle Owners",
      subtitle: "Instant quotes, trusted technicians, same-day booking",
      features: [
        "Mobile-first quoting journey with live pricing",
        "Verified technician network with ratings",
        "Multiple payment options (Stripe, Klarna, Clearpay)",
        "Real-time job tracking and updates",
      ],
    },
    technicians: {
      title: "Technicians",
      subtitle: "Accept jobs, check stock, route efficiently, get paid instantly",
      features: [
        "CRM & mobile app with Google Maps routing",
        "Live supplier stock checks and ordering",
        "Instant payout upon job completion",
        "AI-powered job matching and scheduling",
      ],
    },
    suppliers: {
      title: "Suppliers",
      subtitle: "Automated orders, direct visibility, promotional opportunities",
      features: [
        "Real-time API integration for stock and pricing",
        "Automated order placement and tracking",
        "In-platform marketing and promotional slots",
        "Analytics dashboard with performance metrics",
      ],
    },
    fleets: {
      title: "Fleets",
      subtitle: "Bulk bookings, live tracking, flexible payment terms",
      features: [
        "Fleet portal with bulk booking capabilities",
        "BNPL & direct debit payment options",
        "Real-time progress tracking across all jobs",
        "Dedicated account management and support",
      ],
    },
    insurers: {
      title: "Insurers",
      subtitle: "API-driven claims, cost savings, full visibility",
      features: [
        "Automated claims processing and validation",
        "Cost optimization algorithms and pricing",
        "Real-time claim tracking and updates",
        "Fraud detection tools and audit trails",
      ],
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Windscreen%20Compare%20Icon-6hayuQLqEE6bowJGkLv6pkIKhNXSAi.png"
                alt="Windscreen Compare"
                className="w-10 h-10 rounded-lg"
              />
              <div>
                <div className="font-semibold text-foreground text-lg tracking-tight">Windscreen Compare</div>
                <div className="text-xs text-muted-foreground">Investor Presentation</div>
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all rounded-lg ${
                    activeSection === item.id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            <Button className="bg-primary text-white hover:bg-primary/90 shadow-sm rounded-lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6">
        <section id="opportunity" className="py-24">
          <div className="max-w-5xl mx-auto text-center mb-20 animate-fade-up">
            <Badge className="mb-8 bg-primary/10 text-primary border-primary/20 hover:bg-primary/15 text-sm px-4 py-2 rounded-lg">
              £1.5 Billion Market Opportunity
            </Badge>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-[1.1] tracking-tight">
              Fill your pipeline with quality leads, <span className="text-gradient-primary">faster</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
              Reimagine windscreen replacement with the world's best B2B data, AI assistants, and automation
            </p>
            <div className="flex items-center justify-center gap-4 mt-10">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 shadow-sm text-base px-8 py-6 rounded-lg"
              >
                Get started for free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border border-border hover:bg-accent bg-transparent text-base px-8 py-6 rounded-lg"
              >
                Request a demo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 animate-fade-up stagger-1">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="border border-border hover-lift bg-white shadow-sm rounded-lg">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <metric.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2 tracking-tight">{metric.value}</div>
                  <div className="text-sm font-semibold text-foreground mb-1">{metric.label}</div>
                  <div className="text-xs text-muted-foreground">{metric.subtitle}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-foreground tracking-tight">
              The better way to build pipe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="animate-fade-up">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Pinpoint your perfect leads</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Find high-value customers with the most accurate & comprehensive B2B data on the planet
                </p>
              </div>
              <div className="animate-fade-up stagger-1">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Work smarter, not harder</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Use AI and automation to handle your outreach - whether as co-pilots or on full autopilot
                </p>
              </div>
              <div className="animate-fade-up stagger-2">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Hit your goals faster</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Streamline your work & deliver pipeline in days not weeks
                </p>
              </div>
              <div className="animate-fade-up stagger-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Simplify your tech stack</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Save $$ by finding, connecting, and winning leads all from one powerful platform
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="border border-border hover-lift bg-white rounded-lg">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-3">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <CardTitle className="text-2xl">An Outdated Industry</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Every year, <strong className="text-foreground">4 million UK windscreens</strong> are replaced through
                  a fragmented, manual process that wastes time and money across the entire supply chain
                </p>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Customers</strong> wait days for quotes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Technicians</strong> waste time chasing parts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Suppliers</strong> rely on manual orders
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span>
                      <strong className="text-foreground">Insurers</strong> deal with fragmented claims
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-border hover-lift bg-white rounded-lg">
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-2xl">Market Opportunity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">£1.5bn</div>
                    <div className="text-xs text-muted-foreground">UK TAM/year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">&lt;5%</div>
                    <div className="text-xs text-muted-foreground">Digital</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">40%+</div>
                    <div className="text-xs text-muted-foreground">B2B Origin</div>
                  </div>
                </div>
                <div className="p-4 bg-accent rounded-lg border border-border">
                  <p className="text-sm text-foreground">
                    Capturing just <strong>5% of the UK market</strong> translates to{" "}
                    <strong className="text-primary">£75M+ in GMV</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="solution" className="py-24 bg-muted">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-foreground">
                Pipeline that practically builds itself
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Everything you need to find, engage, and win leads is right here. Ready to get started?
              </p>
            </div>

            <div className="mb-20">
              <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Problems We Solve</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {supplyChainStakeholders.map((stakeholder, index) => (
                  <Card key={index} className="border border-border bg-white hover-lift rounded-lg">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <stakeholder.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{stakeholder.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                        <div className="text-xs font-semibold text-destructive mb-2 uppercase">Before</div>
                        <p className="text-sm text-muted-foreground">{stakeholder.before}</p>
                      </div>
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="text-xs font-semibold text-primary mb-2 uppercase">After</div>
                        <p className="text-sm text-foreground font-medium">{stakeholder.after}</p>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-3 uppercase">What We Built</div>
                        <ul className="space-y-2">
                          {stakeholder.delivered.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-4 text-foreground">Complete Platform Ecosystem</h3>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Six integrated platforms working together to automate the entire windscreen replacement supply chain
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platformInterfaces.map((platform, index) => (
                  <Card
                    key={index}
                    className="border border-border hover-lift overflow-hidden bg-white group rounded-lg"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`w-12 h-12 rounded-xl ${platform.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <platform.icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="outline" className="text-xs rounded-md">
                          {index < 4 ? "Live" : "Beta"}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mb-1">{platform.title}</CardTitle>
                      <p className="text-xs text-muted-foreground">{platform.subtitle}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="p-3 bg-accent/50 rounded-lg mb-4 border-l-4 border-primary">
                        <p className="text-sm font-medium text-foreground italic">{platform.tagline}</p>
                      </div>
                      <div className="space-y-2.5">
                        {platform.features.map((feature, i) => {
                          const isComingSoon = feature.includes("Coming Soon")
                          const isKeyFeature = i < 3 // First 3 features are key features
                          const cleanFeature = feature.replace(" (Coming Soon)", "")

                          return (
                            <div key={i} className="flex items-start gap-2.5 group/feature">
                              <div
                                className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                  isComingSoon ? "bg-muted" : isKeyFeature ? "bg-primary/10" : "bg-accent"
                                }`}
                              >
                                {isComingSoon ? (
                                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                                ) : (
                                  <CheckCircle
                                    className={`h-3 w-3 ${isKeyFeature ? "text-primary" : "text-muted-foreground"}`}
                                  />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <span
                                  className={`text-sm ${
                                    isComingSoon
                                      ? "text-muted-foreground"
                                      : isKeyFeature
                                        ? "text-foreground font-medium"
                                        : "text-muted-foreground"
                                  }`}
                                >
                                  {cleanFeature}
                                </span>
                                {isComingSoon && (
                                  <Badge variant="outline" className="ml-2 text-xs py-0 px-1.5 h-4 rounded-md">
                                    Soon
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Platform screenshots */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Platform in Action</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border border-border hover-lift bg-white overflow-hidden rounded-lg">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Smartphone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Consumer Website</div>
                        <div className="text-xs text-muted-foreground">Quote & Booking Flow</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/201.png-RETMKCdycf1yzE79mZojtbnBJmGRgb.jpeg"
                      alt="Consumer website interface"
                      className="w-full rounded-lg border border-border"
                    />
                    <ul className="mt-4 space-y-2">
                      <li className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        VRN lookup with auto vehicle details
                      </li>
                      <li className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Instant Clear Price AI quote
                      </li>
                      <li className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Same-day booking with secure payment
                      </li>
                    </ul>
                  </div>
                </Card>

                <Card className="border border-border hover-lift bg-white overflow-hidden rounded-lg">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Technician Platform</div>
                        <div className="text-xs text-muted-foreground">Job Management & Pricing</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/192.png-g8mYYhRul0DTWChC41FiUg9oaeOs5w.jpeg"
                      alt="Technician platform interface"
                      className="w-full rounded-lg border border-border"
                    />
                    <ul className="mt-4 space-y-2">
                      <li className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        3-step onboarding process
                      </li>
                      <li className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        Comprehensive job management
                      </li>
                      <li className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        AI-powered features and routing
                      </li>
                    </ul>
                  </div>
                </Card>
              </div>
            </div>

            {/* Key technology features */}
            <div>
              <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Core Technology</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-border hover-lift bg-white rounded-lg">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Clear Price AI</h3>
                    <p className="text-sm text-muted-foreground">Instant, transparent quotes with ADAS checks</p>
                  </CardContent>
                </Card>
                <Card className="border border-border hover-lift bg-white rounded-lg">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Technician Match AI</h3>
                    <p className="text-sm text-muted-foreground">Allocates jobs to the most qualified technician</p>
                  </CardContent>
                </Card>
                <Card className="border border-border hover-lift bg-white rounded-lg">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Database className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Supplier APIs</h3>
                    <p className="text-sm text-muted-foreground">Real-time stock and pricing confirmation</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="growth" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <Badge className="mb-6 bg-tertiary/10 text-tertiary border-tertiary/20 text-sm px-4 py-2 rounded-lg">
                Proven Traction
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">Traction & Growth</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">Proof, not promises</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="border border-border bg-white hover-lift overflow-hidden rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium text-muted-foreground">Live Bookings</div>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-md">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +127%
                    </Badge>
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">500+</div>
                  <div className="text-xs text-muted-foreground mb-4">Past 90 days</div>
                  <div className="h-12 flex items-end gap-1">
                    {[40, 55, 45, 60, 50, 70, 65, 80, 75, 90, 85, 100].map((height, i) => (
                      <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white hover-lift overflow-hidden rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium text-muted-foreground">National Suppliers</div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 rounded-md">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Integrated
                    </Badge>
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">4</div>
                  <div className="text-xs text-muted-foreground mb-4">API connections live</div>
                  <div className="space-y-2">
                    {[100, 100, 100, 100].map((width, i) => (
                      <div key={i} className="h-2 bg-primary/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white hover-lift overflow-hidden rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium text-muted-foreground">Monthly Traffic</div>
                    <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 rounded-md">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      SEO + PPC
                    </Badge>
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">946</div>
                  <div className="text-xs text-muted-foreground mb-4">Clicks per month</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Organic</div>
                      <div className="h-2 bg-accent rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Paid</div>
                      <div className="h-2 bg-accent rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "35%" }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white hover-lift overflow-hidden rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium text-muted-foreground">Mobile Conversion</div>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-md">
                      <Zap className="h-3 w-3 mr-1" />
                      High
                    </Badge>
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">60%</div>
                  <div className="text-xs text-muted-foreground mb-4">Quote to booking</div>
                  <div className="relative h-12">
                    <svg viewBox="0 0 100 40" className="w-full h-full">
                      <circle cx="50" cy="20" r="18" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                      <circle
                        cx="50"
                        cy="20"
                        r="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray="113"
                        strokeDashoffset="45"
                        className="text-primary"
                        transform="rotate(-90 50 20)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-foreground">
                      60%
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <Card className="border-primary/20 bg-primary/5 hover-lift rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">First-Mover Advantage</div>
                      <div className="text-sm text-muted-foreground">
                        No central aggregator exists in the UK windscreen market
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5 hover-lift rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Smartphone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">Technician App Live</div>
                      <div className="text-sm text-muted-foreground">
                        Early adopter network onboarded and actively using platform
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5 hover-lift rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-1">Fleet Portal Beta</div>
                      <div className="text-sm text-muted-foreground">
                        Active pilot accounts testing bulk booking capabilities
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial projections */}
            <Card className="border border-border bg-white rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl tracking-tight">Financial Projections</CardTitle>
                <p className="text-sm text-muted-foreground">Break-even in Year 3, 25%+ EBITDA margins by Year 5</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-4 text-sm font-medium text-muted-foreground">Year</th>
                        <th className="text-right py-4 text-sm font-medium text-muted-foreground">Revenue</th>
                        <th className="text-right py-4 text-sm font-medium text-muted-foreground">EBITDA</th>
                        <th className="text-right py-4 text-sm font-medium text-muted-foreground">Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financialData.map((row, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-4 font-medium text-foreground">{row.year}</td>
                          <td className="text-right py-4 text-foreground">{row.revenue}</td>
                          <td
                            className={`text-right py-4 ${row.ebitda.startsWith("-") ? "text-destructive" : "text-primary"}`}
                          >
                            {row.ebitda}
                          </td>
                          <td
                            className={`text-right py-4 ${row.margin.startsWith("-") ? "text-destructive" : "text-primary"}`}
                          >
                            {row.margin}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-24 bg-muted">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 rounded-lg">Leadership Team</Badge>
              <h2 className="text-5xl font-bold mb-6 text-foreground tracking-tight">Meet the Team</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Experienced founders with proven track records in automotive, tech, and digital transformation
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-foreground tracking-tight">Core Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <Card key={index} className="border border-border bg-white hover-lift rounded-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-xs rounded-lg">
                            {member.role}
                          </Badge>
                          <p className="text-sm text-muted-foreground leading-relaxed">{member.experience}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-foreground tracking-tight">Executive Board</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {executiveBoard.map((member, index) => (
                  <Card key={index} className="border border-border bg-white hover-lift rounded-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <Shield className="h-8 w-8 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                          <Badge className="mb-3 bg-secondary/10 text-secondary border-secondary/20 text-xs rounded-lg">
                            {member.role}
                          </Badge>
                          <p className="text-sm text-muted-foreground leading-relaxed">{member.experience}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-foreground tracking-tight">Strategic Advisors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {strategicAdvisors.map((member, index) => (
                  <Card key={index} className="border border-border bg-muted/30 hover-lift rounded-lg opacity-60">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <Users className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-muted-foreground mb-1">{member.name}</h3>
                          <Badge className="mb-3 bg-muted text-muted-foreground border-muted text-xs rounded-lg">
                            {member.role}
                          </Badge>
                          <p className="text-sm text-muted-foreground leading-relaxed">{member.experience}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Card className="border-primary/20 bg-primary/5 inline-block rounded-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-foreground">Combined Experience</div>
                      <div className="text-sm text-muted-foreground">
                        60+ years across automotive, e-commerce, SaaS, and insurance industries
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="return" className="py-24 bg-gradient-to-b from-white to-muted">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 rounded-lg">Investment Returns</Badge>
              <h2 className="text-5xl font-bold mb-6 text-foreground tracking-tight">Your Return Potential</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                SEIS-eligible investment with strong growth trajectory and clear exit strategy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <Card className="border-primary/20 bg-primary/5 rounded-lg">
                <CardContent className="p-6 text-center">
                  <Badge className="mb-3 bg-primary text-white rounded-lg">SEIS Benefit</Badge>
                  <div className="text-4xl font-bold text-primary mb-2">50%</div>
                  <div className="text-sm font-medium text-foreground mb-1">Income Tax Relief</div>
                  <div className="text-xs text-muted-foreground">Immediate tax rebate on investment</div>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-primary/5 rounded-lg">
                <CardContent className="p-6 text-center">
                  <Badge className="mb-3 bg-primary text-white rounded-lg">SEIS Benefit</Badge>
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm font-medium text-foreground mb-1">CGT Exemption</div>
                  <div className="text-xs text-muted-foreground">No capital gains tax on profits</div>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-primary/5 rounded-lg">
                <CardContent className="p-6 text-center">
                  <Badge className="mb-3 bg-primary text-white rounded-lg">SEIS Benefit</Badge>
                  <div className="text-4xl font-bold text-primary mb-2">50%</div>
                  <div className="text-sm font-medium text-foreground mb-1">Loss Relief</div>
                  <div className="text-xs text-muted-foreground">Tax relief on any losses</div>
                </CardContent>
              </Card>
              <Card className="border-primary/20 bg-primary/5 rounded-lg">
                <CardContent className="p-6 text-center">
                  <Badge className="mb-3 bg-primary text-white rounded-lg">SEIS Benefit</Badge>
                  <div className="text-4xl font-bold text-primary mb-2">£200k</div>
                  <div className="text-sm font-medium text-foreground mb-1">Annual Limit</div>
                  <div className="text-xs text-muted-foreground">Maximum SEIS investment per year</div>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-border bg-white mb-8 rounded-lg">
              <CardContent className="p-6">
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Label htmlFor="investment-amount" className="text-base font-semibold text-foreground">
                      Your Investment Amount
                    </Label>
                    <Badge variant="outline" className="text-xs rounded-lg">
                      SEIS Eligible
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {[10000, 25000, 50000, 100000, 200000, 350000].map((amount) => (
                      <Button
                        key={amount}
                        variant={investmentAmount === amount ? "default" : "outline"}
                        size="sm"
                        onClick={() => setInvestmentAmount(amount)}
                        className={investmentAmount === amount ? "bg-primary text-white" : ""}
                      >
                        {formatCurrency(amount)}
                      </Button>
                    ))}
                  </div>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">£</span>
                    <Input
                      id="investment-amount"
                      type="text"
                      value={investmentAmount.toLocaleString("en-GB")}
                      onChange={(e) => handleInvestmentChange(e.target.value)}
                      className="text-2xl font-bold pl-8 pr-4 py-6 text-center"
                      placeholder="350,000"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Select a preset amount or enter your own investment amount
                  </p>

                  <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="text-sm font-medium text-foreground mb-3 text-center">
                      SEIS Tax Benefits Breakdown
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground mb-1">Investment Amount</div>
                        <div className="font-semibold text-foreground">{formatCurrency(investmentAmount)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">Income Tax Relief (50%)</div>
                        <div className="font-semibold text-primary">-{formatCurrency(investmentAmount * 0.5)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">Net Cost to You</div>
                        <div className="font-semibold text-foreground">{formatCurrency(investmentAmount * 0.5)}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">CGT Exemption</div>
                        <div className="font-semibold text-primary">100%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight">Select Investment Scenario</h3>
                <p className="text-sm text-muted-foreground">
                  Click to explore different exit scenarios for your {formatCurrency(investmentAmount)} investment
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {(Object.keys(investmentScenarios) as Array<keyof typeof investmentScenarios>).map((key) => {
                  const scenario = investmentScenarios[key]
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedScenario(key)}
                      className={`flex-1 p-6 rounded-lg border-2 transition-all ${
                        selectedScenario === key
                          ? "border-primary bg-primary/5 shadow-lg scale-105"
                          : "border-border bg-white hover:border-primary/50 hover:shadow-md"
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground mb-1">{scenario.name}</div>
                        <div className="text-3xl font-bold text-foreground mb-2">{scenario.multiple}</div>
                        <div className="text-xs text-muted-foreground">{scenario.description}</div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <Card className="border border-border bg-white mb-8 rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl tracking-tight">
                  {currentScenario.name} Scenario ({currentScenario.multiple} Exit Multiple)
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Returns based on {formatCurrency(investmentAmount)} SEIS investment • {currentScenario.timeline}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                    <div>
                      <div className="font-medium text-foreground mb-1">Initial Investment</div>
                      <div className="text-sm text-muted-foreground">Your capital commitment</div>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {formatCurrency(currentScenario.investment)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <div>
                      <div className="font-medium text-foreground mb-1">SEIS Tax Relief (50%)</div>
                      <div className="text-sm text-muted-foreground">Immediate tax benefit</div>
                    </div>
                    <div className="text-2xl font-bold text-primary">-{formatCurrency(currentScenario.taxRelief)}</div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                    <div>
                      <div className="font-medium text-foreground mb-1">Net Investment Cost</div>
                      <div className="text-sm text-muted-foreground">After tax relief</div>
                    </div>
                    <div className="text-2xl font-bold text-foreground">{formatCurrency(currentScenario.netCost)}</div>
                  </div>
                  <div className="border-t border-border pt-6">
                    <div className="text-center mb-4">
                      <div className="text-sm text-muted-foreground mb-2">Projected Exit Value</div>
                    </div>
                    <div className={`p-8 ${currentScenario.color} rounded-lg text-center text-white`}>
                      <div className="text-sm opacity-90 mb-2">{currentScenario.description}</div>
                      <div className="text-5xl font-bold mb-2">{formatCurrency(currentScenario.exitValue)}</div>
                      <div className="text-lg opacity-90 mb-1">
                        Net Profit: {formatCurrency(currentScenario.netProfit)}
                      </div>
                      <div className="text-sm opacity-75 mb-4">
                        (Gross Profit: {formatCurrency(currentScenario.grossProfit)})
                      </div>
                      <div className="inline-block px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <div className="text-2xl font-bold">{currentScenario.netReturn}</div>
                        <div className="text-xs opacity-90">Return on Net Investment</div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                    <div className="text-center p-4 bg-accent rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Investment</div>
                      <div className="text-lg font-bold text-foreground">
                        {formatCurrency(currentScenario.investment)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="text-xs text-muted-foreground mb-1">Net Cost</div>
                      <div className="text-lg font-bold text-primary">{formatCurrency(currentScenario.netCost)}</div>
                    </div>
                    <div className="text-center p-4 bg-accent rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">Exit Value</div>
                      <div className="text-lg font-bold text-foreground">
                        {formatCurrency(currentScenario.exitValue)}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="text-xs text-muted-foreground mb-1">Net Profit</div>
                      <div className="text-lg font-bold text-primary">{formatCurrency(currentScenario.netProfit)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border border-border bg-white rounded-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl tracking-tight">SEIS Tax Benefits</CardTitle>
                    <Badge className="bg-primary text-white text-xs rounded-lg">Tax Efficient</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm flex items-center gap-2">
                        50% Income Tax Relief
                        <Badge variant="outline" className="text-xs rounded-lg">
                          Immediate
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Get back 50% of your investment as an income tax rebate
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm flex items-center gap-2">
                        100% CGT Exemption
                        <Badge variant="outline" className="text-xs rounded-lg">
                          On Exit
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Pay zero capital gains tax on all profits from your investment
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm flex items-center gap-2">
                        Loss Relief Available
                        <Badge variant="outline" className="text-xs rounded-lg">
                          Protection
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Claim 50% loss relief against income tax if investment fails
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm flex items-center gap-2">
                        CGT Reinvestment Relief
                        <Badge variant="outline" className="text-xs rounded-lg">
                          Deferral
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Defer capital gains tax from other investments
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl tracking-tight">Exit Strategy</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm">Strategic Acquisition</div>
                      <div className="text-xs text-muted-foreground">
                        Target: Major insurers, automotive groups, or tech platforms
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm">Series A Funding</div>
                      <div className="text-xs text-muted-foreground">
                        Scale to EU markets with institutional backing
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm">Secondary Sale</div>
                      <div className="text-xs text-muted-foreground">Liquidity options for early investors</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white rounded-lg">
                <CardHeader>
                  <CardTitle className="text-xl tracking-tight">Risk Mitigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm">Proven Traction</div>
                      <div className="text-xs text-muted-foreground">500+ bookings validate product-market fit</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm">Supplier Partnerships</div>
                      <div className="text-xs text-muted-foreground">4 national suppliers already integrated</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm">Experienced Team</div>
                      <div className="text-xs text-muted-foreground">Track record in automotive and tech sectors</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white rounded-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-xl tracking-tight">Investment Terms</CardTitle>
                    <Badge className="bg-primary text-white text-xs rounded-lg">SEIS</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm">£2M Pre-Money Valuation</div>
                      <div className="text-xs text-muted-foreground">
                        Fair valuation based on traction and market size
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm">£350k Raise Target</div>
                      <div className="text-xs text-muted-foreground">Funding for 18-month runway to profitability</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm">Equity Stake</div>
                      <div className="text-xs text-muted-foreground">
                        Proportional ownership with full voting rights
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="invest" className="py-24 bg-primary/5 border-y border-primary/10 -mx-6 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 rounded-lg">
              SEIS Investment Opportunity
            </Badge>
            <h2 className="text-5xl font-bold mb-6 text-balance leading-[1.1] tracking-tight text-foreground">
              Join us in rebuilding the vehicle glass industry
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed font-light">
              <strong className="text-foreground">£350,000 SEIS round</strong> to scale a proven platform already
              processing 500+ jobs with 4 national suppliers integrated
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
                <div className="text-3xl font-bold text-foreground mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Jobs Booked</div>
              </div>
              <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
                <div className="text-3xl font-bold text-foreground mb-1">4</div>
                <div className="text-sm text-muted-foreground">Suppliers</div>
              </div>
              <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
                <div className="text-3xl font-bold text-foreground mb-1">60%</div>
                <div className="text-sm text-muted-foreground">Conversion</div>
              </div>
              <div className="p-6 bg-white rounded-lg border border-border shadow-sm">
                <div className="text-3xl font-bold text-foreground mb-1">£2M</div>
                <div className="text-sm text-muted-foreground">Valuation</div>
              </div>
            </div>

            <Card className="border border-border bg-white text-left mb-8 shadow-sm rounded-lg">
              <CardHeader>
                <CardTitle className="text-center tracking-tight">Reserve Your Allocation</CardTitle>
                <p className="text-center text-muted-foreground text-sm">Get exclusive access to detailed financials</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="mt-1.5"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-1.5"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="investment-range" className="text-sm font-medium">
                        Investment Capacity
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("investmentRange", value)}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5k-25k">£5k - £25k</SelectItem>
                          <SelectItem value="25k-50k">£25k - £50k</SelectItem>
                          <SelectItem value="50k-100k">£50k - £100k</SelectItem>
                          <SelectItem value="100k+">£100k+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="investor-type" className="text-sm font-medium">
                        Investor Type
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("investorType", value)}>
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="angel">Angel Investor</SelectItem>
                          <SelectItem value="vc">VC Fund</SelectItem>
                          <SelectItem value="family-office">Family Office</SelectItem>
                          <SelectItem value="corporate">Corporate Investor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-white shadow-sm rounded-lg"
                  >
                    Reserve My Allocation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                className="border border-border hover:bg-accent bg-white text-foreground text-base px-8 py-6 rounded-lg"
              >
                Download Pitch Deck
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border border-border hover:bg-accent bg-white text-foreground text-base px-8 py-6 rounded-lg"
              >
                Schedule Investor Call
              </Button>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-foreground text-white py-16 -mx-6 px-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Windscreen%20Compare%20Icon-6hayuQLqEE6bowJGkLv6pkIKhNXSAi.png"
                alt="Windscreen Compare"
                className="w-10 h-10 rounded-xl"
              />
              <div>
                <div className="font-semibold text-white">Windscreen Compare</div>
                <div className="text-xs text-white/60">AI-Powered Windscreen Solutions</div>
              </div>
            </div>
            <div className="flex items-center gap-8 text-sm text-white/70">
              <a href="#" className="hover:text-white transition-colors">
                Platform
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Investment
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
            <div className="text-sm text-white/60">© 2025 Windscreen Compare Ltd.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
