import React from 'react';
import Head from 'next/head';

export default function PrivacyPolicy() {
  // const lastUpdated = 'March 15, 2024'; // You can dynamically set this

  return (
    <>
      <Head>
        <title>Privacy Policy | Tenda India</title>
        <meta name="description" content="Tenda India Privacy Policy - Learn how we collect, use, and protect your personal information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 mt-20">
        {/* Decorative header bar */}
        <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-7xl">
          {/* Header Section with Orange Theme */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            {/* <div className="inline-block p-2 px-6 bg-orange-100 rounded-full mb-4">
              <span className="text-orange-600 font-semibold text-sm sm:text-base">
                Last Updated: {lastUpdated}
              </span>
            </div> */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Privacy{' '}
              <span className="bg-orange-500 text-white px-4 py-2 rounded-lg inline-block transform -rotate-1">
                Policy
              </span>
            </h1>
            <div className="w-24 h-1 bg-orange-400 mx-auto rounded-full"></div>
          </div>

          {/* Main Content Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
            {/* Orange accent strip */}
            <div className="h-2 bg-gradient-to-r from-orange-400 to-orange-600"></div>

            <div className="p-6 sm:p-8 lg:p-10 space-y-8">
              {/* Introduction */}
              <section className="space-y-4">
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  At <span className="font-semibold text-orange-600">Tenda India</span>, we respect your privacy and are committed to protecting the personal information of visitors, partners, dealers, and customers who interact with our website.
                </p>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  The website <span className="text-orange-600 font-medium">tendaindia.com</span> is managed and operated in India by <span className="font-semibold text-gray-800">Fortune Marketing Pvt. Ltd.</span>, the National Distributor of Tenda networking products in India.
                </p>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                  This Privacy Policy explains how information is collected, used, stored, and protected when users visit or interact with our website.
                </p>
                <p className="text-gray-600 leading-relaxed text-base sm:text-lg bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                  By using this website, you agree to the practices described in this Privacy Policy.
                </p>
              </section>

              {/* Policy Sections Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* Section 1 */}
                <PolicySection
                  number="1"
                  title="Scope of This Policy"
                  bgColor="bg-orange-50"
                >
                  <p>This Privacy Policy applies to information collected through:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>The Tenda India website</li>
                    <li>Product inquiry or contact forms</li>
                    <li>Dealer or partner registrations</li>
                    <li>Technical support requests</li>
                    <li>Email communications or marketing campaigns</li>
                    <li>Online promotions or campaigns related to Tenda networking products</li>
                  </ul>
                  <p className="mt-2">This policy does not apply to third-party websites that may be linked from this website.</p>
                </PolicySection>

                {/* Section 2 */}
                <PolicySection
                  number="2"
                  title="Information We Collect"
                  bgColor="bg-white"
                >
                  <p className="font-semibold text-orange-700">Personal Information</p>
                  <p>Personal information may include:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Company name</li>
                    <li>City or address</li>
                    <li>Business information (for dealers, partners, or system integrators)</li>
                    <li>Any information voluntarily submitted through forms</li>
                  </ul>
                  <p className="font-semibold text-orange-700 mt-3">Non-Personal Information</p>
                  <p>We may automatically collect certain technical information such as:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>IP address</li>
                    <li>Browser type</li>
                    <li>Device type</li>
                    <li>Operating system</li>
                    <li>Website usage behavior</li>
                    <li>Pages visited and time spent on the website</li>
                  </ul>
                  <p className="mt-2">This information helps us analyze and improve website performance.</p>
                </PolicySection>

                {/* Section 3 */}
                <PolicySection
                  number="3"
                  title="How We Collect Information"
                  bgColor="bg-white"
                >
                  <p className="font-semibold text-orange-700">Information Provided by Users</p>
                  <p>You may provide information when you:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Fill out contact forms</li>
                    <li>Request product information</li>
                    <li>Apply for dealership or partnership</li>
                    <li>Contact customer support</li>
                    <li>Subscribe to newsletters or updates</li>
                  </ul>
                  <p className="font-semibold text-orange-700 mt-3">Automatic Data Collection</p>
                  <p>Certain information may be collected automatically using:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Cookies</li>
                    <li>Website analytics tools</li>
                    <li>Server logs</li>
                  </ul>
                  <p className="mt-2">These technologies help us understand how users interact with our website.</p>
                </PolicySection>

                {/* Section 4 */}
                <PolicySection
                  number="4"
                  title="Use of Information"
                  bgColor="bg-orange-50"
                >
                  <p>The information collected may be used for the following purposes:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Responding to inquiries or support requests</li>
                    <li>Providing product information and updates</li>
                    <li>Managing dealer or partner communications</li>
                    <li>Improving website performance and user experience</li>
                    <li>Sending marketing communications related to Tenda products</li>
                    <li>Conducting internal analysis and market research</li>
                    <li>Ensuring website security and preventing fraud</li>
                  </ul>
                  <p className="mt-2">We only use personal information for legitimate business purposes.</p>
                </PolicySection>

                {/* Section 5 */}
                <PolicySection
                  number="5"
                  title="Cookies and Website Tracking"
                  bgColor="bg-orange-50"
                >
                  <p>Our website may use cookies and similar technologies to enhance user experience.</p>
                  <p className="font-semibold text-orange-700 mt-2">Cookies help us:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Understand website traffic</li>
                    <li>Remember user preferences</li>
                    <li>Improve website performance</li>
                    <li>Deliver relevant content</li>
                  </ul>
                  <p className="mt-2">Users may disable cookies through browser settings, although some features of the website may not function properly.</p>
                </PolicySection>

                {/* Section 6 */}
                <PolicySection
                  number="6"
                  title="Sharing of Information"
                  bgColor="bg-white"
                >
                  <p className="font-semibold text-green-700">We do not sell or rent personal information to third parties.</p>
                  <p className="mt-2">However, information may be shared in the following circumstances:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>With service providers assisting with website management, analytics, or marketing</li>
                    <li>With authorized partners or distributors involved in fulfilling product inquiries</li>
                    <li>When required by law or government authorities</li>
                    <li>To protect the rights, property, or safety of users, partners, or the company</li>
                  </ul>
                </PolicySection>

                {/* Section 7 */}
                <PolicySection
                  number="7"
                  title="Data Security"
                  bgColor="bg-white"
                >
                  <p>We implement appropriate technical and organizational measures to protect personal information from:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Unauthorized access</li>
                    <li>Data loss</li>
                    <li>Misuse or disclosure</li>
                    <li>Unauthorized modification</li>
                  </ul>
                  <p className="mt-2">Although we strive to protect information, no online system can guarantee absolute security.</p>
                </PolicySection>

                {/* Section 8 */}
                <PolicySection
                  number="8"
                  title="Data Retention"
                  bgColor="bg-orange-50"
                >
                  <p>Personal information will only be retained for as long as necessary to:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Provide requested services</li>
                    <li>Respond to customer inquiries</li>
                    <li>Maintain business records</li>
                    <li>Comply with applicable legal requirements</li>
                  </ul>
                  <p className="mt-2">Once the data is no longer required, it will be securely deleted or anonymized.</p>
                </PolicySection>

                {/* Section 9 */}
                <PolicySection
                  number="9"
                  title="Third-Party Websites"
                  bgColor="bg-orange-50"
                >
                  <p>This website may contain links to third-party websites.</p>
                  <p>These websites operate independently and have their own privacy policies.</p>
                  <p className="font-semibold text-orange-700">We are not responsible for the privacy practices or content of those websites.</p>
                </PolicySection>

                {/* Section 10 */}
                <PolicySection
                  number="10"
                  title="Compliance With Applicable Laws"
                  bgColor="bg-white"
                >
                  <p>The collection and use of information through this website is managed in accordance with applicable Indian laws, including provisions of the <span className="font-semibold">Information Technology Act, 2000</span> and other applicable data protection regulations.</p>
                </PolicySection>

                {/* Section 11 */}
                <PolicySection
                  number="11"
                  title="Changes to This Privacy Policy"
                  bgColor="bg-white"
                >
                  <p>We may update this Privacy Policy from time to time to reflect changes in services, technology, or legal requirements.</p>
                  <p className="mt-2">Any updates will be posted on this page along with the revised effective date.</p>
                </PolicySection>

                {/* Section 12 - Full width on mobile, spans both columns on larger screens */}
                <div className="md:col-span-2">
                  <PolicySection
                    number="12"
                    title="Contact Information"
                    bgColor="bg-orange-100"
                  >
                    <p className="text-lg">If you have any questions about this Privacy Policy or how your data is handled, please contact:</p>
                    <div className="mt-4 p-4 bg-white rounded-lg border border-orange-200">
                      <p className="font-bold text-gray-800">Fortune Marketing Pvt. Ltd.</p>
                      <p className="text-orange-700 font-medium">National Distributor for Tenda in India</p>
                      <div className="mt-3 space-y-1">
                        <p>
                          <span className="font-semibold">Website:</span>{' '}
                          <a href="https://www.fortune-it.com" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            www.fortune-it.com
                          </a>
                        </p>
                        <p>
                          <span className="font-semibold">Website:</span>{' '}
                          <a href="https://tendaindia.com" className="text-orange-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            tendaindia.com
                          </a>
                        </p>
                        <p>
                          <span className="font-semibold">Email:</span>{' '}
                          <a href="mailto:support@tendaindia.com" className="text-orange-600 hover:underline">
                            support@tendaindia.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </PolicySection>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Tenda India. All rights reserved.</p>
          </div>
        </div>
      </main>
    </>
  );
}

// Reusable Policy Section Component
function PolicySection({ number, title, bgColor = 'bg-white', children }) {
  return (
    <div className={`${bgColor} p-6 rounded-xl border border-orange-100 shadow-sm hover:shadow-md transition-shadow duration-300 h-full`}>
      <div className="flex items-start space-x-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
          {number}
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="text-gray-600 space-y-2 text-sm sm:text-base leading-relaxed">
        {children}
      </div>
    </div>
  );
}