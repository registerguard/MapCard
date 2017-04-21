MapCard

Please let the record reflect that I wanted to name this project either Mappy McCardFace or Cardy McMapFace but was denied both.

Example: http://cloud.registerguard.com/marijuana-shops/

This is a Grunt project to easily create and deploy flat-file interactive maps and related cards.

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

This should be changed.

cartodb_id|the_geom|location_z|location_c|address|tradename|status|latitude|longitude
---|---|---|---|---|---|---|---|---
1|0101000020E61000006F5287CB60C85EC0DFC6C1001D0D4640|97404|Eugene|2644 River Rd. #5|Oregon's Green Rush|Active|44.1024476|-123.1309079
2|0101000020E610000059F1B2CB5CC75EC010C8CAD4C9064640|97402|Eugene|1474 West 6th Ave.|Emerald City Medicinal|Active|44.0530344|-123.1150388
3|0101000020E61000006424D63D8DC75EC05CCD959C6E084640|97404|Eugene|340 River Rd.|Nectar|Active|44.0658756|-123.1179957

## Interactions

* Page loads, displaying map and cards
* User scrolls to see cards, back to top button displays
* User clicks on map point, any highlighted cards are reset and page scrolls to that card and highlights the card
* User clicks on back to top button and any highlighted cards are reset

More to come...
