import { Head, Link } from '@inertiajs/react';
import { Boxes, Factory, MonitorSmartphone, Sparkles } from 'lucide-react';

import StackAlertButton from '../../components/StackAlertButton';
import type { AppPageProps } from '../../types';

const features = [
    {
        title: 'Dashboard Responsif',
        description: 'Dirancang fleksibel dari laptop sampai monitor besar untuk kebutuhan operasional harian.',
        icon: MonitorSmartphone,
    },
    {
        title: 'Alur Inertia.js',
        description: 'Navigasi tetap terasa cepat tanpa melepas routing dan kontrol penuh dari Laravel.',
        icon: Boxes,
    },
    {
        title: 'React TypeScript',
        description: 'Komponen lebih aman dikembangkan untuk modul produksi, gudang, dan administrasi.',
        icon: Sparkles,
    },
];

export default function Home({ appName, laravelVersion, phpVersion }: AppPageProps) {
    return (
        <>
            <Head title="Desktop App" />

            <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10 lg:py-10">
                <section className="overflow-hidden rounded-xl border border-line bg-white/80 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur">
                    <div className="grid gap-10 px-6 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-12">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-sm font-medium text-sky-800">
                                <Factory className="h-4 w-4" />
                                Desktop app responsif
                            </div>

                            <div className="space-y-4">
                                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                                    {appName} punya aplikasi desktop yang lebar, rapi, dan siap berkembang.
                                </h1>
                                <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
                                    Tampilan ini dibuat untuk area kerja desktop dengan grid yang menyesuaikan ukuran layar,
                                    cocok untuk dashboard, monitoring, dan form operasional yang lebih padat.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <StackAlertButton
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
                                    text="Desktop app sudah aktif dengan React TypeScript, Lucide, dan SweetAlert."
                                />
                                <Link
                                    className="inline-flex items-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                                    href="/mobile"
                                >
                                    Lihat versi mobile
                                </Link>
                                <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                                    Laravel {laravelVersion} · PHP {phpVersion}
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
                            {features.map(({ title, description, icon: Icon }) => (
                                <article
                                    className="rounded-2xl border border-slate-200 bg-panel p-5 hover:shadow-sm"
                                    key={title}
                                >
                                    <div className="mb-4 inline-flex rounded-xl bg-slate-900 p-3 text-white">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
                                    <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
