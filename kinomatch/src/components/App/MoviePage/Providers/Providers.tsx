import "./Providers.scss";


function Providers(providers: { providers: { results: { FR: { flatrate: any[]; rent: any[]; buy: any[]; free: any[]; }; }; }; }) {


    return (


        <section className='movieFound__essentiel-disponibility'>
            <div className='movieFound__essentiel-flatrate'>
                <ul className='movieFound__essentiel-flatrateList'>
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.flatrate &&
                        providers.providers.results.FR.flatrate.map((flatrate) => (
                            <li key={flatrate.provider_id}>
                                <a className='movieFound__essentiel-flatrateList--flaterate' href='#' target='_blank'>{flatrate.provider_name}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='movieFound__essentiel-rent'>
                <ul className='movieFound__essentiel-rentList'>
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.rent &&
                        providers.providers.results.FR.rent.map((rent) => (
                            <li key={rent.provider_id}>
                                <a className='movieFound__essentiel-rentList--rent' href='#' target='_blank'>{rent.provider_name}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className='movieFound__essentiel-buy'>
                <ul className='movieFound__essentiel-buyList'>
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.buy &&
                        providers.providers.results.FR.buy.map((buy) => (
                            <li key={buy.provider_id}>
                                <a className='movieFound__essentiel-buyList--buy' href='#' target='_blank'>{buy.provider_name}</a>
                            </li>
                        ))
                    }

                </ul>
            </div>
            <div className='movieFound__essentiel-free'>
                <ul className='movieFound__essentiel-freeList'>
                    {
                        providers.providers.results.FR &&
                        providers.providers.results.FR.free &&
                        providers.providers.results.FR.free.map((free) => (
                            <li key={free.provider_id}>
                                <a className='movieFound__essentiel-freeList--free' href='#' target='_blank'>{free.provider_name}</a>
                            </li>
                        ))
                    }

                </ul>
            </div>

        </section>

    )
}

export default Providers;