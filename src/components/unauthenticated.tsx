"use client"
// Placeholder components for Lucide icons for this self-contained example
const ShieldAlert = ({ className } : { className: string}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M12 8v4"></path>
    <path d="M12 16h.01"></path>
  </svg>
);

const ArrowRight = ({ className }: { className: string}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);


/**
 * UnauthenticatedPage Component
 * * This component renders a page indicating that the user does not have access
 * because they are not authenticated. It provides a clear message and a
 * call-to-action to sign in.
 */
const UnauthenticatedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
      {/* Icon Section */}
      <div className="mb-6">
        <div className="bg-red-100 p-4 rounded-full">
          <ShieldAlert className="h-12 w-12 text-red-600" />
        </div>
      </div>

      {/* Text Content Section */}
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Access Denied
      </h1>
      <p className="text-slate-600 mb-8 max-w-sm">
        You must be signed in to view this page. Please log in to gain access.
      </p>

      {/* Call to Action Button */}
      <button
        // In a real Next.js or React Router app, you'd use a Link or a navigation hook here.
        // For example: onClick={() => router.push('/sign-in')}
        onClick={() => console.log('Navigate to sign-in page')}
        className="group flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ease-in-out"
      >
        Go to Sign In Page
        <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
};


export default function Unauthenticated() {
  return (
    <main className="bg-slate-100 flex items-center justify-center min-h-screen font-sans p-4">
      <UnauthenticatedPage />
    </main>
  );
}
