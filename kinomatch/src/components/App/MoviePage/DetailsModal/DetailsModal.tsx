import { useState } from 'react';
import './DetailsModal.scss';

{/* Création de l'interface pour Typescript */ }
interface DetailsModalProps {
    showDetailsModal: boolean;
    setShowDetailsModal: (showDetailsModal: boolean) => void;
    movie: unknown;
    credits: unknown;
    providers: unknown;
}

{/* Fonction permettant de cacher la modale DetailsModal */ }
function DetailsModal(props: DetailsModalProps) {
    const { showDetailsModal, setShowDetailsModal, movie, credits, providers } = props;

    {/* Fonction permettant de manipuler la modale. Au clique ==> passe de true à false et inversement */ }

    const handleDetailsModel = () => {
        setShowDetailsModal(!showDetailsModal);
    }

    return (
        <div className='detailsModal__container'>
            <div className='detailsModal__container-image'>
                <h3 className='detailsModal__container-originalTitle'>Titre original</h3>
                <p className='detailsModal__container-originalTitleName'>{movie?.original_title}</p>
                <div className='detailsModal__container-image--container'>
                    <img className='detailsModal__container-image--container--movie' src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} alt="Affiche du film" />
                    {movie.homepage ? (<a className='detailsModal__container-image--container--link' href={movie?.homepage} target='_blank'>Page du film</a>) : null}
                </div>
            </div>
            <div className='detailsModal__container-details'>
                <div className='detailsModal__container-details--principal'>
                    <h3 className='detailsModal__container-director'>Réalisateur</h3>
                    <p className='detailsModal__container-directorName'>James Gunn</p>
                    <h3 className='detailsModal__container-screenwriter'>Scénariste</h3>
                    <p className='detailsModal__container-screenwriterName'>James Gunn</p>
                    <h3 className='detailsModal__container-producers'>Sociétés de production</h3>
                    <ul className='detailsModal__container-producers-list'>
                        {/* Affichage de la liste des sociétés de production */}
                        {
                            movie &&
                            movie.production_companies.map((production_company) => (
                                <li key={production_company.id} className='detailsModal__container-producers-list-name'>{production_company.name}</li>
                            ))
                        }
                    </ul>
                    <h3 className='detailsModal__container-distributionCompany'>Sociétés de distribution</h3>
                    <p className='detailsModal__container-distributionCompanyName'>Walt Disney Studios Motion Pictures</p>
                    <h3 className='detailsModal__container-productionCountry'>Pays de production</h3>
                    <ul className='detailsModal__container-productionCountry-list'>
                        {/* Affichage de la liste des pays de production */}
                        {
                            movie &&
                            movie.production_countries.map((production_country) => (
                                <li key={production_country.id} className='detailsModal__container-productionCountry-list-country'>{production_country.name}</li>
                            ))
                        }
                    </ul>
                    {/* <p className='detailsModal__container-productionCountry'>Etats-unis</p> */}
                    <h3 className='detailsModal__container-budget'>Budget</h3>
                    <p className='detailsModal__container-budgetAmount'>{movie?.budget}$</p>
                    <h3 className='detailsModal__container-revenue'>Recettes</h3>
                    <p className='detailsModal__container-revenueAmount'>{movie?.revenue}$</p>
                </div>
                <div className='detailsModal__container-details--secondary'>
                    <h3 className='detailsModal__container-distribution'>Distribution</h3>
                    <ul className='detailsModal__container-actorsList'>
                        {
                            credits &&
                            credits.cast.map((actor) => (
                        <li className='detailsModal__container-actor'>{actor.name}</li>
                            ))
                        }
                        <li className='detailsModal__container-actor'>Chris Pratt: Peter Quill / Star Lord</li>
                        <li className='detailsModal__container-actor'>Zoe Saldana: Gamora</li>
                        <li className='detailsModal__container-actor'>Will Poulter: Adam Warlock</li>
                        <li className='detailsModal__container-actor'>Pom Klementieff: Mantis</li>
                        <li className='detailsModal__container-actor'>Chris Pratt: Peter Quill / Star Lord</li>
                        <li className='detailsModal__container-actor'>Karen Gillan: Nebula</li>
                    </ul>
                    <h3 className='detailsModal__container-composer'>Musique</h3>
                    <p className='detailsModal__container-composerName'>John Murphy</p>
                    <h3 className='detailsModal__container-artisticDirection'>Direction artistique</h3>
                    <p className='detailsModal__container-artists'>Samantha Avila, Zachary Fannin, Lorin Flemming, Alex Gaines, Brittany Hites, Alan Hook et David Scott</p>
                    <h3 className='detailsModal__container-costuming'>Costumes</h3>
                    <p className='detailsModal__container-costumingArtists'>Judianna Makovsky</p>
                    <h3 className='detailsModal__container-photography'>Photographie</h3>
                    <p className='detailsModal__container-costumingArtists'>Henry Braham</p>
                    <h3 className='detailsModal__container-date'>Date de sortie</h3>
                    <p className='detailsModal__container-dateName'>3 mai 2023</p>
                    <h3 className='detailsModal__container-genreTitle'>Genres</h3>
                    <p className='detailsModal__container-genre'>Science-fiction, Action, Aventure, Super-héros</p>
                </div>
            </div>
            <div className='detailsModal__container-button'>
                <button className='detailsModal__container-button--btn' onClick={handleDetailsModel}>Retour</button>
            </div>
        </div>
    )
}

export default DetailsModal;
