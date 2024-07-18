import { useState, FC } from "react";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { sideBatItems } from "../../../../datasource/entities/sidebaritems_data";
import { useNavigate } from "react-router-dom";
import "./menu.css";

/**
 * Props para el componente SideMenu
 * @property {() => void} handleHide - Función para manejar la ocultación del menú lateral
 * @property {boolean} show - Indica si el menú lateral se muestra u oculta
 */
interface SideMenuProps {
    handleHide: () => void;
    show: boolean;
}

/**
 * Componente principal Menu
 * Muestra un icono de barras para abrir el menú lateral.
 * Al hacer clic en el icono de barras, muestra el menú lateral.
 */
const Menu: FC = () => {
    const [hide, setHide] = useState<boolean>(true);

    /**
     * Alterna el estado de ocultar/mostrar el menú lateral
     */
    const toggleHide = () => setHide(!hide);

    return (
        <>
            {hide ? (
                <FaBars className="icon-menu" onClick={toggleHide} />
            ) : (
                <SideMenu show={hide} handleHide={toggleHide} />
            )}
        </>
    );
};

/**
 * Componente SideMenu
 * Muestra el menú lateral con elementos de navegación.
 * @param {SideMenuProps} props - Las propiedades del componente
 * @param {() => void} props.handleHide - Función para manejar la ocultación del menú lateral
 * @param {boolean} props.show - Indica si el menú lateral se muestra u oculta
 */
const SideMenu: FC<SideMenuProps> = ({ handleHide, show }) => {
    const navigate = useNavigate();

    /**
     * Maneja el clic en un elemento del menú para navegar a la ruta especificada
     * y ocultar el menú lateral.
     * @param {string} route - La ruta a la que se debe navegar
     */
    const handleItemClick = (route: string) => {
        navigate(route);
        handleHide();
    };

    return (
        <div className={show.toString()}>
            <IoCloseSharp onClick={handleHide} className="icon-menu mb-6" />
            <div className="header">
                <img
                    className=""
                    src="https://www.losprocereshn.com/wp-content/uploads/go-x/u/c0a2fc92-e652-4c21-b82a-6b786788844a/image-640x283.png"
                    alt="Logo"
                />
            </div>
            {sideBatItems.map((item, index) => (
                <ul key={index} className="links-container">
                    <a className="link" onClick={() => handleItemClick(item.href)}>
                        {item.title}
                    </a>
                </ul>
            ))}
        </div>
    );
};

export default Menu;
