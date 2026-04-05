import React from "react";

export const metadata = {
  title: "Terms & Conditions",
  description: "Review the legal terms, booking policies, and cancellation conditions for Wanderlust Accommodation services.",
};

export default function TermsPage() {
  const lastUpdated = "April 3, 2026";

  const termsSections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using this website, you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please do not use our services.",
    },
    {
      id: "services",
      title: "2. Services Provided",
      content:
        "We provide travel-related services including (but not limited to):",
      list: [
        "Flight bookings",
        "Hotel reservations",
        "Tour packages",
        "Travel assistance and information",
      ],
      footer: "All services are subject to availability and may change without prior notice.",
    },
    {
      id: "booking",
      title: "3. Booking & Payments",
      list: [
        "All bookings are confirmed only after full or partial payment is received.",
        "Prices are subject to change due to availability, currency fluctuations, or supplier changes.",
        "You agree to provide accurate payment and personal details.",
      ],
    },
    {
      id: "cancellation",
      title: "4. Cancellation & Refund Policy",
      list: [
        "Cancellation charges vary depending on the service provider (airlines, hotels, etc.).",
        "Refunds (if applicable) will be processed within a specified time frame.",
        "Some bookings may be non-refundable.",
      ],
    },
    {
      id: "responsibilities",
      title: "5. User Responsibilities",
      content: "You agree:",
      list: [
        "To provide correct and complete information.",
        "Not to misuse the website for fraudulent bookings.",
        "To comply with all travel laws, visa requirements, and regulations.",
      ],
    },
    {
      id: "documents",
      title: "6. Travel Documents",
      list: [
        "It is your responsibility to carry valid passports, visas, and other required documents.",
        "We are not liable for denied boarding or entry due to incomplete documentation.",
      ],
    },
    {
      id: "liability",
      title: "7. Liability Disclaimer",
      list: [
        "We act as an intermediary between you and service providers.",
        "We are not responsible for delays, cancellations, accidents, or losses caused by third parties.",
        "We are not liable for any direct or indirect damages arising from use of our services.",
      ],
    },
    {
      id: "modifications",
      title: "8. Changes & Modifications",
      content:
        "We reserve the right to modify or discontinue any part of the website or services at any time without prior notice.",
    },
    {
      id: "intellectual-property",
      title: "9. Intellectual Property",
      content:
        "All content on this website (text, images, logos) is owned by us and may not be copied or reused without permission.",
    },
    {
      id: "privacy",
      title: "10. Privacy Policy",
      content:
        "Your personal information will be handled in accordance with our Privacy Policy.",
    },
    {
      id: "governing-law",
      title: "11. Governing Law",
      content:
        "These terms shall be governed by the laws of [Your Country/State], and any disputes shall be subject to the jurisdiction of local courts.",
    },
    {
      id: "contact",
      title: "12. Contact Information",
      content: "For any queries or support, contact us at:",
      contactInfo: {
        email: "support@wanderlustaccommodations.com",
        phone: "+91 7302016767",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mt-10 mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4 tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Please read these terms and conditions carefully before using our
          service. They govern your use of our platform and travel services.
        </p>
        <p className="text-sm text-gray-400 mt-4">
          Last Updated: {lastUpdated}
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8 md:p-12 space-y-12">
          {termsSections.map((section) => (
            <div key={section.id} className="group pb-8 border-b border-gray-100 last:border-b-0 last:pb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {section.title}
              </h2>

              {section.content && (
                <p className="text-base text-gray-600 leading-relaxed mb-3">
                  {section.content}
                </p>
              )}

              {section.list && (
                <ul className="mt-4 space-y-3 pl-6">
                  {section.list.map((item, index) => (
                    <li key={index} className="relative text-slate-700 text-base leading-relaxed pl-2 font-medium">
                       <span className="absolute left-[-1.5rem] top-1.5 h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.footer && (
                <p className="text-base text-slate-700 leading-relaxed mt-4 font-bold bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  {section.footer}
                </p>
              )}

              {section.contactInfo && (
                <div className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{section.contactInfo.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{section.contactInfo.phone}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Acknowledgement Checkbox area visually styled */}
          <div className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-3xl border border-primary/10 flex items-start space-x-5">
             <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-xl border-2 border-primary bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
             </div>
             <div>
                 <h4 className="text-xl font-black text-slate-900 tracking-tight">Access & Acceptance</h4>
                 <p className="text-slate-600 mt-2 font-medium leading-relaxed">By continuing to use our services and platform, you acknowledge that you have read, understood, and agreed to be bound by these terms.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
