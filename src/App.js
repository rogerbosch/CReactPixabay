import React, {useEffect, useState} from 'react';
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
    //state de la app
    const [busqueda, setBusqueda] = useState('');
    const [imagenes, setImanegenes] = useState([]);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    useEffect(() => {
        const consultarAPI = async () => {
            if (busqueda.trim() === '') {
                return;
            }
            const imagenesPorPagina = 30;
            const key = "11269280-352f4b820a3d2f2e1025bd79a";
            const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&image_type=photo&per_page=${imagenesPorPagina}&page=${paginaActual}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            setImanegenes(resultado.hits);
            //calcular total paginas
            const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
            setTotalPaginas(calcularTotalPaginas);

            //Mover pantalla superior
            const jumbotron = document.querySelector('.jumbotron');
            jumbotron.scrollIntoView({behavior: 'smooth'});
        }
        consultarAPI();
    }, [busqueda,paginaActual]);

    const paginaAnterior = () => {
        const nuevaPaginaActual = paginaActual - 1;
        if (nuevaPaginaActual === 0) return;
        setPaginaActual(nuevaPaginaActual);
    }
    const paginaSiguiente = () => {
        const nuevaPaginaActual = paginaActual + 1;
        if (nuevaPaginaActual === totalPaginas) return;
        setPaginaActual(nuevaPaginaActual);
    }
    return (
        <div className="container">
            <div className="jumbotron">
                <p className="lead text-center">
                    Buscador de imágenes
                </p>
                <Formulario
                    setBusqueda={setBusqueda}/>
            </div>
            <div className="row justify-content-center">
                <ListadoImagenes imagenes={imagenes}/>
                {paginaActual === 1 ? null :
                    <button
                        type="button"
                        className="btn btn-info mr-1"
                        onClick={paginaAnterior}>
                        &laquo; Anterior
                    </button>}
                {paginaActual === totalPaginas ? null :
                    <button
                        type="button"
                        className="btn btn-info mr-1"
                        onClick={paginaSiguiente}>
                        Siguiente &raquo;
                    </button>
                }
            </div>
        </div>
    );
}

export default App;
