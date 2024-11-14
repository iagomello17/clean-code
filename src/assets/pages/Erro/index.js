import { Link } from 'react-router-dom';

function Erro() {
    return (
        <div>
            <h2>Ops! Parece que essa página não existe! o tal do 404</h2>
            <span>Encontramos essas páginas aqui:</span>

            <Link to='/Home'>Home</Link><br/>
            <Link to='/Loja'>Loja</Link><br/>
            <Link to='/Login'>Entrar</Link><br/>
        </div>
    );
}

export default Erro;