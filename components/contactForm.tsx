"use client";
import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function ContactForm({ onClose }: { onClose?: () => void }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [backendMessage, setBackendMessage] = useState("");

  
async function submitForm(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  setLoading(true);
  setSuccess(false);
  setErrorMessage("");
  setBackendMessage("");

  // Safely create FormData
  const form = new FormData(e.currentTarget);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: form.get("fullName"),
        email: form.get("email"),
        message: form.get("message"),
      }),
    });

    // Safe parsing
    let data;
    try {
      data = await res.json();
    } catch (jsonErr) {
      console.error("JSON parsing error:", jsonErr);
      setSuccess(false);
      setErrorMessage("Failed to parse server response.");
      return;
    }

    // Check response
    if (res.ok && data?.success) {
      setSuccess(true);
      setErrorMessage("");
      setBackendMessage(data.message || "Your message has been sent!");

      // ✅ Safe form reset
      try {
        (e.currentTarget as HTMLFormElement)?.reset();
      } catch (resetErr) {
        console.error("Form reset failed:", resetErr);
      }
    } else {
      console.error("Server returned error:", data);
      setSuccess(false);
      setErrorMessage(data?.error || data?.message || "Something went wrong.");
    }
  } catch (err) {
    console.error("Fetch error:", err);
    setSuccess(false);
    setErrorMessage("Failed to send message.");
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md relative mx-auto">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl font-bold transition-colors"
        >
          ✕
        </button>
      )}

      <h2 className="text-3xl font-extrabold mb-4 text-center text-slate-900 dark:text-white">
        Contact Gilbert
      </h2>
      <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-6">
        Fill out the form and I'll respond as soon as possible.
      </p>

      <form onSubmit={submitForm} className="flex flex-col gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          className="border border-gray-300 dark:border-gray-600 rounded-lg p-3 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-colors text-white font-semibold py-3 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>

      {/* Feedback Messages */}
      {success && !errorMessage && backendMessage && (
        <div className="flex items-center gap-2 mt-4 text-green-600 font-medium">
          <CheckCircle className="w-5 h-5" />
          <span>{backendMessage}</span>
        </div>
      )}
      {!success && errorMessage && (
        <div className="flex items-center gap-2 mt-4 text-red-600 font-medium">
          <XCircle className="w-5 h-5" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
