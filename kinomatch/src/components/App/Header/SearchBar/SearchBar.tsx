// ================ IMPORT SCSS ================

import './SearchBar.scss';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, handleSubmit }) => {
  return (
    <div className='SearchBar'>
      <form className='form' onSubmit={handleSubmit}>
        <input
          className='input'
          type='text'
          name='query'
          placeholder='Rechercher un film'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
};
