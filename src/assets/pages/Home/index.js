import React, { useState, useEffect } from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const url = '/api/sites/MLB/search?q=cerveja';
                const response = await fetch(url);
                if (!response.ok) throw new Error('API request failed');
                const objJson = await response.json();
                setData(objJson.results);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchApi();
    }, []);

    const groupData = (data, size) => {
        const groupedData = [];
        for (let i = 0; i < data.length; i += size) {
            groupedData.push(data.slice(i, i + size));
        }
        return groupedData;
    };

    const CardCarousel = ({ data, loading }) => (
        <div className="mt-5">
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <Carousel>
                    {groupData(data, 6).map((group, index) => (
                        <Carousel.Item key={index}>
                            <div className="row">
                                {group.map((item) => (
                                    <div key={item.id} className="col-md-2">
                                        <div className="card">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="card-img-top"
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.title}</h5>
                                                <p className="card-text">R$ {item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    );

    const InfoBlock = ({ title, children }) => (
        <div className="info-block">
            <h4>{title}</h4>
            <p>{children}</p>
        </div>
    );

    const InfoCard = () => (
        <div className="info-card">
            <h3 className="info-title">O que é o Beer Maper?</h3>
            <InfoBlock title="Mapa de Cervejarias Locais">
                O Beer Maper é uma plataforma dedicada a conectar entusiastas de cerveja às melhores
                cervejarias artesanais da região.
            </InfoBlock>
            <InfoBlock title="Roteiros Personalizáveis">
                Crie e personalize seus próprios roteiros de visitação, explorando cervejarias com diferentes
                estilos.
            </InfoBlock>
            <InfoBlock title="Facilidade de Navegação">
                A plataforma é intuitiva, permitindo montar sua rota e localizar cervejarias próximas facilmente.
            </InfoBlock>
            <InfoBlock title="Eventos e Lançamentos">
                Fique por dentro dos eventos e lançamentos de cervejas exclusivas e sazonais.
            </InfoBlock>
            <InfoBlock title="Comunidade e Avaliações">
                Participe de uma comunidade de apaixonados por cerveja e compartilhe suas experiências.
            </InfoBlock>
            <InfoBlock title="Conteúdo Exclusivo">
                Acesse conteúdo exclusivo sobre o mundo das cervejas, como artigos e dicas sobre estilos e harmonizações.
            </InfoBlock>
        </div>
    );

    return (
        <div>
            <Header />
            <main className="home-section">
                <h2 className="section-title text-center">Conheça as Rotas Cervejeiras</h2>
                <div className="row align-items-center" style={{ margin: '0' }}>
                    <div className="col-md-6">
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1844560.7784706496!2d-51.6676791750246!3d-25.449702690386122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1scervejarias%20em%20guarapuava!5e0!3m2!1spt-BR!2sbr!4v1711928357904!5m2!1spt-BR!2sbr"
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps"
                            ></iframe>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="info-container">
                            <h3 className="info-title">Descubra as Cervejarias Locais</h3>
                            <InfoBlock title="Cervejarias Artesanais">
                                Explore as melhores cervejarias artesanais da região. Cada uma oferece sabores únicos
                                e experiências imperdíveis.
                            </InfoBlock>
                            <InfoBlock title="Rotas Personalizadas">
                                Monte sua própria rota de visitação, passando por cervejarias com diferentes estilos.
                            </InfoBlock>
                            <InfoBlock title="Novos Lançamentos">
                                Fique por dentro dos últimos lançamentos de cervejas exclusivas e sazonais.
                            </InfoBlock>
                        </div>
                    </div>
                </div>

                <CardCarousel data={data} loading={loading} />
                <div className="info-container-full">
                    <InfoCard />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
