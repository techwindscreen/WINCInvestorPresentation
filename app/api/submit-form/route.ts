import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, investmentRange, investorType } = body

    // Google Form configuration
    const GOOGLE_FORM_ID = "1FAIpQLSfs6CRc9XgBHB_3VZrtcKFOuLtTgLz6bEX6flUCAftNFr4Awg"
    const ENTRY_IDS = {
      name: "entry.1250254499",
      email: "entry.286189510",
      investmentRange: "entry.544793908",
      investorType: "entry.1855845316"
    }

    // Build form data
    const formData = new URLSearchParams()
    formData.append(ENTRY_IDS.name, name)
    formData.append(ENTRY_IDS.email, email)
    formData.append(ENTRY_IDS.investmentRange, investmentRange)
    formData.append(ENTRY_IDS.investorType, investorType)

    // Submit to Google Forms
    const googleFormUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`
    
    const response = await fetch(googleFormUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })

    // Google Forms returns a redirect even on success, so we treat any response as success
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully' 
    })

  } catch (error) {
    console.error('Error submitting form:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
