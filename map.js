'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1Ijoib3l5YyIsImEiOiJjam43dzZqYjIwM3RvM3FwZjg2emVmeXFnIn0.r4AOJghdRp7zMMppmH58aQ'
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/oyyc/cjn80o8q72jsl2rpzrz7mz4or',
    center: [-73.98857,40.75216],
    zoom: 15,
    pitch: 60
})

// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

// add the navigation to your map
map.addControl(navigation, 'top-left')

// create an instance of ScaleControl
let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})

// add the scale to your map
map.addControl(scale, 'bottom-right')

//track physical location
let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

// this is an event handler
geolocate.on('geolocate', function(event) {

    // create new variables to store the attributes we're interested in from the event
    let lng = event.coords.longitude
    let lat = event.coords.latitude

    // debug
    console.log('geolocated:', lng, lat)

    // format lng lat values and display them on our 'info' element
    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5) 

})

map.on('click', function(event) {

    let lng = event.lngLat.lng
    let lat = event.lngLat.lat

    console.log("clicked:", lng, lat)

    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5) 

})

let data = [
    {
        location: [-73.98551,40.74857], 
        content: 'Skyscraper in Midtown:</br>Empire State Building'
    },
    {
        location: [-73.99247,40.75138], 
        content: 'Skyscraper in Midtown:</br>One Penn Plaza'
    },
    {
        location: [-73.99025,40.75637], 
        content: 'Skyscraper in Midtown:</br>New York Times Building'
    },
    {
        location: [-74.00202,40.75317], 
        content: 'Skyscraper in Midtown:</br>PureWow HQ'
    },
    {
        location: [-73.98424,40.75515], 
        content: 'Skyscraper in Midtown:</br>One Byrant Park'
    },
    ]

data.forEach(function(d) {

    let marker = new mapboxgl.Marker()    
    marker.setLngLat(d.location)
    marker.addTo(map)  

    let popup = new mapboxgl.Popup()
    popup.setHTML(d.content)
    marker.setPopup(popup)

})