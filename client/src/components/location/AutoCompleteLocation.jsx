import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";



function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };
const placeDetailsService = { current: null };

export default function GoogleMaps({
  placeDetails,
  setPlaceDetails,
  setDistance,
  formData,
}) {
  console.log(formData.placeDetails);

  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);

  const loaded = React.useRef(false);

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google && window.google.maps) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      placeDetailsService.current = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handlePlaceSelect = (place) => {
    if (place && window.google) {
      placeDetailsService.current.getDetails(
        { placeId: place.place_id },
        (details, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            console.log("Selected place details:", details);
            handleCalculateDistance(details);
            setPlaceDetails(details.formatted_address);
          } else {
            console.error("Error fetching place details:", status);
          }
        }
      );
    }
  };

  const handleCalculateDistance = (details) => {
    const locationTo = {
      lat: details?.geometry.location.lat(),
      lon: details?.geometry.location.lng(),
    };
    const locationFrom = {
      lat: 11.0434922,
      lon: 76.0885011,
    };

    if (locationFrom && locationTo) {
      // Calculate distance using the Haversine formula
      const R = 6371; // Radius of the Earth in km
      const dLat = (locationTo.lat - locationFrom.lat) * (Math.PI / 180);
      const dLon = (locationTo.lon - locationFrom.lon) * (Math.PI / 180);
      const lat1 = locationFrom.lat * (Math.PI / 180);
      const lat2 = locationTo.lat * (Math.PI / 180);

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distanceInKm = R * c;
      setDistance(distanceInKm.toFixed(2));
    } else {
      setDistance(0);
    }
  };
  return (
    <Box>
      <Autocomplete
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.description
        }
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={formData.placeDetails ? formData.placeDetails : value}
        noOptionsText="No locations"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          handlePlaceSelect(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Location" type="text" fullWidth />
        )}
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          const matches =
            option.structured_formatting.main_text_matched_substrings || [];

          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match) => [match.offset, match.offset + match.length])
          );
          return (
            <li key={key} {...optionProps}>
              <Grid container sx={{ alignItems: "center" }}>
                <Grid item sx={{ display: "flex", width: 44 }}>
                  <LocationOnIcon sx={{ color: "text.secondary" }} />
                </Grid>
                <Grid
                  item
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                >
                  {parts.map((part, index) => (
                    <Box
                      key={index}
                      component="span"
                      sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                    >
                      {part.text}
                    </Box>
                  ))}
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {option.structured_formatting.secondary_text}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
      {/* {placeDetails && (
        <Box mt={2}>
          <Typography variant="h6">Place Details:</Typography>
          <Typography variant="body2">Address: {placeDetails}</Typography>
        </Box>
      )} */}
    </Box>
  );
}
