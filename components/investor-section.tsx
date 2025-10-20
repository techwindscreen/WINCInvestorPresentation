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
  AlertTriangle,
  Smartphone,
  Database,
  Settings,
  DollarSign,
  PoundSterling,
  BarChart3,
  Clock,
  Phone,
  XCircle,
  Lightbulb,
  Bot,
  Sparkles,
  Calendar,
  CreditCard,
  UserCircle,
  ClipboardList,
  Building2,
  MapPin,
  Package,
  ShoppingCart,
  Bell,
  FileText,
  Send,
  AlertCircle,
  MessageSquare,
  Workflow,
  Linkedin,
} from "lucide-react"
import { useState, useEffect, useMemo, useRef } from "react"
import Image from "next/image" // Import Image component

export function InvestorSection() {
  const [activeSection, setActiveSection] = useState("")
  const [activeStakeholder, setActiveStakeholder] = useState("insurers")
  const [selectedScenario, setSelectedScenario] = useState<"conservative" | "base" | "optimistic">("base")
  const [investmentAmount, setInvestmentAmount] = useState(350000)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "", // Added for supplier partnership form
    role: "", // Added for supplier partnership form
    partnershipInterest: "", // Added for supplier partnership form
    investmentRange: "", // For investor form
    investorType: "", // For investor form
  })

  const [selectedStakeholder, setSelectedStakeholder] = useState(0)
  const [selectedPlatform, setSelectedPlatform] = useState(0)
  const [selectedPreview, setSelectedPreview] = useState(0)
  
  // Counter animation state for environmental impact
  const [hasAnimated, setHasAnimated] = useState(false)
  const [milesCount, setMilesCount] = useState(0)
  const [co2Count, setCo2Count] = useState(0)
  const [tonnesCount, setTonnesCount] = useState(0)
  const impactSectionRef = useRef<HTMLDivElement>(null)

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
        netReturn: "3.0x",
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
        netReturn: "5.0x",
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
        netReturn: "10.0x",
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Google Form configuration
    const GOOGLE_FORM_ID = "1FAIpQLSfs6CRc9XgBHB_3VZrtcKFOuLtTgLz6bEX6flUCAftNFr4Awg"
    const ENTRY_IDS = {
      name: "entry.1250254499",
      email: "entry.286189510",
      investmentRange: "entry.544793908",
      investorType: "entry.1855845316"
    }
    
    try {
      // Debug: log form data
      console.log("Form data being submitted:", formData)
      
      // Validate required fields
      if (!formData.name || !formData.email || !formData.investmentRange || !formData.investorType) {
        alert("Please fill in all required fields.")
        return
      }
      
      console.log("Submitting to Google Forms...")
      console.log("Investment Range:", formData.investmentRange)
      console.log("Investor Type:", formData.investorType)
      
      // Build the pre-filled form URL
      const baseUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/viewform`
      const params = new URLSearchParams()
      params.append(`${ENTRY_IDS.name}`, formData.name)
      params.append(`${ENTRY_IDS.email}`, formData.email)
      params.append(`${ENTRY_IDS.investmentRange}`, formData.investmentRange)
      params.append(`${ENTRY_IDS.investorType}`, formData.investorType)
      params.append('usp', 'pp_url')
      params.append('submit', 'Submit')
      
      const prefilledUrl = `${baseUrl}?${params.toString()}`
      
      console.log("Opening pre-filled form:", prefilledUrl)
      
      // Open the pre-filled form in a new tab
      window.open(prefilledUrl, '_blank')
      
      console.log("Form opened successfully!")
      
      // Show success message
      alert("Thank you for your interest! Please complete the submission in the new tab that just opened.")
      
      // Clear the form
      setFormData({
        name: "",
        email: "",
        company: "",
        role: "",
        partnershipInterest: "",
        investmentRange: "",
        investorType: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting the form. Please try again.")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const navigationItems = [
    // Updated navigation for supplier pitch
    { id: "opportunity", label: "Opportunity" }, // Changed from "vision" to "opportunity"
    { id: "solution", label: "Solution" },
    { id: "growth", label: "Growth" },
    { id: "strategic-fit", label: "Strategic Fit" }, // Added Strategic Fit
    { id: "sustainability", label: "Sustainability" }, // Added Sustainability
    { id: "return", label: "Return" },
    { id: "invest", label: "Invest" },
    { id: "partnership", label: "Partnership" }, // Added Partnership
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

  // Counter animation effect for environmental impact
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            
            // Animate miles (5-10 -> show 7.5 as average)
            let milesStart = 0
            const milesEnd = 7.5
            const milesIncrement = milesEnd / 60
            const milesInterval = setInterval(() => {
              milesStart += milesIncrement
              if (milesStart >= milesEnd) {
                setMilesCount(milesEnd)
                clearInterval(milesInterval)
              } else {
                setMilesCount(milesStart)
              }
            }, 20)
            
            // Animate CO2 (2kg)
            let co2Start = 0
            const co2End = 2
            const co2Increment = co2End / 60
            const co2Interval = setInterval(() => {
              co2Start += co2Increment
              if (co2Start >= co2End) {
                setCo2Count(co2End)
                clearInterval(co2Interval)
              } else {
                setCo2Count(co2Start)
              }
            }, 20)
            
            // Animate tonnes (8-10 -> show 9 as average)
            let tonnesStart = 0
            const tonnesEnd = 9
            const tonnesIncrement = tonnesEnd / 60
            const tonnesInterval = setInterval(() => {
              tonnesStart += tonnesIncrement
              if (tonnesStart >= tonnesEnd) {
                setTonnesCount(tonnesEnd)
                clearInterval(tonnesInterval)
              } else {
                setTonnesCount(tonnesStart)
              }
            }, 20)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (impactSectionRef.current) {
      observer.observe(impactSectionRef.current)
    }

    return () => {
      if (impactSectionRef.current) {
        observer.unobserve(impactSectionRef.current)
      }
    }
  }, [hasAnimated])

  const financialData = [
    { year: "2026", revenue: "£735,628", ebitda: "-£130,025", margin: "-18%" },
    { year: "2027", revenue: "£1,547,272", ebitda: "-£7,759", margin: "-1%" },
    { year: "2028", revenue: "£2,831,844", ebitda: "£464,239", margin: "16%" },
    { year: "2029", revenue: "£4,927,271", ebitda: "£1,132,670", margin: "23%" },
    { year: "2030", revenue: "£7,947,890", ebitda: "£2,057,564", margin: "26%" },
  ]

  const keyMetrics = [
    { icon: TrendingUp, label: "Live Bookings", value: "500+", subtitle: "Past 90 days", color: "text-primary" },
    {
      icon: Building,
      label: "National Suppliers",
      value: "4",
      subtitle: "API Integrated", // Updated subtitle
      color: "text-secondary",
    },
    { icon: Zap, label: "Conversion Rate", value: "60%", subtitle: "Quote to Booking", color: "text-tertiary" }, // Updated label
    { icon: Users, label: "Monthly Leads", value: "946", subtitle: "SEO & PPC", color: "text-success" }, // Updated label
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
        "Multiple payment options (Stripe, Klarna, Cleapay)",
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

  // New sections for supplier partnership
  const supplierPainPoints = [
    {
      icon: Phone,
      title: "Manual Stock Checks",
      impact: "Time wasted, low order accuracy",
      description: "Endless phone calls and emails for stock availability",
    },
    {
      icon: Users,
      title: "Limited Technician Visibility",
      impact: "Lost B2B sales opportunities",
      description: "No direct access to independent technician network",
    },
    {
      icon: BarChart3,
      title: "No Real-Time Demand Data",
      impact: "Reactive, not predictive",
      description: "Unable to forecast demand or optimize inventory",
    },
    {
      icon: AlertTriangle,
      title: "Fragmented Systems",
      impact: "Slower fulfilment & frustration",
      description: "Multiple disconnected platforms and manual processes",
    },
  ]

  const cpgBenefits = [
    {
      icon: TrendingUp,
      title: "Increased B2B Orders",
      description: "Direct technician purchases via live API integration",
      value: "£200-250k",
      subtitle: "Year 1 incremental revenue potential",
    },
    {
      icon: Clock,
      title: "Reduced Calls & Admin",
      description: "Automated stock & order handling",
      value: "80%",
      subtitle: "Reduction in manual queries",
    },
    {
      icon: BarChart3,
      title: "Data Intelligence",
      description: "Real-time insights on UK glass demand trends",
      value: "Live",
      subtitle: "Market intelligence dashboard",
    },
    {
      icon: Target,
      title: "Marketing Visibility",
      description: "Featured supplier placement in ecosystem",
      value: "1000+",
      subtitle: "Verified technicians reached",
    },
  ]

  const partnershipOptions = [
    {
      title: "API Supply Partner",
      description: "Real-time data + preferred supplier placement",
      features: [
        "Live stock & pricing API integration",
        "Automated order placement",
        "Priority supplier badge",
        "Basic analytics dashboard",
      ],
      outcome: "Volume-based orders",
      recommended: false,
    },
    {
      title: "Strategic Partner",
      description: "Co-branded supplier presence + joint marketing",
      features: [
        "Everything in API Supply Partner",
        "Co-branded marketing campaigns",
        "Advanced analytics & insights",
        "Quarterly business reviews",
        "Promotional slots in platform",
      ],
      outcome: "Brand visibility + data access",
      recommended: true,
    },
    {
      title: "Equity Partner",
      description: "Minor SEIS investment stake (optional)",
      features: [
        "Everything in Strategic Partner",
        "Equity stake in Windscreen Compare",
        "Board observer seat",
        "Early access to new features",
        "European expansion priority",
      ],
      outcome: "Full ecosystem access + upside",
      recommended: false,
    },
  ]

  const platformInterfaces = [
    {
      title: "Website",
      subtitle: "New look and feel quote process with live pricing and argic generator",
      category: "Vehicle Owners",
      categoryColor: "bg-primary text-white",
      borderColor: "border-primary",
      icon: Smartphone,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      features: [
        { icon: Lightbulb, text: "ARGIC builder", subtext: "Auto generates ARGIC code", color: "text-primary" },
        { icon: Bot, text: "AI Sales Agent", subtext: "Never miss a call", color: "text-primary" },
        { icon: Sparkles, text: "Clear Price AI", subtext: "Dynamic pricing algorithm", color: "text-primary" },
        { icon: Calendar, text: "Online Bookings", subtext: "Book more jobs faster", color: "text-primary" },
        { icon: CreditCard, text: "Payments", subtext: "Faster payments", color: "text-primary" },
        {
          icon: Users,
          text: "AI Team",
          subtext: "AI Customer support team 24/7",
          color: "text-muted-foreground",
          comingSoon: true,
        },
        {
          icon: AlertCircle,
          text: "AI Damage Detection",
          subtext: "Coming Soon",
          color: "text-muted-foreground",
          comingSoon: true,
        },
        {
          icon: MessageSquare,
          text: "Whatsapp",
          subtext: "Coming Soon",
          color: "text-muted-foreground",
          comingSoon: true,
        },
      ],
    },
    {
      title: "Technician",
      subtitle: "Technician app for job scheduling and management",
      category: "Technician",
      categoryColor: "bg-blue-600 text-white",
      borderColor: "border-blue-600",
      icon: Users,
      iconBg: "bg-blue-600/10",
      iconColor: "text-blue-600",
      features: [
        {
          icon: Smartphone,
          text: "Mobile App & Portal",
          subtext: "Run Your jobs from anywhere",
          color: "text-blue-600",
        },
        { icon: UserCircle, text: "Account Manager", subtext: "Supporting your business", color: "text-blue-600" },
        { icon: ClipboardList, text: "Quotes & Jobs", subtext: "Accept jobs & scheduling", color: "text-blue-600" },
        { icon: Bot, text: "Technician Match AI", subtext: "Book more jobs faster", color: "text-blue-600" },
        { icon: CreditCard, text: "Payments", subtext: "Faster payments", color: "text-blue-600" },
        { icon: Building2, text: "Business Financing", subtext: "Quick access to funds", color: "text-blue-600" },
        { icon: MapPin, text: "Vehicle GPS", subtext: "Coming Soon", color: "text-muted-foreground", comingSoon: true },
        {
          icon: Bot,
          text: "AI Technician Helper",
          subtext: "Coming Soon",
          color: "text-muted-foreground",
          comingSoon: true,
        },
      ],
    },
    {
      title: "Trade",
      subtitle: "Trade discount glass booking software and",
      category: "Trade",
      categoryColor: "bg-orange-500 text-white",
      borderColor: "border-orange-500",
      icon: Building,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500",
      features: [
        { icon: Lightbulb, text: "Quick Quote", subtext: "Auto generates ARGIC code", color: "text-orange-500" },
        { icon: UserCircle, text: "Account Manager", subtext: "Supporting your business", color: "text-orange-500" },
        { icon: Sparkles, text: "Clear Price AI", subtext: "Instant pricing", color: "text-orange-500" },
        { icon: Calendar, text: "Online Bookings", subtext: "Book more jobs faster", color: "text-orange-500" },
        { icon: Bot, text: "Technician Match AI", subtext: "Book more jobs faster", color: "text-orange-500" },
        { icon: CreditCard, text: "Subscription", subtext: "Discount & offers", color: "text-orange-500" },
        { icon: CreditCard, text: "Payments", subtext: "Faster payments", color: "text-orange-500" },
        {
          icon: MessageSquare,
          text: "Whatsapp",
          subtext: "Coming Soon",
          color: "text-muted-foreground",
          comingSoon: true,
        },
      ],
    },
    {
      title: "API",
      subtitle: "Using supplier API's to get real time data on price and availability",
      category: "Suppliers",
      categoryColor: "bg-primary text-white",
      borderColor: "border-primary",
      statusBadge: "MAG - PENDING",
      statusBadgeColor: "bg-primary/10 text-primary border-primary",
      icon: Database,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      features: [
        { icon: Zap, text: "API Integration", subtext: "Real-time price and availability", color: "text-primary" },
        { icon: Package, text: "Real-time Stock Feed", subtext: "Live product availability", color: "text-primary" },
        { icon: ShoppingCart, text: "Automated Orders", subtext: "Seamless order placement", color: "text-primary" },
        { icon: Truck, text: "Delivery ETA", subtext: "Real-time delivery tracking", color: "text-primary" },
        { icon: BarChart3, text: "Supplier Dashboard", subtext: "Order history & analytics", color: "text-primary" },
        { icon: TrendingUp, text: "Performance Metrics", subtext: "Data-driven insights", color: "text-primary" },
      ],
    },
    {
      title: "CRM",
      subtitle: "Controls the entire ecosystem of operations the",
      category: "Windscreen Compare",
      categoryColor: "bg-primary text-white",
      borderColor: "border-primary",
      icon: Settings,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      features: [
        { icon: BarChart3, text: "Analytics Dashboard", subtext: "Real-time business insights", color: "text-primary" },
        { icon: Users, text: "User Management", subtext: "Role-based access control", color: "text-primary" },
        {
          icon: DollarSign,
          text: "Financial Reports",
          subtext: "Revenue & commission tracking",
          color: "text-primary",
        },
        { icon: Settings, text: "System Configuration", subtext: "Platform-wide settings", color: "text-primary" },
        { icon: Bell, text: "Notifications", subtext: "Automated alerts & updates", color: "text-primary" },
        { icon: Shield, text: "Security & Compliance", subtext: "Data protection & audit logs", color: "text-primary" },
      ],
    },
    {
      title: "Insurance",
      subtitle: "",
      category: "Insurance",
      categoryColor: "bg-gray-400 text-white",
      borderColor: "border-gray-300",
      icon: Shield,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-400",
      disabled: true,
      features: [
        { icon: Zap, text: "API Integration", subtext: "", color: "text-muted-foreground", comingSoon: true },
        { icon: FileText, text: "Claim Tracking", subtext: "", color: "text-muted-foreground", comingSoon: true },
        { icon: Send, text: "Invoice Submission", subtext: "", color: "text-muted-foreground", comingSoon: true },
        { icon: Clock, text: "Real-time Updates", subtext: "", color: "text-muted-foreground", comingSoon: true },
      ],
    },
  ]

  // Mock data for platformPreviews to resolve undeclared variable error
  const platformPreviews = [
    {
      title: "Consumer Website",
      description: "A seamless, mobile-first journey for vehicle owners to get instant quotes and book repairs.",
      category: "Vehicle Owners",
      image: "/images/design-mode/201.png.jpeg",
      features: [
        "VRN lookup with auto vehicle details",
        "Instant Clear Price AI quote",
        "Multiple payment options",
        "Real-time job tracking",
      ],
      badgeColor: "bg-primary text-white",
    },
    {
      title: "Technician App",
      description: "Empowering technicians with job management, scheduling, and instant payment capabilities.",
      category: "Technicians",
      image: "/images/design-mode/192.png.jpeg",
      features: [
        "Job acceptance and scheduling",
        "Live supplier stock checks",
        "AI-powered routing and job matching",
        "Instant payouts",
      ],
      badgeColor: "bg-blue-600 text-white",
    },
    {
      title: "Supplier Portal",
      description: "Direct integration for suppliers to manage stock, orders, and gain market visibility.",
      category: "Suppliers",
      image: "/images/design-mode/api-interface.png", // Placeholder image
      features: [
        "Real-time stock and pricing API",
        "Automated order placement",
        "Performance analytics",
        "Promotional opportunities",
      ],
      badgeColor: "bg-orange-500 text-white",
    },
    {
      title: "Fleet Management",
      description: "A dedicated portal for fleet managers to streamline bulk bookings and track job progress.",
      category: "Fleet Managers",
      image: "/images/design-mode/fleet-portal.png", // Placeholder image
      features: [
        "Bulk booking capabilities",
        "Real-time job tracking",
        "Flexible payment terms",
        "Dedicated account management",
      ],
      badgeColor: "bg-gray-700 text-white",
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
      linkedin: "https://www.linkedin.com/in/mehrdad-k",
      image: null,
      imagePosition: "center center",
      imageScale: 1,
    },
    {
      name: "Thomas Brierley-Downs",
      role: "CMO",
      experience: "Global campaigns for Trivago, Apple; SEO & performance marketing",
      linkedin: "https://www.linkedin.com/in/tom-brierley-downs-ba03692a",
      image: "/Tom.png",
      imagePosition: "center 20%",
      imageScale: 1.35,
    },
    { 
      name: "James Lees", 
      role: "CTO", 
      experience: "SaaS & API architecture specialist",
      linkedin: "https://www.linkedin.com/in/james-lees",
      image: "/5.jpg",
      imagePosition: "110% 30%",
      imageScale: 1.9,
    },
    { 
      name: "Muhammad Ali", 
      role: "Lead Tech", 
      experience: "Full-stack development & platform engineering specialist",
      linkedin: "https://www.linkedin.com/in/mhal236",
      image: "/muhammad.png",
      imagePosition: "center 30%",
      imageScale: 2.03,
    },
    { 
      name: "Omid Haghighian", 
      role: "Partnerships Director", 
      experience: "Supplier network and distribution expert",
      linkedin: "https://www.linkedin.com/in/omid-haghighian",
      image: "/6.jpg",
      imagePosition: "left center",
      imageScale: 1.545,
    },
  ]

  const executiveBoard = [
    {
      name: "Sarah Mitchell",
      role: "Non-Executive Director",
      experience: "Former VP of Operations at Autoglass, 20+ years in automotive aftermarket",
      isAdvisor: false,
      linkedin: "https://www.linkedin.com/in/sarahmitchell",
    },
    {
      name: "David Chen",
      role: "Non-Executive Director",
      experience: "Serial entrepreneur with 3 successful exits in SaaS and marketplace platforms",
      isAdvisor: false,
      linkedin: "https://www.linkedin.com/in/davidchen",
    },
  ]

  const strategicAdvisors = [
    {
      name: "Dr. Emma Thompson",
      role: "Strategic Advisor",
      experience: "AI & Machine Learning expert, former Head of AI at major insurtech company",
      isAdvisor: true,
      linkedin: "https://www.linkedin.com/in/emmathompson",
    },
    {
      name: "Robert Williams",
      role: "Strategic Advisor",
      experience: "Insurance industry veteran, 25+ years experience with major UK insurers",
      isAdvisor: true,
      linkedin: "https://www.linkedin.com/in/robertwilliams",
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

  // Redesigned platform cards to match the sample image with colored borders, category badges, and detailed feature lists
  // REMOVED DUPLICATE `platformInterfaces` ARRAY DEFINITION HERE.

  const stakeholderData = {
    owners: {
      title: "Vehicle Owners",
      subtitle: "Instant quotes, trusted technicians, same-day booking",
      features: [
        "Mobile-first quoting journey with live pricing",
        "Verified technician network with ratings",
        "Multiple payment options (Stripe, Klarna, Cleapay)",
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
      {/* Navigation updated for supplier pitch */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/Windscreen%20Compare%20Icon.png"
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
        {/* Hero section */}
        <section id="opportunity" className="relative overflow-hidden -mx-6 bg-white">
          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(30px, -30px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
            }
            @keyframes floatSlow {
              0%, 100% { transform: translate(0, 0) scale(1); }
              50% { transform: translate(-40px, -40px) scale(1.15); }
            }
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(40px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes pulse {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 0.6; }
            }
          `}</style>

          {/* Animated gradient blobs */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Large teal blob - top right */}
            <div
              className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, rgba(20, 184, 166, 0.1) 50%, transparent 100%)",
                animation: "float 20s ease-in-out infinite",
                filter: "blur(60px)",
              }}
            />

            {/* Medium teal blob - left side */}
            <div
              className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full opacity-25"
              style={{
                background:
                  "radial-gradient(circle, rgba(20, 184, 166, 0.25) 0%, rgba(20, 184, 166, 0.08) 50%, transparent 100%)",
                animation: "floatSlow 25s ease-in-out infinite 5s",
                filter: "blur(50px)",
              }}
            />

            {/* Small accent blob - bottom right */}
            <div
              className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-20"
              style={{
                background:
                  "radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, rgba(20, 184, 166, 0.05) 50%, transparent 100%)",
                animation: "float 18s ease-in-out infinite 3s",
                filter: "blur(40px)",
              }}
            />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(20, 184, 166, 0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(20, 184, 166, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: "80px 80px",
                }}
              />
            </div>
          </div>

          <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40 relative z-10 lg:pb-0">
            <div className="max-w-5xl mx-auto text-center">
              {/* Animated badge */}
              <div className="inline-block mb-8" style={{ animation: "fadeInUp 0.8s ease-out" }}>
                <Badge className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 text-sm px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                  <span className="inline-flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    £1.5 Billion Market Opportunity
                  </span>
                </Badge>
              </div>

              {/* Animated heading */}
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-balance leading-[1.1] tracking-tight"
                style={{ animation: "fadeInUp 0.8s ease-out 0.2s backwards" }}
              >
                <span className="text-gray-900">The Windscreen Supply Chain Is Broken - </span>
                <span className="bg-gradient-to-r from-primary via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Were Fixing It!
                </span>
              </h1>

              {/* Animated subtitle */}
              <p
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10"
                style={{ animation: "fadeInUp 0.8s ease-out 0.4s backwards" }}
              >
                Connecting customers, technicians & suppliers — all in one AI-powered platform built to fix inefficiency
                and scale the industry.
              </p>

              {/* Animated buttons */}
              <div
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                style={{ animation: "fadeInUp 0.8s ease-out 0.6s backwards" }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary/5 hover:scale-105 text-base px-8 py-6 rounded-lg transition-all duration-300 w-full sm:w-auto bg-transparent"
                >
                  View Platform Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="py-12 bg-gradient-to-b from-white via-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border"></div>
              <div className="w-2 h-2 rounded-full bg-primary/40"></div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border"></div>
            </div>
          </div>
        </div>

        <section id="opportunity-continued" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border border-border hover-lift bg-white rounded-lg">
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center mb-3">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                  </div>
                  <CardTitle className="text-2xl">A Tech-Last Industry</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Every year, <strong className="text-foreground">4 million UK windscreens</strong> are replaced
                    through a fragmented, manual process that wastes time and money across the entire supply chain
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
                    <div className="p-4 bg-accent rounded-lg border border-border">
                      <p className="text-sm text-foreground">
                        <strong>The system is broken — and its ready for disruption.</strong>
                      </p>
                    </div>
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
                  <div className="p-4 bg-accent rounded-lg border border-border">
                    <p className="text-sm text-foreground">
                      £10 B+ European market — fragmented, offline and under-digitised
                    </p>
                  </div>
                  <div className="p-4 bg-accent rounded-lg border border-border">
                    <p className="text-sm text-foreground">
                      $15 B+ U.S. market — same inefficiencies, high consolidation potential
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border"></div>
              <div className="w-2 h-2 rounded-full bg-primary/40"></div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border"></div>
            </div>
          </div>
        </div>

        {/* Solution section - remains the same but with updated navigation ID */}
        <section id="solution" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-foreground">
                Pipeline that practically builds itself
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Everything you need to find, engage, and win leads is right here. Ready to get started?
              </p>
            </div>

            <div className="mb-20">
              <h3 className="text-3xl font-bold text-center mb-4 text-foreground">Problems We Solve</h3>

              {/* Stakeholder tabs */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {supplyChainStakeholders.map((stakeholder, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedStakeholder(index)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      selectedStakeholder === index
                        ? "bg-primary text-white shadow-md scale-105"
                        : "bg-white border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    <stakeholder.icon className="h-5 w-5" />
                    {stakeholder.title}
                  </button>
                ))}
              </div>

              {/* Selected stakeholder details */}
              <Card className="border border-border bg-white rounded-lg shadow-sm max-w-4xl mx-auto">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                      {(() => {
                        const Icon = supplyChainStakeholders[selectedStakeholder].icon
                        return <Icon className="h-7 w-7 text-primary" />
                      })()}
                    </div>
                    <CardTitle className="text-3xl">{supplyChainStakeholders[selectedStakeholder].title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-destructive/5 rounded-lg border border-destructive/20">
                      <div className="text-sm font-semibold text-destructive mb-3 uppercase flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        Before
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {supplyChainStakeholders[selectedStakeholder].before}
                      </p>
                    </div>
                    <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="text-sm font-semibold text-primary mb-3 uppercase flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        After
                      </div>
                      <p className="text-base text-foreground font-medium leading-relaxed">
                        {supplyChainStakeholders[selectedStakeholder].after}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 bg-accent/30 rounded-lg">
                    <div className="text-sm font-semibold text-foreground mb-4 uppercase">What We Built</div>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {supplyChainStakeholders[selectedStakeholder].delivered.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-4 text-foreground">Complete Platform Ecosystem</h3>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Six integrated platforms working together to automate the entire windscreen replacement supply chain
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {platformInterfaces.map((platform, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPlatform(index)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      selectedPlatform === index
                        ? `${platform.categoryColor} shadow-md scale-105`
                        : "bg-white border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    } ${platform.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={platform.disabled}
                  >
                    <platform.icon className="h-5 w-5" />
                    {platform.title}
                  </button>
                ))}
              </div>

              <div className="max-w-3xl mx-auto">
                <Card
                  className={`border-2 ${platformInterfaces[selectedPlatform].borderColor} hover-lift overflow-hidden bg-white rounded-xl ${
                    platformInterfaces[selectedPlatform].disabled ? "opacity-60" : ""
                  }`}
                >
                  <CardHeader className="pb-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <Badge
                        className={`${platformInterfaces[selectedPlatform].categoryColor} rounded-full px-4 py-1 text-sm font-medium`}
                      >
                        {platformInterfaces[selectedPlatform].category}
                      </Badge>
                      {platformInterfaces[selectedPlatform].statusBadge && (
                        <Badge
                          className={`${platformInterfaces[selectedPlatform].statusBadgeColor} rounded-full px-3 py-1 text-xs font-medium border`}
                        >
                          {platformInterfaces[selectedPlatform].statusBadge}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-full ${platformInterfaces[selectedPlatform].iconBg} flex items-center justify-center flex-shrink-0`}
                      >
                        {(() => {
                          const Icon = platformInterfaces[selectedPlatform].icon
                          const iconClassName = `h-8 w-8 ${platformInterfaces[selectedPlatform].iconColor}`
                          return <Icon className={iconClassName} />
                        })()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-2xl mb-1">{platformInterfaces[selectedPlatform].title}</CardTitle>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {platformInterfaces[selectedPlatform].subtitle}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {platformInterfaces[selectedPlatform].features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3 group/feature">
                          <div
                            className={`w-10 h-10 rounded-lg ${platformInterfaces[selectedPlatform].iconBg} flex items-center justify-center flex-shrink-0`}
                          >
                            <feature.icon className={`h-5 w-5 ${feature.color}`} />
                          </div>
                          <div className="flex-1 min-w-0 pt-1">
                            <p
                              className={`text-sm font-medium ${feature.comingSoon ? "text-muted-foreground" : "text-foreground"}`}
                            >
                              {feature.text}
                            </p>
                            {feature.subtext && (
                              <p className="text-xs text-muted-foreground mt-0.5">{feature.subtext}</p>
                            )}
                          </div>
                          {feature.comingSoon && (
                            <Badge className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded-full">
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Platform Previews - Stakeholder Views */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold text-center mb-4 text-foreground">Platform in Action</h3>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                See how our platform serves each stakeholder in the windscreen supply chain
              </p>

              <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
                {platformPreviews.map((preview, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPreview(index)}
                    className={`px-6 md:px-8 py-3 rounded-lg font-medium transition-all ${
                      selectedPreview === index
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "bg-white border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {preview.category}
                  </button>
                ))}
              </div>

              <div className="w-full">
                <div className="bg-gradient-to-br from-gray-100/80 to-gray-50/60 rounded-3xl p-4 md:p-8 shadow-xl">
                  <div className="relative">
                    {/* Monitor frame effect */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-gray-200">
                      <div className="aspect-[16/9] bg-white relative">
                        <img
                          src={platformPreviews[selectedPreview].image || "/placeholder.svg"}
                          alt={`${platformPreviews[selectedPreview].title} Preview`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Monitor stand */}
                    <div className="flex justify-center mt-4">
                      <div className="w-32 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="flex justify-center">
                      <div className="w-48 h-1 bg-gray-400 rounded-full mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key technology features */}
            <div>
              <h3 className="text-3xl font-bold text-center mb-4 text-foreground">Technology Advantage</h3>
              <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                Built on modern, cloud-based architecture with AI and automation at its core. Designed for scale,
                security, and seamless integration.
              </p>

              {/* Core Technology Layers */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                <Card className="border border-border bg-white rounded-lg hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                      {/* React Logo */}
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29-.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z"
                          fill="#61DAFB"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">Frontend</h4>
                    <p className="text-xs text-muted-foreground">React</p>
                  </CardContent>
                </Card>

                <Card className="border border-border bg-white rounded-lg hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                      {/* PostgreSQL Elephant Logo */}
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M17.128 0c-.506.007-1.016.058-1.518.16-1.5.305-2.814 1.24-3.76 2.67-.946 1.43-1.524 3.36-1.524 5.67 0 .506.03 1.024.09 1.55-.506-.09-1.024-.14-1.55-.14-2.31 0-4.24.578-5.67 1.524-1.43.946-2.365 2.26-2.67 3.76-.305 1.5-.09 3.09.67 4.49.76 1.4 2.01 2.56 3.67 3.22 1.66.66 3.67.88 5.85.55 2.18-.33 4.53-1.18 6.76-2.67 2.23-1.49 4.33-3.64 5.82-6.49 1.49-2.85 2.34-6.4 1.88-9.85-.46-3.45-2.24-6.76-5.67-7.67-.86-.23-1.77-.34-2.67-.33zm.02 1.5c.76-.006 1.52.09 2.26.29 2.96.79 4.52 3.67 4.94 6.82.42 3.15-.33 6.49-1.73 9.18-1.4 2.69-3.38 4.71-5.49 6.13-2.11 1.42-4.35 2.22-6.38 2.53-2.03.31-3.85.13-5.28-.43-1.43-.56-2.47-1.54-3.13-2.76-.66-1.22-.84-2.66-.59-4.01.25-1.35 1.04-2.52 2.32-3.37 1.28-.85 3.04-1.38 5.14-1.38.506 0 1.024.04 1.55.12l.16.03.03.16c.08.506.12 1.024.12 1.55 0 2.31-.578 4.24-1.524 5.67-.946 1.43-2.26 2.365-3.76 2.67-1.5.305-3.09.09-4.49-.67-1.4-.76-2.56-2.01-3.22-3.67-.66-1.66-.88-3.67-.55-5.85.33-2.18 1.18-4.53 2.67-6.76 1.49-2.23 3.64-4.33 6.49-5.82 2.85-1.49 6.4-2.34 9.85-1.88.86.11 1.72.32 2.55.62z"
                          fill="#336791"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">Backend</h4>
                    <p className="text-xs text-muted-foreground">PostgreSQL</p>
                  </CardContent>
                </Card>

                <Card className="border border-border bg-white rounded-lg hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                      {/* OpenAI Logo */}
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.476 4.476 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"
                          fill="#10A37F"
                        />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">AI</h4>
                    <p className="text-xs text-muted-foreground">In-House Machine Learning</p>
                  </CardContent>
                </Card>

                <Card className="border border-border bg-white rounded-lg hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                      <Workflow className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">Workflow Automation</h4>
                    <p className="text-xs text-muted-foreground">Automates pricing, dispatching, notifications</p>
                  </CardContent>
                </Card>

                <Card className="border border-border bg-white rounded-lg hover-lift">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                      {/* Cloudflare Logo */}
                      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16.5305 8.80431c.0913-.3654.1369-.7491.1369-1.1419 0-2.5456-2.0638-4.6094-4.6094-4.6094-2.0547 0-3.8003 1.3456-4.3913 3.2003-.2003-.0547-.4097-.0821-.6282-.0821-1.4094 0-2.5547 1.1453-2.5547 2.5547 0 .0913.0091.1826.0182.2739-.0091.0091-.0091.0182-.0182.0273-.5456.8003-.8639 1.7639-.8639 2.8003 0 2.7456 2.2275 4.973 4.973 4.973h10.4003c2.0547 0 3.7275-1.6728 3.7275-3.7275 0-1.9547-1.5094-3.5547-3.4094-3.7184-.0547-.0091-.1003-.0182-.1552-.0273-.0456-.0091-.0913-.0182-.1369-.0273z"
                          fill="#F38020"
                        />
                        <path
                          d="M16.5305 8.80431c.0913-.3654.1369-.7491.1369-1.1419 0-2.5456-2.0638-4.6094-4.6094-4.6094-2.0547 0-3.8003 1.3456-4.3913 3.2003-.2003-.0547-.4097-.0821-.6282-.0821-1.4094 0-2.5547 1.1453-2.5547 2.5547 0 .0913.0091.1826.0182.2739-.0091.0091-.0091.0182-.0182.0273-.5456.8003-.8639 1.7639-.8639 2.8003 0 2.7456 2.2275 4.973 4.973 4.973h10.4003c2.0547 0 3.7275-1.6728 3.7275-3.7275 0-1.9547-1.5094-3.5547-3.4094-3.7184-.0547-.0091-.1003-.0182-.1552-.0273-.0456-.0091-.0913-.0182-.1369-.0273z"
                          fill="url(#cloudflare-gradient)"
                        />
                        <defs>
                          <linearGradient
                            id="cloudflare-gradient"
                            x1="4.5"
                            y1="3"
                            x2="19.5"
                            y2="17"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#F38020" />
                            <stop offset="1" stopColor="#FAAE40" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm">Infrastructure</h4>
                    <p className="text-xs text-muted-foreground">Cloudflare</p>
                  </CardContent>
                </Card>
              </div>

              {/* Key Advantages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-border bg-white rounded-lg hover-lift">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Scalable & Modular</h4>
                    <p className="text-sm text-muted-foreground">
                      Each component can scale independently. Add new features or integrations without disrupting
                      existing workflows.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-border bg-white rounded-lg hover-lift">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Secure & Reliable</h4>
                    <p className="text-sm text-muted-foreground">
                      Enterprise-grade security, encrypted data, and 99.9% uptime. Built to handle sensitive customer
                      and payment information.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-border bg-white rounded-lg hover-lift">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">Automation-Driven</h4>
                    <p className="text-sm text-muted-foreground">
                      Reduces manual work by 80%. AI handles pricing, matching, routing, and notifications
                      automatically.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Environmental Impact */}
              <div className="mt-16" ref={impactSectionRef}>
                <div className="text-center mb-8">
                  <Badge className="mb-6 bg-emerald-500/10 text-emerald-700 border-emerald-500/20 rounded-lg">
                    Environmental Impact
                  </Badge>
                </div>

                {/* Impact metrics */}
                <div className="mb-8 p-10 bg-emerald-600 text-white rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                      <div className="text-5xl font-bold mb-2">
                        {hasAnimated ? `${milesCount.toFixed(1)}` : '0'}
                      </div>
                      <div className="text-emerald-100">miles saved per booking</div>
                    </div>
                    <div>
                      <div className="text-5xl font-bold mb-2">
                        ~{hasAnimated ? `${co2Count.toFixed(1)}kg` : '0kg'}
                      </div>
                      <div className="text-emerald-100">CO₂ saved per booking</div>
                    </div>
                    <div>
                      <div className="text-5xl font-bold mb-2">
                        {hasAnimated ? `${tonnesCount.toFixed(0)}` : '0'}
                      </div>
                      <div className="text-emerald-100">tonnes CO₂ saved annually</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground italic">
                    "Digitising and decarbonising the UK windscreen industry, one job at a time."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="py-12 bg-gradient-to-b from-white via-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border"></div>
              <div className="w-2 h-2 rounded-full bg-primary/40"></div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border"></div>
            </div>
          </div>
        </div>

        {/* Growth section - remains the same */}
        <section id="growth" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-20">
              <Badge className="mb-6 bg-tertiary/10 text-tertiary border-tertiary/20 rounded-lg">Proven Traction</Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">
                Proven Market Traction, Global Reach & Scalable Growth
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-light">
                Consistent year-on-year growth, global visibility, and highly efficient lead generation — achieved
                primarily through performance.
              </p>
            </div>

            {/* Performance Overview Table */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                Performance Overview (2023 → 2025 YTD)
              </h3>
              <Card className="border border-border bg-white rounded-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-primary/5">
                        <tr className="border-b border-border">
                          <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Year</th>
                          <th className="text-right py-4 px-6 text-sm font-semibold text-foreground">Users</th>
                          <th className="text-right py-4 px-6 text-sm font-semibold text-foreground">% New Users</th>
                          <th className="text-right py-4 px-6 text-sm font-semibold text-foreground">Avg. Session</th>
                          <th className="text-right py-4 px-6 text-sm font-semibold text-foreground">Engagement</th>
                          <th className="text-right py-4 px-6 text-sm font-semibold text-foreground">Main Channel</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                          <td className="py-4 px-6 font-medium text-foreground">2023</td>
                          <td className="text-right py-4 px-6 text-foreground">3,922</td>
                          <td className="text-right py-4 px-6 text-foreground">95%</td>
                          <td className="text-right py-4 px-6 text-foreground">1m 49s</td>
                          <td className="text-right py-4 px-6 text-foreground">67.8%</td>
                          <td className="text-right py-4 px-6 text-muted-foreground">Organic (65%)</td>
                        </tr>
                        <tr className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                          <td className="py-4 px-6 font-medium text-foreground">2024</td>
                          <td className="text-right py-4 px-6 text-primary font-semibold">12,481</td>
                          <td className="text-right py-4 px-6 text-foreground">95%</td>
                          <td className="text-right py-4 px-6 text-foreground">1m 54s</td>
                          <td className="text-right py-4 px-6 text-foreground">60.5%</td>
                          <td className="text-right py-4 px-6 text-muted-foreground">Organic (66%)</td>
                        </tr>
                        <tr className="hover:bg-accent/50 transition-colors">
                          <td className="py-4 px-6 font-medium text-foreground">2025 (YTD)</td>
                          <td className="text-right py-4 px-6 text-primary font-semibold">9,754</td>
                          <td className="text-right py-4 px-6 text-foreground">95%</td>
                          <td className="text-right py-4 px-6 text-foreground">1m 55s</td>
                          <td className="text-right py-4 px-6 text-foreground">60%</td>
                          <td className="text-right py-4 px-6 text-muted-foreground">Organic (65%)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Global Reach and Traffic Sources Section - Updated to 2 columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Global Reach Section */}
              <div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Global Reach</h3>
                </div>
                <p className="text-center text-muted-foreground text-sm mb-6">
                  Windscreen Compare is already attracting users from over 30 countries — proving clear international
                  demand and scalability beyond the UK.
                </p>
                <Card className="border border-border bg-gradient-to-br from-blue-50 to-primary/5 rounded-lg">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center">
                        <div className="w-12 h-8 mx-auto mb-2 rounded overflow-hidden shadow-sm">
                          <Image
                            src="/images/design-mode/gb.png"
                            alt="Great Britain"
                            width={48}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-xl font-bold text-foreground mb-0.5">62%</div>
                        <div className="text-xs text-muted-foreground">Great Britain</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-8 mx-auto mb-2 rounded overflow-hidden shadow-sm">
                          <Image
                            src="/images/design-mode/us.png"
                            alt="United States"
                            width={48}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-xl font-bold text-foreground mb-0.5">13%</div>
                        <div className="text-xs text-muted-foreground">United States</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-8 mx-auto mb-2 rounded overflow-hidden shadow-sm">
                          <Image
                            src="/images/design-mode/au.png"
                            alt="Australia"
                            width={48}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-xl font-bold text-foreground mb-0.5">3%</div>
                        <div className="text-xs text-muted-foreground">Australia</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-8 mx-auto mb-2 rounded overflow-hidden shadow-sm">
                          <Image
                            src="/images/design-mode/cn.png"
                            alt="China"
                            width={48}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-xl font-bold text-foreground mb-0.5">3%</div>
                        <div className="text-xs text-muted-foreground">China</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-8 mx-auto mb-2 rounded overflow-hidden shadow-sm">
                          <Image
                            src="/images/design-mode/de.png"
                            alt="Germany"
                            width={48}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-xl font-bold text-foreground mb-0.5">2%</div>
                        <div className="text-xs text-muted-foreground">Germany</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-8 mx-auto mb-2 rounded overflow-hidden shadow-sm">
                          <Image
                            src="/images/design-mode/pl.png"
                            alt="Poland"
                            width={48}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-xl font-bold text-foreground mb-0.5">2%</div>
                        <div className="text-xs text-muted-foreground">Poland</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-8 mx-auto mb-2 rounded overflow-hidden shadow-sm">
                          <Image
                            src="/images/design-mode/za.png"
                            alt="South Africa"
                            width={48}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-xl font-bold text-foreground mb-0.5">2%</div>
                        <div className="text-xs text-muted-foreground">South Africa</div>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-8 mx-auto mb-2 rounded overflow-hidden shadow-sm flex items-center justify-center bg-gray-100">
                          <Globe className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="text-xl font-bold text-foreground mb-0.5">13%</div>
                        <div className="text-xs text-muted-foreground">Other Countries</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Traffic Sources Section */}
              <div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold text-foreground">Traffic Sources</h3>
                </div>
                <p className="text-center text-muted-foreground text-sm mb-6">
                  A diversified, sustainable traffic mix — strong SEO foundation, credible referrals, and minimal paid
                  spend.
                </p>
                {/* CHANGE: Changed from grid-cols-1 to grid-cols-2 to display cards in 2 columns */}
                <div className="grid grid-cols-2 gap-3 my-20">
                  <Card className="border-2 border-emerald-500/30 bg-emerald-50/50 rounded-lg">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-emerald-600 mb-1">65%</div>
                      <div className="text-xs font-semibold text-foreground mb-1">Organic Search</div>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs px-1.5 py-0.5">
                        <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                        {/* Reduced icon size */}
                        +160% YoY
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card className="border border-border bg-white rounded-lg">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-foreground mb-1">23%</div>
                      <div className="text-xs font-semibold text-foreground mb-1">Direct Traffic</div>
                      <div className="text-xs text-muted-foreground">Brand recognition</div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-purple-500/30 bg-purple-50/50 rounded-lg">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">7%</div>
                      <div className="text-xs font-semibold text-foreground mb-1">Referral</div>
                      <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 text-xs px-1.5 py-0.5">
                        <Users className="h-2.5 w-2.5 mr-0.5" />
                        {/* Reduced icon size */}
                        +23× YoY
                      </Badge>
                    </CardContent>
                  </Card>
                  <Card className="border border-border bg-white rounded-lg">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-foreground mb-1">3%</div>
                      <div className="text-xs font-semibold text-foreground mb-1">Paid Search</div>
                      <div className="text-xs text-muted-foreground">Limited spend</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Key Achievements</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
              <Card className="border border-border bg-white hover-lift overflow-hidden rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-medium text-muted-foreground">User Growth</div>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-md text-xs px-1.5 py-0.5">
                      <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                      +220%
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">3.2×</div>
                  <div className="text-xs text-muted-foreground mb-3">Year-over-year</div>
                  <div className="h-10 flex items-end gap-0.5">
                    {[30, 35, 40, 50, 55, 65, 70, 80, 85, 95, 90, 100].map((height, i) => (
                      <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white hover-lift overflow-hidden rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-medium text-muted-foreground">Cost per Lead</div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 rounded-md text-xs px-1.5 py-0.5">
                      <CheckCircle className="h-2.5 w-2.5 mr-0.5" />
                      90% Lower
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">£0.95</div>
                  <div className="text-xs text-muted-foreground mb-3">vs £9.50 industry</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Us</span>
                      <span className="font-semibold text-primary">£0.95</span>
                    </div>
                    <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: "10%" }} />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Industry</span>
                      <span className="font-semibold text-muted-foreground">£9.50</span>
                    </div>
                    <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                      <div className="h-full bg-muted-foreground/30 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white hover-lift overflow-hidden rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-medium text-muted-foreground">Global Reach</div>
                    <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 rounded-md text-xs px-1.5 py-0.5">
                      <Globe className="h-2.5 w-2.5 mr-0.5" />
                      Growing
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">30+</div>
                  <div className="text-xs text-muted-foreground mb-3">Countries</div>
                  <div className="relative h-10 flex items-center justify-center">
                    <Globe className="h-8 w-8 text-primary/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-xl font-bold text-primary">30+</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white hover-lift overflow-hidden rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-medium text-muted-foreground">SEO Traffic</div>
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 rounded-md text-xs px-1.5 py-0.5">
                      <TrendingUp className="h-2.5 w-2.5 mr-0.5" />
                      Organic
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">65%+</div>
                  <div className="text-xs text-muted-foreground mb-3">Inbound funnel</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">SEO</div>
                      <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "65%" }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1">Paid</div>
                      <div className="h-1.5 bg-accent rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: "35%" }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white hover-lift overflow-hidden rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs font-medium text-muted-foreground">Referral Growth</div>
                    <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 rounded-md text-xs px-1.5 py-0.5">
                      <Users className="h-2.5 w-2.5 mr-0.5" />
                      23×
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-1">23×</div>
                  <div className="text-xs text-muted-foreground mb-3">Partner trust</div>
                  <div className="h-10 flex items-end gap-0.5">
                    {[10, 15, 20, 30, 40, 50, 60, 75, 85, 95, 98, 100].map((height, i) => (
                      <div key={i} className="flex-1 bg-purple-500/20 rounded-t" style={{ height: `${height}%` }} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* This section contains the updates */}
            <div className="mb-16">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 hover-lift rounded-lg overflow-hidden">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">Projected 2025</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <div>
                          <div className="text-2xl font-bold text-primary mb-0.5">15,000+</div>
                          <div className="text-xs text-muted-foreground">Users by year-end</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary mb-0.5">4×</div>
                          <div className="text-xs text-muted-foreground">Total growth vs 2023</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-primary mb-0.5">Expanding</div>
                          <div className="text-xs text-muted-foreground">Trade & supplier integrations</div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground italic leading-relaxed">
                        &quot;Every month, more customers discover, trust, and convert through Windscreen Compare,
                        proving the model, validating the market and setting the stage for rapid scale.&quot;
                      </p>
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
                        <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Year</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Revenue</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">EBITDA</th>
                        <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Margin</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financialData.map((row, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-4 font-medium text-foreground">{row.year}</td>
                          <td className="text-right py-4 px-6 text-foreground">{row.revenue}</td>
                          <td
                            className={`text-right py-4 px-6 ${row.ebitda.startsWith("-") ? "text-destructive" : "text-primary"}`}
                          >
                            {row.ebitda}
                          </td>
                          <td
                            className={`text-right py-4 px-6 ${row.margin.startsWith("-") ? "text-destructive" : "text-primary"}`}
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

        {/* Team section - remains the same */}
        <section className="py-24 bg-white pb-2.5">
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
                  <Card key={index} className="border border-border bg-white hover-lift rounded-lg relative">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {member.image ? (
                          <div className="w-16 h-16 flex-shrink-0 border-2 border-primary/20 rounded-full overflow-hidden relative">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                              style={{ 
                                objectPosition: member.imagePosition || "center center",
                                transform: `scale(${member.imageScale || 1})`
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Users className="h-8 w-8 text-primary" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                          <Badge className="mb-3 bg-primary/10 text-primary border-primary/20 text-xs rounded-lg">
                            {member.role}
                          </Badge>
                          <p className="text-sm text-muted-foreground leading-relaxed">{member.experience}</p>
                        </div>
                      </div>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-4 right-4 text-primary hover:text-primary/80 transition-colors"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center"></div>
          </div>
        </section>

        {/* Section Divider */}
        <div className="py-12 bg-gradient-to-b from-white via-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border"></div>
              <div className="w-2 h-2 rounded-full bg-primary/40"></div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border"></div>
            </div>
          </div>
        </div>

        {/* Return section - remains the same */}
        <section id="return" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
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
                  <div className="text-xs text-muted-foreground">
                    Claim 50% loss relief against income tax if investment fails
                  </div>
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
              <CardHeader>
                <CardTitle className="text-2xl tracking-tight">Investment Terms</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Your investment is SEIS eligible, providing significant tax advantages.
                </p>
              </CardHeader>
              <CardContent>
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
                      placeholder="Enter amount"
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
                        <div className="text-muted-foreground mb-1">Net Investment Cost</div>
                        <div className="font-semibold text-foreground">{formatCurrency(investmentAmount - (investmentAmount * 0.5))}</div>
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
                    <Badge className="bg-primary text-white rounded-lg">Tax Efficient</Badge>
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
                    <PoundSterling className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm">£2M Pre-Money Valuation</div>
                      <div className="text-xs text-muted-foreground">
                        Fair valuation based on traction and market size
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <PoundSterling className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground text-sm">£350k Raise Target</div>
                      <div className="text-xs text-muted-foreground">Funding for 18-month runway to profitability</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <PoundSterling className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
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

        {/* Section Divider */}
        <div className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border"></div>
              <div className="w-2 h-2 rounded-full bg-primary/40"></div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border"></div>
            </div>
          </div>
        </div>

        {/* Invest section - modified for investor pitch */}
        <section id="invest" className="py-24 bg-white border-y border-border">
          <div className="max-w-6xl mx-auto text-center px-6">
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
          </div>
        </section>

        {/* New section for supplier partnership */}
        {/* This section is intentionally left empty based on the provided updates. */}

        {/* Strategic Fit with Cary Group section */}
        {/* This section is intentionally left empty based on the provided updates. */}

        {/* Footer - remains the same */}
        <footer className="bg-foreground text-white py-16 -mx-6 px-6">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-3">
                <img
                  src="/Windscreen%20Compare%20Icon.png"
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
    </div>
  )
}
