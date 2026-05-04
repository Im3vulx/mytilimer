"use client";

import React, { useState } from "react";

export default function ContactPage() {
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, msg: "" });

        const formData = new FormData(e.currentTarget);
        const payload = {
        companyName: formData.get("companyName"),
        contactName: formData.get("contactName"),
        email: formData.get("email"),
        message: formData.get("message"),
        };

        try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (response.ok) {
            setStatus({ type: 'success', msg: "Votre demande a été envoyée avec succès !" });
            (e.target as HTMLFormElement).reset();
        } else {
            setStatus({ type: 'error', msg: result.error || "Une erreur est survenue." });
        }
        } catch (err) {
        setStatus({ type: 'error', msg: "Impossible de joindre le serveur." });
        } finally {
        setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-12">
                
                {/* En-tête */}
                <div className="text-center mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Contact Business
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Besoin d&apos;un accompagnement B2B ? Nos experts vous répondent.
                </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Entreprise */}
                        <div className="flex flex-col gap-2">
                        <label htmlFor="companyName" className="text-sm font-semibold text-gray-700">Entreprise *</label>
                        <input 
                            name="companyName" 
                            type="text" 
                            required 
                            placeholder="Ex: Ma Super Boîte"
                            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                        </div>

                        {/* Nom */}
                        <div className="flex flex-col gap-2">
                        <label htmlFor="contactName" className="text-sm font-semibold text-gray-700">Nom du contact</label>
                        <input 
                            name="contactName" 
                            type="text" 
                            placeholder="Ex: Jean Dupont"
                            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email professionnel *</label>
                        <input 
                        name="email" 
                        type="email" 
                        required 
                        placeholder="jean@entreprise.com"
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-semibold text-gray-700">Message *</label>
                        <textarea 
                        name="message" 
                        required 
                        rows={4}
                        placeholder="Comment pouvons-nous vous aider ?"
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                        />
                    </div>

                    {/* Bouton Submit */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full py-4 px-6 rounded-lg font-bold text-white transition duration-200 
                        ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-[0.98]'}`}
                    >
                        {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Envoi en cours...
                        </span>
                        ) : "Envoyer ma demande"}
                    </button>

                    {/* Alertes de statut */}
                    {status.msg && (
                        <div className={`mt-4 p-4 rounded-lg text-sm text-center font-medium animate-fade-in
                        ${status.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                        {status.msg}
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
}