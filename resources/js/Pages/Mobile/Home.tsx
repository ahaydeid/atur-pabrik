import { Head, Link } from '@inertiajs/react';
import { Boxes, ChevronRight, Factory, Smartphone, Sparkles } from 'lucide-react';

import StackAlertButton from '../../components/StackAlertButton';
import type { AppPageProps } from '../../types';

const quickActions = [
    'Check stok bahan baku',
    'Input hasil produksi',
    'Lihat status mesin',
];

const highlights = [
    {
        title: 'Kanvas Mobile Terkunci',
        description: 'Antarmuka mobile tetap memakai komposisi sempit bergaya ponsel agar konsisten di mana pun dibuka.',
        icon: Smartphone,
    },
    {
        title: 'Navigasi Ringkas',
        description: 'Konten difokuskan untuk aksi cepat yang sering dibutuhkan operator dan supervisor lapangan.',
        icon: Boxes,
    },
    {
        title: 'UI Modern',
        description: 'React TypeScript dan Lucide siap dipakai untuk modul checklist, approval, dan pelaporan singkat.',
        icon: Sparkles,
    },
];

export default function Home({ appName, laravelVersion, phpVersion }: AppPageProps) {
    return (
        <>
            <Head title="Mobile App">
                <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" name="viewport" />
            </Head>

            <main className="mobile-stage min-h-screen">
                <section className="mobile-shell bg-white">
                    <div className="border-b border-slate-100 bg-slate-950 px-5 py-5 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.28em] text-amber-300">Mobile App</p>
                                <h1 className="mt-2 text-2xl font-semibold">{appName}</h1>
                            </div>
                            <div className="rounded-full bg-white/10 p-3">
                                <Factory className="h-5 w-5" />
                            </div>
                        </div>
                    </div>

                    <div className="mobile-scroll space-y-6 bg-[linear-gradient(180deg,#fffdf8_0%,#f8fafc_100%)] px-5 py-6">
                        <div className="rounded-[1.75rem] bg-amber-50 p-5">
                            <p className="text-sm font-medium text-amber-900">Tampilan mobile dikunci</p>
                            <p className="mt-2 text-sm leading-7 text-amber-800">
                                Halaman ini sengaja mempertahankan komposisi mobile agar desain dan interaksi tetap konsisten.
                            </p>
                        </div>

                        <StackAlertButton
                            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-amber-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-amber-700"
                            text="Mobile app sudah aktif dengan layout yang dikunci ke pengalaman mobile."
                        />

                        <div className="space-y-3">
                            {quickActions.map((action) => (
                                <div
                                    className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-4"
                                    key={action}
                                >
                                    <span className="text-sm font-medium text-slate-800">{action}</span>
                                    <ChevronRight className="h-4 w-4 text-slate-400" />
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-3">
                            {highlights.map(({ title, description, icon: Icon }) => (
                                <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4" key={title}>
                                    <div className="mb-3 inline-flex rounded-xl bg-slate-900 p-3 text-white">
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                                </article>
                            ))}
                        </div>

                        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
                            <span>Laravel {laravelVersion}</span>
                            <span>PHP {phpVersion}</span>
                        </div>

                        <Link
                            className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                            href="/desktop"
                        >
                            Buka versi desktop
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
