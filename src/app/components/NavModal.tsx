import { useContext, useState } from "react";
import { CalendarContext } from "../context/CalendarContext";



interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];




export const NavModal = ({isOpen, onClose }: ModalProps) => {
    const {setSelectedMonth, selectedYear, setSelectedYear} = useContext(CalendarContext);
    const [tempYear, setTempYear] = useState(selectedYear);
    
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    
    if (!isOpen) return null;
    
    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="nav-modal-container">
                <div className="nav-modal-header-container">
                    <button className="nav-modal-year-change" onClick={() => {setTempYear(tempYear-1)}}> {"<"} </button>
                    <header className="nav-modal-header"> {tempYear}</header>
                    <button className="nav-modal-year-change" onClick={() => {setTempYear(tempYear+1)}}> {">"} </button>
                </div>
                <div className = "nav-modal-months">
                {monthNames.map((_,index) => (
                    <button 
                        key={`empty-${index}`} 
                        className={`calendar-nav-button${index === new Date().getMonth() && tempYear === new Date().getFullYear() ? ' nav-modal-current-month' : ''}`}
                        onClick={() => {
                            setSelectedMonth(index); 
                            setSelectedYear(tempYear);
                            onClose();}}>
                        {monthNames[index]}
                    </button>
                ))}
                </div>
            </div>
        </div>
    );
}
 