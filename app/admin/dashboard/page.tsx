import Link from "next/link";
import { FileText, Beaker, Activity } from "lucide-react";

export default function AdminDashboard() {
    const products = [
        { id: "liquide", name: "Concentré Liquide (35%)", status: "Actif" },
        { id: "poudre", name: "Concentré Poudre", status: "En attente" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 p-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">
            Console Mytilimer B2B
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard
            icon={<Activity />}
            title="Consultations Fiche"
            value="1,240"
            color="bg-blue-600"
            />
            <StatCard
            icon={<Beaker />}
            title="Simulations Calculateur"
            value="458"
            color="bg-cyan-600"
            />
            <StatCard
            icon={<FileText />}
            title="Demandes Tech"
            value="12"
            color="bg-indigo-600"
            />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h2 className="font-semibold text-xl text-slate-800">
                Gestion des Fiches Techniques
            </h2>
            </div>
            <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                <tr>
                <th className="px-6 py-4">Produit</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                <tr key={p.id}>
                    <td className="px-6 py-4 font-medium text-black">{p.name}</td>
                    <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                        {p.status}
                    </span>
                    </td>
                    <td className="px-6 py-4">
                    <Link
                        href={`/admin/fiche/${p.id}`}
                        className="text-blue-600 hover:underline font-semibold"
                    >
                        Modifier les valeurs
                    </Link>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
}

function StatCard({ icon, title, value, color }: any) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
        <div className={`${color} p-3 rounded-lg text-white`}>{icon}</div>
        <div>
            <p className="text-slate-500 text-sm">{title}</p>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
        </div>
    );
}
