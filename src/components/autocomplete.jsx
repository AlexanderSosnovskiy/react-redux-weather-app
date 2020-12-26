import React, { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { addLocation } from '../redux/actions/locationAction';

const useStyles = makeStyles(() => ({
  autocompleteSearch: {
    maxWidth: '60vw',
    margin: '3rem auto',
    padding: '1rem 2rem',
    borderRadius: '0.25rem',
    position: 'relative',
  },
  autocompleteActiveItem: {
    padding: '0.5rem 1rem',
    fontSize: '18px',
    cursor: 'pointer',
    backgroundColor: '#fafafa',
  },
  autocompleteItem: {
    padding: '0.5rem 1rem',
    fontSize: '18px',
    cursor: 'pointer',
  },
  autocompleteInput: {
    fontSize: '18px',
  },
  autocompleteDropdown: {
    position: 'absolute',
    top: '80px',
    left: '2rem',
    right: '2rem',
    zIndex: '10',
    backgroundColor: '#fff',
    borderRadius: '0.25rem',
  },
}));

const Autocomplete = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');

  const searchLocation = (address, region, suggestion) => {
    if (!suggestion) return;
    setLocation(address);
    dispatch(addLocation(suggestion.formattedSuggestion.mainText));
  };

  const searchOptions = {
    types: ['(cities)'],
  };

  return (
    <PlacesAutocomplete
      value={location}
      onChange={setLocation}
      onSelect={searchLocation}
      searchOptions={searchOptions}
      debounce={300}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Paper className={classes.autocompleteSearch}>
          <TextField
            className={classes.autocompleteInput}
            value={location}
            fullWidth
            variant='outlined'
            {...getInputProps()}
          />
          <Paper className={classes.autocompleteDropdown}>
            {loading ? (
              <div className={classes.autocompleteItem}>Loading...</div>
            ) : null}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? classes.autocompleteActiveItem
                : classes.autocompleteItem;
              return (
                <div
                  key={suggestion.description}
                  {...getSuggestionItemProps(suggestion, { className })}
                >
                  {suggestion.description}
                </div>
              );
            })}
          </Paper>
        </Paper>
      )}
    </PlacesAutocomplete>
  );
};

export default Autocomplete;
