import { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/globals.scss"
import type { AppProps } from 'next/app';
import AOS from 'aos';

// Importações de estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Importar o JS do Bootstrap
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
    
    // Inicializar o AOS
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return <Component {...pageProps} />
}

export default MyApp;