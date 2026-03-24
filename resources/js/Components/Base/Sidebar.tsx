import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Database, 
    Users,
    LineChart,
    Settings,
    ChevronDown,
    ChevronRight,
    Package,
    Recycle,
    Wallet,
    ShieldCheck
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface SubMenuItem {
    label: string;
    href: string;
    active: boolean;
}

interface MenuItemProps {
    label: string;
    icon: any;
    href?: string;
    active: boolean;
    children?: SubMenuItem[];
    isCollapsed?: boolean;
}

const NavMenu = ({ label, icon: Icon, href, active, children, isCollapsed }: MenuItemProps) => {
    const [isOpen, setIsOpen] = useState(active || children?.some(c => c.active));

    // Support persistence: keep open if child is active
    useEffect(() => {
        if (children?.some(c => c.active)) {
            setIsOpen(true);
        }
    }, [active, children]);

    if (isCollapsed) {
        return (
            <div className="mb-2 flex justify-center">
                <Link
                    href={children ? '#' : (href || '#')}
                    preserveScroll
                    className={`w-10 h-10 flex items-center justify-center rounded-sm transition-all duration-200 ${
                        active || children?.some(c => c.active)
                            ? 'bg-rose-600 text-white' 
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                    }`}
                    title={label}
                >
                    <Icon className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="mb-1">
            {children ? (
                <>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-all duration-200 ${
                            active || children?.some(c => c.active)
                                ? 'bg-rose-600 text-white' 
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                        }`}
                    >
                        <div className="flex items-center">
                            <Icon className={`w-5 h-5 me-3 ${active || children?.some(c => c.active) ? 'text-white' : 'text-slate-400'}`} />
                            {label}
                        </div>
                        {isOpen ? (
                            <ChevronDown size={14} className={active || children?.some(c => c.active) ? 'text-white/70' : ''} />
                        ) : (
                            <ChevronRight size={14} className={active || children?.some(c => c.active) ? 'text-white/70' : ''} />
                        )}
                    </button>
                    {isOpen && (
                        <div className="bg-slate-50/50 py-1">
                            {children.map((child) => (
                                <Link
                                    key={child.label}
                                    href={child.href}
                                    preserveScroll
                                    className={`flex items-center ps-12 pe-4 py-2.5 text-[13px] font-medium transition-all ${
                                        child.active 
                                            ? 'text-rose-600' 
                                            : 'text-slate-500 hover:text-slate-800'
                                    }`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full me-3 ${child.active ? 'bg-rose-600' : 'bg-slate-300'}`} />
                                    {child.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            ) : href ? (
                <Link
                    href={href}
                    preserveScroll
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        active 
                            ? 'bg-rose-600 text-white' 
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                >
                    <Icon className={`w-5 h-5 me-3 ${active ? 'text-white' : 'text-slate-400'}`} />
                    {label}
                </Link>
            ) : (
                <div
                    className="flex items-center px-4 py-3 text-sm font-medium text-slate-400 cursor-not-allowed opacity-60"
                >
                    <Icon className="w-5 h-5 me-3 text-slate-300" />
                    {label}
                </div>
            )}
        </div>
    );
};

export default function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Persist scroll position across navigations (remounts)
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const savedScroll = sessionStorage.getItem('sidebar-scroll-pos');
        if (savedScroll) {
            el.scrollTop = parseInt(savedScroll, 10);
        }

        const handleScroll = () => {
            sessionStorage.setItem('sidebar-scroll-pos', el.scrollTop.toString());
        };

        el.addEventListener('scroll', handleScroll);
        return () => el.removeEventListener('scroll', handleScroll);
    }, []);

    const menuGroups: {
        title: string;
        items: MenuItemProps[];
    }[] = [
        {
            title: '',
            items: [
                { label: 'Dashboard', icon: LayoutGrid, href: route('dashboard'), active: route().current('dashboard') },
            ]
        },
        {
            title: 'Operasional',
            items: [
                { label: 'Produksi Harian', icon: Recycle, href: route('operasional.produksi.index'), active: route().current('operasional.produksi.*') },
                { label: 'Pengiriman', icon: Wallet, href: route('operasional.pengiriman.index'), active: route().current('operasional.pengiriman.*') },
                { label: 'Persediaan', icon: Package, href: route('operasional.persediaan.index'), active: route().current('operasional.persediaan.*') },
            ]
        },
        {
            title: 'Analitik',
            items: [
                { label: 'Laporan Operasional', icon: LineChart, href: route('analitik.laporan-operasional'), active: route().current('analitik.laporan-operasional') },
            ]
        },
        {
            title: 'Kemitraan',
            items: [
                { label: 'Supplier', icon: Users, href: route('master.supplier.index'), active: route().current('master.supplier.*') },
            ]
        },
        {
            title: 'Master Data',
            items: [
                { 
                    label: 'Master Data', 
                    icon: Database, 
                    active: route().current('master.bahan-baku.*') || route().current('master.lokasi-gudang.*') || route().current('master.tim.*'),
                    children: [
                        { label: 'Tim Shift', href: route('master.tim.index'), active: route().current('master.tim.*') },
                        { label: 'Bahan Baku', href: route('master.bahan-baku.index'), active: route().current('master.bahan-baku.*') },
                        { label: 'Lokasi Gudang', href: route('master.lokasi-gudang.index'), active: route().current('master.lokasi-gudang.*') },
                    ]
                },
            ]
        },
        {
            title: 'Sistem',
            items: [
                { 
                    label: 'Tim & Operator', 
                    icon: Users, 
                    href: route('master.tim.index'),
                    active: route().current('master.tim.*'),
                },
                { 
                    label: 'Pengaturan', 
                    icon: Settings, 
                    active: route().current('sistem.pengaturan.*'),
                    children: [
                        { label: 'Alur Persetujuan', href: route('sistem.pengaturan.alur-persetujuan'), active: route().current('sistem.pengaturan.alur-persetujuan') },
                        // Placeholder menu lain jika diperlukan di masa depan
                    ]
                },
            ]
        }
    ];

    return (
        <aside className={`fixed inset-y-0 left-0 z-50 ${isCollapsed ? 'w-20' : 'w-60'} h-screen bg-white border-e border-slate-200 hidden lg:flex flex-col transition-all duration-300 ease-in-out`}>
            {/* Header / Logo */}
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-6'} h-20 border-b border-slate-100 gap-3 bg-white shrink-0 overflow-hidden`}>
                <div className="flex w-10 h-10 object-contain shrink-0 rounded-xl bg-kabta-purple text-white items-center justify-center text-sm font-bold">
                    AP
                </div>
                {!isCollapsed && (
                    <div className="flex flex-col whitespace-nowrap">
                        <span className="text-md font-bold text-kabta-purple tracking-tight leading-none">
                            Atur <span className="text-kabta-gold">Pabrik</span>
                        </span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                            Sistem Operasional
                        </span>
                    </div>
                )}
            </div>
            
            {/* Navigation Body */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto min-h-0 max-h-full pb-4 custom-scrollbar"
            >
                {menuGroups.map((group) => (
                    <div key={group.title} className={isCollapsed ? 'mb-2' : 'mb-4'}>
                        {!isCollapsed && group.title && (
                            <h5 className="px-4 text-[10px] font-medium text-slate-300 uppercase tracking-[0.2em]">
                                {group.title}
                            </h5>
                        )}
                        {isCollapsed && group.title && (
                            <div className="h-px bg-slate-100 mx-4 mb-2 opacity-50" />
                        )}
                        {group.items.map((item) => (
                            <NavMenu 
                                key={item.label}
                                label={item.label}
                                icon={item.icon}
                                href={item.href}
                                active={item.active}
                                children={item.children}
                                isCollapsed={isCollapsed}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Footer / Powered By */}
            <div className={`p-4 border-t border-slate-100 flex items-center ${isCollapsed ? 'justify-center' : 'gap-1'} bg-white shrink-0 overflow-hidden`}>
                {!isCollapsed && (
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                        Powered by
                    </span>
                )}
                <a
                    href="https://www.instagram.com/ahayde_hadd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xs text-blue-600 hover:text-blue-800 transition-colors ${isCollapsed ? 'font-bold' : ''}`}
                >
                    {isCollapsed ? 'H' : 'Had'}
                </a>
            </div>
        </aside>
    );
}
