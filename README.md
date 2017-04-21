# MapCard

Please let the record reflect that I wanted to name this project either Mappy McCardFace or Cardy McMapFace but was denied both.

Example: http://cloud.registerguard.com/mapcard/

This is a Grunt project to easily create and deploy flat-file interactive maps and related cards. Inspired by [this awesome page](http://interactive.nydailynews.com/2016/02/nypd-nuisance-abatement-case-studies-interactive/index.html) from ProPublica/NY Daily News.

## Getting started

```
git clone git@github.com:registerguard/mapcard.git
...
cd mapcard
npm install
...
grunt dev      # generate dev files
grunt watch    # Grunt will watch dev files and re-generate on save
grunt prod     # generate production files
grunt push     # will push to s3 *** IF *** aws-keys.json file is added
```

### aws-keys.json

```json
{
  "AWSAccessKeyId": "XXXXXXXXXXXXXXXXXXXX",
  "AWSSecretKey": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}

```

## Major components

* [Grunt](https://gruntjs.com/)
* [Sass](http://sass-lang.com/install)
* [Leaflet](http://leafletjs.com/)
* [Omnivore](https://github.com/mapbox/leaflet-omnivore#custom-layers)

## Current data structure

id|category|name|address|city|state|zip|lat|long|more
---|---|---|---|---|---|---|---|---|---
1|newspaper|The Register-Guard|3500 Chad Dr.|Eugene|OR|97408|44.086041|-123.052411|
2|hike|Spencer Butte|85385 Willamette St.|Eugene|OR|97405|43.983121|-123.095766|
3|hike|Mount Pisgah|34901 Frank Parrish Rd.|Eugene|OR|97405|44.005777|-122.964390|

## Interactions

* Page loads, displaying map and cards
* User scrolls to see cards, back to top button displays
* User clicks on map point, any highlighted cards are reset and page scrolls to that card and highlights the card
* User clicks on back to top button and any highlighted cards are reset

More to come...
