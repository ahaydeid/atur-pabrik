import { Head } from '@inertiajs/react';
import { BellRing, Boxes, CheckCircle2, Factory, Sparkles } from 'lucide-react';
import Swal from 'sweetalert2';

type HomeProps = {
    appName: string;
    laravelVersion: string;
    phpVersion: string;
};

const features = [
    {
        title: 'Inertia.js',
        description: 'Routing server-side Laravel dengan experience SPA yang ringan.',
        icon: Boxes,
    },
    {
        title: 'React + TypeScript',
        description: 'Komponen typed dan siap dikembangkan untuk dashboard pabrik.',
        icon: Sparkles,
    },
    {
        title: 'Lucide React',
        description: 'Set ikon konsisten untuk UI operasional dan admin.',
        icon: Factory,
    },
];

export default function Home({ appName, laravelVersion, phpVersion }: HomeProps) {
    const showWelcomeAlert = async () => {
        await Swal.fire({
            title: 'Stack siap dipakai',
            text: 'Inertia, React TypeScript, Lucide React, dan SweetAlert sudah terpasang.',
            icon: 'success',
            confirmButtonText: 'Mantap',
            confirmButtonColor: '#d97706',
        });
    };

    return (
        <>
            <Head title="Home" />

            <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10 lg:px-10">
                <section className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
                    <div className="grid gap-10 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-12">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
                                <CheckCircle2 className="h-4 w-4" />
                                Frontend stack berhasil disiapkan
                            </div>

                            <div className="space-y-4">
                                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 lg:text-6xl">
                                    {appName} sekarang memakai Inertia, React TypeScript, Lucide, dan SweetAlert.
                                </h1>
                                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                                    Fondasi Laravel 13 ini sudah siap untuk kita kembangkan menjadi aplikasi operasional
                                    pabrik dengan alur server-side yang tetap nyaman untuk frontend modern.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
                                    onClick={showWelcomeAlert}
                                    type="button"
                                >
                                    <BellRing className="h-4 w-4" />
                                    Tes SweetAlert
                                </button>
                                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                    Laravel {laravelVersion} · PHP {phpVersion}
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {features.map(({ title, description, icon: Icon }) => (
                                <article
                                    className="rounded-2xl border border-slate-200 bg-[var(--color-panel)] p-5 shadow-sm"
                                    key={title}
                                >
                                    <div className="mb-4 inline-flex rounded-xl bg-slate-900 p-3 text-white">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
