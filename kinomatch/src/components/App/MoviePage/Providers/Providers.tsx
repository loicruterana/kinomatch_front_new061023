import "./Providers.scss";


function Providers(providers: { providers: { results: { FR: { flatrate: any[]; rent: any[]; buy: any[]; free: any[]; ads: any[]; link: string }; }; }; }) {


    function handleClick() {
        const justWatchLink = providers.providers.results.FR && providers.providers.results.FR.link;
        window.open(justWatchLink, '_blank');
    }

    return (

        <details className='movieFound__essentiel-detailPlateforms'>
            <summary className='movieFound__essentiel-detailPlateforms--details' >Film disponible sur :</summary>
            <section className='movieFound__essentiel-disponibility'>
                <div className='movieFound__essentiel-flatrate'>
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.flatrate &&
                        <h3 className='movieFound__essentiel-flatrate--title'>Plateforme</h3>
                    }
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
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.rent &&
                        <h3 className='movieFound__essentiel-rent--title'>Location</h3>
                    }
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
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.buy &&
                        <h3 className='movieFound__essentiel-buy--title'>Achat</h3>
                    }
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
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.free &&
                        <h3 className='movieFound__essentiel-free--title'>Gratuit</h3>
                    }
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
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.ads &&
                        <h3 className='movieFound__essentiel-ads--title'>Plus</h3>
                    }
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

            </section></details>


    )
}

export default Providers;