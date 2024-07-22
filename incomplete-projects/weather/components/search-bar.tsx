'use client';

import { useWeatherForcastCtx } from '@/providers';
import { Loader } from '@googlemaps/js-api-loader';
import debounce from 'lodash.debounce';
import { Loader2Icon, SearchIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Combobox, Input } from '@typeweave/react';
import { mergeRefs } from '@typeweave/react-utils';

interface SearchBarProps {}

const displayName = 'SearchBar';

export const SearchBar = (props: SearchBarProps) => {
  const {} = props;

  const placeServiceRef =
    React.useRef<google.maps.places.AutocompleteService | null>(null);

  const { fetchOnPlaceSelect, fetchUsingUserCoords, isCurrentCity } =
    useWeatherForcastCtx(displayName);

  const [suggestions, setSuggestions] = React.useState<
    google.maps.places.AutocompletePrediction[] | null
  >(null);

  const [isOpen, setIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY;

    if (!apiKey)
      throw new Error(`${displayName}: api key is missing`);

    const init = async () => {
      try {
        if (
          !window.google ||
          !window.google.maps ||
          !window.google.maps.places
        ) {
          const lib = await new Loader({
            apiKey,
            ...{ libraries: ['places'] },
          }).importLibrary('places');

          placeServiceRef.current = new lib.AutocompleteService();
        }
      } catch (error) {}
    };

    init();
  }, []);

  const fetchSuggestions = React.useMemo(
    () =>
      debounce(async (value: string) => {
        if (!placeServiceRef.current) return;
        if (!value.length) return;

        setIsOpen(false);
        setLoading(true);
        setSuggestions(null);

        await placeServiceRef.current.getPlacePredictions(
          { input: value, types: ['(cities)'] },
          setSuggestions,
        );

        setIsOpen(true);
        setLoading(false);
      }, 500),
    [],
  );

  return (
    <div>
      <Combobox
        editable
        loading={loading}
        open={isOpen}
        value={null}
        options={
          suggestions?.map((sug) => ({
            label: sug.description,
            id: sug.place_id,
          })) ?? []
        }
        filterOptions={(x) => x}
        onInputChange={(value, reason) => {
          if (reason === 'input') fetchSuggestions(value);
          else setSuggestions(null);
        }}
        onChange={async (value, reason) => {
          setSuggestions(null);

          if (reason === 'selectOption' && value) {
            await fetchOnPlaceSelect(value.id);
            inputRef.current?.blur();
          }
        }}
        onClose={() => {
          setSuggestions(null);
          setIsOpen(false);
        }}
        hasOpenIndicator={false}
        loadingText="searching"
        noOptionsText="no places found"
        isOptionEqualToValue={(option, value) =>
          option.id === value?.id
        }
        renderInput={(props) => (
          <Input
            label="search"
            hideLabel
            className="w-full"
            placeholder="Search..."
            {...props}
            ref={mergeRefs(inputRef, props.ref)}
            classNames={{
              ...props.classNames,
              inputWrapper: twMerge(
                props.classNames?.inputWrapper,
                'border-0 border-b rounded-none focus-within:ring-0 focus-within:border-muted-8 focus-within:hover:border-muted-8',
              ),
            }}
            startContent={<SearchIcon />}
            endContent={
              <>
                {props.endContent}

                {loading && (
                  <Loader2Icon
                    size={30}
                    className="!size-5 animate-spin"
                  />
                )}

                {!isCurrentCity && (
                  <Button
                    color="info"
                    size="sm"
                    onPress={async () => {
                      await fetchUsingUserCoords();
                    }}
                  >
                    current city
                  </Button>
                )}
              </>
            }
          />
        )}
      />
    </div>
  );
};

SearchBar.displayName = displayName;
