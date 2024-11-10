// components/CallToAction.tsx

import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
      <section className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <div>
          <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg mr-4 hover:bg-blue-700">
            Register Now
          </Link>
          <Link to="/login" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
            Log In
          </Link>
        </div>
      </section>
    );
  };
  
  export default CallToAction;
  