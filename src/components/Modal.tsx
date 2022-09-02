import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react';

const Modal = ({
    open, setOpen, children
}: {
    open: boolean;
    children: React.ReactNode;
    setOpen: (open: boolean) => void;
}) => {

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "auto";
    }, [open])

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div
                        initial={{ scaleX: 0, scaleY: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        animate={{ scaleX: [0, 1, 1], scaleY: [0, 0.02, 0.02, 0.02, 1] }}
                        className="bg-dark-light w-[90vw] h-[80vh] md:w-[60vw] md:h-[70vh] rounded-md p-5"
                    >
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl text-purple-400">Response</h1>
                            <button onClick={() => setOpen(false)} className="focus:outline-none focus:border-purple-400 rounded-md p-1 border-2 border-transparent">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div>
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default Modal