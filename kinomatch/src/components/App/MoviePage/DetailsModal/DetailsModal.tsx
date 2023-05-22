import { Key, ReactNode } from 'react';
import './DetailsModal.scss';

{/* Création de l'interface pour Typescript */ }
interface DetailsModalProps {
    showDetailsModal: boolean;
    setShowDetailsModal: (showDetailsModal: boolean) => void;
    movie: any | null;
    credits: any | null;
    directingCrewMembers: any;
    formatDate: any;
    convertMinutesInHours: (showDetailsModal: any) => ReactNode;
}

{/* Fonction permettant de cacher la modale DetailsModal */ }
function DetailsModal(props: DetailsModalProps) {
    const { showDetailsModal, setShowDetailsModal, movie, credits, directingCrewMembers, formatDate, convertMinutesInHours } = props;

    {/* Fonction permettant de manipuler la modale. Au clique ==> passe de true à false et inversement */ }

    const handleDetailsModel = () => {
        setShowDetailsModal(!showDetailsModal);
    }

    {/* Fonctions permettant de trouver des personnes suivant leur job */ }

    const writingCrewMembers = credits.crew.filter((person: { job: string; }) => person.job === "Writer" || person.job === 'Screenplay');
    const musicCrewMembers = credits.crew.filter((person: { job: string; }) => person.job === "Music" || person.job === 'Original Music Composer');
    const costumeCrewMembers = credits.crew.filter((person: { job: string; }) => person.job === "Costume Design");
    const photographyCrewMembers = credits.crew.filter((person: { job: string; }) => person.job === "Director of Photography");
    const artCrewMembers = credits.crew.filter((person: { job: string; }) => person.job === "Art Direction");
    const designerCrewMembers = credits.crew.filter((person: { job: string; }) => person.job === "Production Design");


    return (
        <div className='detailsModal__container'>
            <div className='detailsModal__container-image'>
                <h3 className='detailsModal__container-originalTitle'>Titre original</h3>
                <p className='detailsModal__container-originalTitleName'>{movie.original_title}</p>
                <div className='detailsModal__container-image--container'>
                    <img className='detailsModal__container-image--container--movie' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="Affiche du film" />
                    {movie.homepage ? (<a className='detailsModal__container-image--container--link' href={movie.homepage} target='_blank'>Page du film</a>) : null}
                </div>
            </div>
            <div className='detailsModal__container-details'>
                <div className='detailsModal__container-details--principal'>
                    <h3 className='detailsModal__container-director'>{directingCrewMembers.length > 1 ? 'Réalisateurs' : 'Réalisateur'}</h3>
                    <ul className='detailsModal__container-directorList'>
                        {
                            directingCrewMembers.map((director: { id: Key | null | undefined; name: string }) => (
                                <li key={director.id} className='detailsModal__container-directorName'>{director.name}</li>

                            ))
                        }
                    </ul>
                    <h3 className='detailsModal__container-screenwriter'>Scénariste</h3>
                    <ul className='detailsModal__container-screenwriterList'>
                        {
                            writingCrewMembers.map((writer: { id: Key | null | undefined; name: string }) => (
                                <li key={writer.id} className='detailsModal__container-screenwriterName'>{writer.name}</li>

                            ))
                        }
                    </ul>
                    {/* <p className='detailsModal__container-screenwriterName'>James Gunn</p> */}
                    <h3 className='detailsModal__container-producers'>Sociétés de production</h3>
                    <ul className='detailsModal__container-producers-list'>
                        {/* Affichage de la liste des sociétés de production */}
                        {
                            movie.production_companies.map((production_company: { key: Key | number | undefined; name: string }) => (
                                <li key={Math.random()} className='detailsModal__container-producers-list-name'>{production_company.name}</li>
                            ))
                        }
                    </ul>
                    <h3 className='detailsModal__container-distributionCompany'>Sociétés de distribution</h3>
                    <p className='detailsModal__container-distributionCompanyName'>###Walt Disney Studios Motion Pictures###</p>
                    <h3 className='detailsModal__container-productionCountry'>Pays de production</h3>
                    <ul className='detailsModal__container-productionCountry-list'>
                        {/* Affichage de la liste des pays de production */}
                        {
                            movie.production_countries.map((production_country: { iso_3166_1: Key | null | undefined; name: string }) => (
                                <li key={production_country.iso_3166_1} className='detailsModal__container-productionCountry-list-country'>{production_country.name}</li>
                            ))
                        }
                    </ul>
                    <h3 className='detailsModal__container-budget'>Budget</h3>
                    <p className='detailsModal__container-budgetAmount'>{movie.budget.toLocaleString('us-US')} $</p>

                    <h3 className='detailsModal__container-revenue'>Recettes</h3>
                    <p className='detailsModal__container-revenueAmount'>{movie.revenue.toLocaleString('us-US')} $</p>

                    <h3 className='detailsModal__container-duration'>Durée</h3>
                    <p className='detailsModal__container-durationTime'>{convertMinutesInHours(movie.runtime)}</p>

                    <h3 className='detailsModal__container-date'>Date de sortie</h3>
                    <p className='detailsModal__container-dateName'>{formatDate(movie.release_date)}</p>
                </div>
                <div className='detailsModal__container-details--secondary'>

                    <h3 className='detailsModal__container-composer'>Musique</h3>
                    <ul className='detailsModal__container-composerList'>
                        {
                            musicCrewMembers.map((composer: { id: Key | null | undefined; name: string }) => (
                                <li key={composer.id} className='detailsModal__container-composerName'>{composer.name}</li>
                            ))
                        }
                    </ul>
                    <h3 className='detailsModal__container-artisticDirection'>Direction artistique</h3>
                    <ul className='detailsModal__container-artistsList'>
                        {
                            artCrewMembers.map((artist: { id: Key | null | undefined; name: string }) => (
                                <li key={artist.id} className='detailsModal__container-artists'>{artist.name}</li>
                            ))
                        }
                    </ul>
                    <h3 className='detailsModal__container-productionDesigner'>Décors</h3>
                    <ul className='detailsModal__container-productionDesignerList'>
                        {
                            designerCrewMembers.map((designer: { id: Key | null | undefined; name: string }) => (
                                <li key={designer.id} className='detailsModal__container-designers'>{designer.name}</li>
                            ))
                        }
                    </ul>
                    <h3 className='detailsModal__container-costuming'>Costumes</h3>
                    <ul className='detailsModal__container-costumingList'>
                        {
                            costumeCrewMembers.map((costumeDesigner: { id: Key | null | undefined; name: string }) => (
                                <li key={costumeCrewMembers.id} className='detailsModal__container-costumeDesigner'>{costumeDesigner.name}</li>
                            ))
                        }
                    </ul>
                    <h3 className='detailsModal__container-photography'>Photographie</h3>
                    <ul className='detailsModal__container-photographyList'>
                        {
                            photographyCrewMembers.map((photographer: { id: Key | null | undefined; name: string }) => (
                                <li key={photographer.id} className='detailsModal__container-photographer'>{photographer.name}</li>
                            ))
                        }
                    </ul>

                    <h3 className='detailsModal__container-genreTitle'>Genres</h3>
                    <ul className='detailsModal__container-genreList'>
                    {
                        movie.genres.map((genre: { id: Key | null | undefined; name: string }) => (
                            <li key={genre.id} className='detailsModal__container-genre'>{genre.name}</li>
                        ))
                    }
                    </ul>
                </div>
            </div>
            <div className='detailsModal__container-distributionList'>
                <div className='detailsModal__container-distribution'>
                    <h3 className='detailsModal__container-distribution-title'>Distribution</h3>
                    <ul className='detailsModal__container-actorsList'>
                        {
                            credits.cast.map((actor: { id: Key | null | undefined; name: string; profile_path: string; character: string }) => (
                                <li key={actor.id} className='detailsModal__container-actor'>
                                    <h4 className='detailsModal__container-actor--title'>{actor.name}</h4>
                                    <img className='detailsModal__container-actor--image' src={`https://image.tmdb.org/t/p/original/t/p/w138_and_h175_face//${actor.profile_path}`} alt={`Photo de ${actor.name}`} />
                                    <p className='detailsModal__container-actor--role'>{actor.character}</p>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className='detailsModal__container-button'>
                <button className='detailsModal__container-button--btn' onClick={handleDetailsModel}>Retour</button>
            </div>
        </div>
    )
}

export default DetailsModal;
