import "./Providers.scss";

// Fonction Providers permettant d'afficher les plateformes de visionnage 
function Providers(providers: { providers: { results: { FR: { flatrate: any[]; rent: any[]; buy: any[]; free: any[]; ads: any[]; link: string }; }; }; }) {

    // Fonction handleClick permettant d'ouvrir le lien de redirection vers justWatch 
    function handleClick() {
        const justWatchLink = providers.providers.results.FR && providers.providers.results.FR.link;
        window.open(justWatchLink, '_blank');
    }

    return (

        <details className='movieFound__essentiel-detailPlateforms'>
            <summary className='movieFound__essentiel-detailPlateforms--details' >Film disponible sur :</summary>
            <section className='movieFound__essentiel-disponibility'>
                <div className='movieFound__essentiel-flatrate'>
                    {/* Si le film est disponible sur une plateforme de streaming alors affiche le titre "Plateforme" */}
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.flatrate &&
                        <h3 className='movieFound__essentiel-flatrate--title'>Plateforme</h3>
                    }
                    {/* Si le film est disponible sur une plateforme de streaming alors affiche la liste des plateformes et au click redirige vers justWatch */}
                    <ul className='movieFound__essentiel-flatrateList' onClick={handleClick}>
                        {
                            providers.providers.results.FR &&
                            providers.providers.results.FR.flatrate &&
                            providers.providers.results.FR.flatrate.map((flatrate) => (
                                <li key={flatrate.provider_id}>
                                    <a className='movieFound__essentiel-flatrateList--flaterate'>{flatrate.provider_name}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='movieFound__essentiel-rent'>
                    {/* Si le film est disponible en location alors affiche le titre "Location" */}
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.rent &&
                        <h3 className='movieFound__essentiel-rent--title'>Location</h3>
                    }
                    {/* Si le film est disponible en location alors affiche la liste des plateformes et au click redirige vers justWatch */}
                    <ul className='movieFound__essentiel-rentList' onClick={handleClick}>
                        {
                            providers.providers.results.FR &&
                            providers.providers.results.FR.rent &&
                            providers.providers.results.FR.rent.map((rent) => (
                                <li key={rent.provider_id}>
                                    <a className='movieFound__essentiel-rentList--rent'>{rent.provider_name}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='movieFound__essentiel-buy'>
                    {/* Si le film est disponible à l'achat alors affiche le titre "Achat" */}
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.buy &&
                        <h3 className='movieFound__essentiel-buy--title'>Achat</h3>
                    }
                    {/* Si le film est disponible à l'achat alors affiche la liste des plateformes et au click redirige vers justWatch */}
                    <ul className='movieFound__essentiel-buyList' onClick={handleClick}>
                        {
                            providers.providers.results.FR &&
                            providers.providers.results.FR.buy &&
                            providers.providers.results.FR.buy.map((buy) => (
                                <li key={buy.provider_id}>
                                    <a className='movieFound__essentiel-buyList--buy'>{buy.provider_name}</a>
                                </li>
                            ))
                        }

                    </ul>
                </div>
                <div className='movieFound__essentiel-free'>
                    {/* Si le film est disponible gratuitement alors affiche le titre "Gratuit" */}
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.free &&
                        <h3 className='movieFound__essentiel-free--title'>Gratuit</h3>
                    }
                    {/* Si le film est disponible gratuitement alors affiche la liste des plateformes et au click redirige vers justWatch */}
                    <ul className='movieFound__essentiel-freeList' onClick={handleClick}>
                        {
                            providers.providers.results.FR &&
                            providers.providers.results.FR.free &&
                            providers.providers.results.FR.free.map((free) => (
                                <li key={free.provider_id}>
                                    <a className='movieFound__essentiel-freeList--free'>{free.provider_name}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='movieFound__essentiel-ads'>
                    {/* Si le film est disponible sur une plateforme de streaming alors affiche le titre "Plus" */}
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.ads &&
                        <h3 className='movieFound__essentiel-ads--title'>Plus</h3>
                    }
                    {/* Si le film est disponible sur une plateforme de streaming alors affiche la liste des plateformes et au click redirige vers justWatch */}
                    <ul className='movieFound__essentiel-adsList' onClick={handleClick}>
                        {
                            providers.providers.results.FR &&
                            providers.providers.results.FR.ads &&
                            providers.providers.results.FR.ads.map((ads) => (
                                <li key={ads.provider_id}>
                                    <a className='movieFound__essentiel-adsList--ads'>{ads.provider_name}</a>
                                </li>
                            ))
                        }
                    </ul>
                </div>

            </section>
        </details>


    )
}

export default Providers;