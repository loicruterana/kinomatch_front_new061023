// ================ IMPORT BIBLIOTHEQUES ================
import React, { useContext, useEffect, useState } from 'react';
import { Genre, ProviderHome, Nationality } from '../../../../utils/interfaces';

// ================ IMPORT CONTEXTS ================
import { SelectedGenreFiltersContext } from '../../../../contexts/SelectedGenreFiltersContext';
import { SelectedProviderFiltersContext } from '../../../../contexts/SelectedProviderFiltersContext';
import { SelectedDecadeFiltersContext } from '../../../../contexts/SelectedDecadeFiltersContext';
import { SelectedNotationFiltersContext } from '../../../../contexts/SelectedNotationFiltersContext';
import { SelectedNationalityFiltersContext } from '../../../../contexts/SelectedNationalityFiltersContext';

// ================ INTERFACES ================
interface RollGenreProps {
  preselectedGenres: Genre[];
  preselectedProviders: ProviderHome[];
  preselectedNationalities: Nationality[];
  mobileVersion: boolean;
  showRollGenre: boolean;
  showRollProvider: boolean;
  showRollDecade: boolean;
  showRollNotation: boolean;
  showRollNationality: boolean;
  isLoading: boolean;
  handleClickOut: () => void;
}

//* ================ COMPOSANT ================

export const RollGenre = ({
  preselectedGenres,
  preselectedProviders,
  preselectedNationalities,
  mobileVersion,
  showRollGenre,
  showRollProvider,
  showRollDecade,
  showRollNotation,
  showRollNationality,
  isLoading,
  handleClickOut,
}: RollGenreProps) => {
  // const effectRan = useRef(false);

  // ================ UTILS ================

  const decades = [];

  for (let i = 2020; i >= 1890; i -= 10) {
    decades.push(i);
  }

  const notations = [];

  for (let i = 90; i >= 0; i -= 10) {
    notations.push(i);
  }

  // ================ IMPORT PROPS CONTEXTS ================

  const { addGenreFilter, selectedGenreFilters } = useContext(
    SelectedGenreFiltersContext
  );
  const { addProviderFilter, selectedProviderFilters } = useContext(
    SelectedProviderFiltersContext
  );
  const { addDecadeFilter, selectedDecadeFilters } = useContext(
    SelectedDecadeFiltersContext
  );

  const { addNotationFilter, selectedNotationFilters } = useContext(
    SelectedNotationFiltersContext
  );

  const { addNationalityFilter, selectedNationalityFilters } = useContext(
    SelectedNationalityFiltersContext
  );

  const [selectedDecade, setSelectedDecade] = useState<string>('');

  // ================ USESTATE ================

  // useState permettant de stocker les nationalités trouvées
  const [countriesFound, setCountriesFound] = useState(preselectedNationalities);
  // useState permettant de stocker la valeur de searchValue
  const [searchValue, setSearchValue] = useState('');

  // ================ HANDLERS ================

  // handler pour envoyer les choix de filtres à la fonction addGenreFilter du contexte SelectedGenreFiltersContext et donc stocker les filtres genre dans le state
  function handleGenreClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = event.target as HTMLButtonElement;
    const name = target.textContent;
    const genreId = target.dataset.id;
    if (name !== null && genreId !== undefined) {
      addGenreFilter(name, genreId);
    }
  }
  // handleProviderClick pour envoyer les choix de filtres à la fonction addProviderFilter du contexte SelectedProviderFiltersContext et donc stocker les filtres provider dans le state
  function handleProviderClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = event.target as HTMLButtonElement;
    const name = target.textContent;
    const providerId = target.dataset.id;
    if (name !== null && providerId !== undefined) {
      addProviderFilter(name, providerId);
    }


  }

  // handleDecadeClick pour envoyer les choix de filtres à la fonction addDecadeFilter du contexte SelectedDecadeFiltersContext et donc stocker le filtre decade dans le state
  function handleDecadeClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = event.target as HTMLButtonElement;
    const filter = target.textContent;
    if (filter !== null) {
      addDecadeFilter(filter);

      // Je récupère uniquement la dernière valeur cliquée et supprime la précédente
      const lastDecade = filter;
      setSelectedDecade(lastDecade);
    }



  }

  // handleNotationClick pour envoyer les choix de filtres à la fonction addNotationFilter du contexte SelectedNotationFiltersContext et donc stocker le filtre notation dans le state
  function handleNotationClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = event.target as HTMLButtonElement;
    const filter = target.textContent;
    if (filter !== null) {
      // ici on va filtrer la constante filter afin de ne récupérer que le nombre
      const filterNumber = filter.replace(/\D/g, '');
      addNotationFilter(filterNumber);
    }
  }

  // handleNationalityClick pour envoyer les choix de filtres à la fonction addNationalityFilter du contexte SelectedNationalityFiltersContext et donc stocker le filtre nationalité dans le state
  function handleNationalityClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    // ici on récupère le nom et l'id de la nationalité
    const target = event.target as HTMLButtonElement;
    const name = target.textContent;
    const nationalityId = target.dataset.id;
    // ici on vérifie que le nom et l'id ne sont pas null ou undefined
    if (name !== null && nationalityId !== undefined) {
      addNationalityFilter(name, nationalityId);
    }
    else {
      return
    }
  }


  // ================ USEEFFECT ================

  // On créer un useEffect afin de pouvoir utiliser la fonction de recherche de nationalité
  useEffect(() => {
    // if (effectRan.current === true) {

    // Fonction permettant de chercher les nationalités en fonction de la recherche de l'utilisateur
    const searchNationality = document.getElementById('nationalitySearch');
    // On place un écouteur d'évenements sur l'input de recherche
    const handleInputChange = (event: any) => {
      const searchValue = event.target.value.toLowerCase();
      setSearchValue(searchValue);
      const matchedCountries = preselectedNationalities.filter((country) => {
        return country.native_name.toLowerCase().startsWith(searchValue);
      });
      setCountriesFound(matchedCountries);
    };
    searchNationality?.addEventListener('input', handleInputChange);

    return () => {
      searchNationality?.removeEventListener('input', handleInputChange);
    };
    // }
    // return () => {
    //   effectRan.current = true;
    // };
  }, [preselectedNationalities, countriesFound]);


  console.log(selectedDecadeFilters);
  console.log(selectedDecade);
  // ================ JSX ================
  return (
    <>
      {/* Bouton de validation pour la version mobile */}
      <div
        className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
          }__validation`}
      >
        <button onClick={handleClickOut} aria-label='Valider'>
          Valider
        </button>
      </div>

      {/* Affichage des rolls, avec un affichage différent en fonction des filtres sélectionnés */}
      <div
        className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
          }__filterRoll`}
        style={
          !mobileVersion
            ? selectedGenreFilters.length > 0 ||
              selectedProviderFilters.length > 0 ||
              selectedDecadeFilters.length > 0 ||
              selectedNotationFilters.length > 0 ||
              selectedNationalityFilters.length > 0
              ? { paddingBottom: '170px' }
              : { paddingBottom: '120px' }
            : { paddingBottom: '0px' }
        }
      >
        {/* ROLL GENRE */}
        <div
          className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll-backgroundContainer`}
        >
          <div
            className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll-background`}
          >
            {((showRollGenre && mobileVersion) || !mobileVersion) && (
              <div
                className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container`}
              >
                <div
                  className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                    }__roll-container__item-category`}
                >
                  GENRE
                </div>
                {isLoading
                  ? 'Chargement en cours'
                  : preselectedGenres.map((preselectedGenre) => (
                    <button
                      className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                        }__roll-container__item-genre${selectedGenreFilters.some(
                          (item) =>
                            item.id.toString() ===
                            preselectedGenre.id.toString()
                        )
                          ? '-selected'
                          : ''
                        }`}
                      key={preselectedGenre.id}
                      onClick={handleGenreClick}
                      data-id={preselectedGenre.id}
                      aria-label={preselectedGenre.name} // Ajout de l'aria-label
                    >
                      <img
                        className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                          }__roll-container__item-genre--image${selectedGenreFilters.some(
                            (item) =>
                              item.id.toString() ===
                              preselectedGenre.id.toString()
                          )
                            ? '-selected'
                            : ''
                          }`
                        }
                        src={
                          selectedGenreFilters.find(
                            (item) =>
                              item.id.toString() ===
                              preselectedGenre.id.toString()
                          )
                            ? `images/moodlogosnopelloche/${preselectedGenre.id}b.png`
                            : `images/moodlogosnopelloche/${preselectedGenre.id}.png`
                        }
                      ></img>
                      {preselectedGenre.name}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* ROLL PROVIDERS */}
        <div
          className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll-backgroundContainer`}
        >
          <div
            className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll-background`}
          >
            {((showRollProvider && mobileVersion) || !mobileVersion) && (
              <div
                className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container`}
              >
                <div
                  className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                    }__roll-container__item-category`}
                >
                  PLATEFORME
                </div>
                {isLoading
                  ? 'Chargement en cours'
                  : preselectedProviders.map((preselectedProvider) => (
                    <button
                      className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                        }__roll-container__item-provider${selectedProviderFilters.some(
                          (item) =>
                            item.provider_id.toString() ===
                            preselectedProvider.provider_id.toString()
                        )
                          ? '-selected'
                          : ''
                        }`}
                      onClick={handleProviderClick}
                      data-id={preselectedProvider.provider_id}
                      key={preselectedProvider.provider_id}
                      aria-label={preselectedProvider.provider_name} // Ajout de l'aria-label
                    >
                      {preselectedProvider.provider_name}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* ROLL DECENNIES */}
        <div
          className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll-backgroundContainer`}
        >
          <div
            className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll-background`}
            onClick={handleClickOut}
          >
            {((showRollDecade && mobileVersion) || !mobileVersion) && (
              <div
                className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container`}
              >
                <div
                  className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                    }__roll-container__item-category`}
                >
                  DÉCENNIE
                </div>

                {decades.map((decade, index) => (
                  <button
                    key={index}
                    className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                        }__roll-container__item-decade${selectedDecadeFilters.length === 1 && Number(selectedDecadeFilters[0]) === decade
                        ? '-selected'
                        : Array.from(
                            { length: Math.abs(Number(selectedDecadeFilters[0]) - Number(selectedDecadeFilters[1])) + 1 },
                            (_, i) => i + Math.min(Number(selectedDecadeFilters[0]), Number(selectedDecadeFilters[1]))
                          ).some((item) => item === decade)
                        ? '-selected'
                        : ''
                      }`}
                    onClick={handleDecadeClick}
                    data-id={decade}
                    aria-label={decade.toString()} // Ajout de l'aria-label
                  >
                    {decade}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* ROLL NOTES */}
        <div
          className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll-backgroundContainer`}
        >
          <div
            className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll-background`}
            onClick={handleClickOut}
          >
            {((showRollNotation && mobileVersion) || !mobileVersion) && (
              <div
                className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container`}
              >
                <div
                  className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                    }__roll-container__item-category`}
                >
                  NOTE
                </div>

                {notations.map((notation, index) => (
                  <button
                    key={index}
                    className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                      }__roll-container__item-decade${selectedNotationFilters.some(
                        (item) => item.toString() === notation.toString()
                      )
                        ? '-selected'
                        : ''
                      }`}
                    onClick={handleNotationClick}
                    aria-label={notation.toString()} // Ajout de l'aria-label
                  >
                    {`> ${notation} %`}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {/*ROLL NATIONALITY*/}
        <div
          className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
            }__roll-backgroundContainer`}
        >
          <div
            className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
              }__roll-background`}
          >
            {((showRollNationality && mobileVersion) || !mobileVersion) && (
              <div
                className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container`}
              >
                <div
                  className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                    }__roll-container__item-category`}
                >
                  NATIONALITÉ
                </div>

                {/* ===================== SYNTHÉTISER LES DEUX MAPS CI-DESSOUS EN UNE SEULE MAP ========================== */}

                {/* Ici, on va créer un formulaire de recherche pour la nationalité*/}
                <input type="text" className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                  }__roll-container__item-nationalitySearch`} id='nationalitySearch' placeholder='Entrer un choix' />
                {isLoading
                  ? 'Chargement en cours'
                  // ici, si coutriesFound est vide et que l'utilisateur n'a tapé aucun caractère dans l'input, on boucle sur preselectedNationalities, sinon on boucle sur countriesFound
                  : countriesFound.length === 0 && searchValue === ''
                    ? preselectedNationalities.map((preselectedNationality) => (
                      <button
                        className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                          }__roll-container__item-nationality${selectedNationalityFilters.some(
                            (item) =>
                              item.native_name.toString() ===
                              preselectedNationality.native_name.toString()
                          )
                            ? '-selected'
                            : ''
                          }`}
                        onClick={handleNationalityClick}
                        data-id={preselectedNationality.iso_3166_1}
                        key={preselectedNationality.iso_3166_1}
                        aria-label={preselectedNationality.native_name} // Ajout de l'aria-label
                      >
                        {preselectedNationality.native_name}
                      </button>
                    ))
                    : countriesFound.map((countryFound) => (
                      <button
                        className={`home-container__roll-modale-${mobileVersion ? 'mobile-version' : 'desktop-version'
                          }__roll-container__item-nationality${selectedNationalityFilters.some(
                            (item) =>
                              item.native_name.toString() ===
                              countryFound.native_name.toString()
                          )
                            ? '-selected'
                            : ''
                          }`}
                        onClick={handleNationalityClick}
                        data-id={countryFound.iso_3166_1}
                        key={countryFound.iso_3166_1}
                        aria-label={countryFound.native_name} // Ajout de l'aria-label
                      >
                        {countryFound.native_name}
                      </button>
                    ))
                }
                {/* ===================================================================================================== */}
              </div>
            )}
          </div>
        </div>


      </div>
    </>
  );

  //* ================ FERMETURE DU COMPOSANT ================
};

export default RollGenre;
