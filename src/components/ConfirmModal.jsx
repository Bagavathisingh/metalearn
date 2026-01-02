import { useState, createContext, useContext } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState({
        title: 'CONFIRM_ACTION',
        message: '',
        onConfirm: () => { },
        type: 'warning' // 'warning' | 'danger' | 'info'
    });

    const showConfirm = (message, onConfirm, title = 'SYSTEM_CONFIRMATION', type = 'warning') => {
        setConfig({ title, message, onConfirm, type });
        setIsOpen(true);
    };

    const closeConfirm = () => setIsOpen(false);

    return (
        <ModalContext.Provider value={{ showConfirm }}>
            {children}
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-fade-in" onClick={closeConfirm} />

                    {/* Modal Card */}
                    <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-[2rem] p-8 shadow-2xl animate-scale-in overflow-hidden">
                        {/* Decorative Blobs */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-[80px] rounded-full" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full" />

                        {/* Content */}
                        <div className="relative z-10 space-y-6 text-center">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">{config.title}</p>
                                <div className="h-[1px] w-12 bg-white/10 mx-auto" />
                            </div>

                            <p className="text-slate-300 font-main text-sm leading-relaxed">
                                {config.message}
                            </p>

                            <div className="flex flex-col gap-3 pt-4">
                                <button
                                    onClick={() => { config.onConfirm(); closeConfirm(); }}
                                    className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 ${config.type === 'danger'
                                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/20'
                                            : 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                                        }`}
                                >
                                    Execute_Protocol
                                </button>
                                <button
                                    onClick={closeConfirm}
                                    className="w-full py-4 bg-white/5 text-white/40 font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-white/10 transition-all"
                                >
                                    Abort_Action
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
}

export function useConfirm() {
    return useContext(ModalContext);
}
