import { motion } from "framer-motion";

const TabBtn = ({ tab, text, my, setTab }: {
    tab: number;
    my: number;
    text: React.ReactNode;
    setTab: (tab: number) => void;
}) => {

    const spring = {
        type: "spring",
        stiffness: 500,
        damping: 30,
    };

    return (
        <button className={`px-4 relative py-2 rounded-md`} onClick={() => setTab(my)}>
            {tab === my &&
                <motion.div
                    layoutId="onTab"
                    initial={false}
                    transition={spring}
                    className="absolute top-0 left-0 w-full h-full bg-purple-100/5 rounded-md"
                />
            }
            <h1 className="text-white">{text}</h1>
        </button>
    )
}

export default TabBtn;