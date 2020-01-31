module.exports = {
  id: 'trees', // the main internal identifier of the guide, used to set routes, paths, cache ID, service worker name etc etc
  name: 'NHM tree ID guide', // shows on splash screen while app loads
  short_name: 'Tree ID', // used on device homescreen under icon
  start_url: '/', // need to check how this works with other entrypoints defined elsewhere
  display: 'standalone', // means 'display as if standalone app rather than as browser'
  background_color: '#FFE9D2', // background of splash screen
  theme_color: '#FFE1C4', // colorize bar at top of app
  orientation: 'portrait-primary',
  base_url: 'idguides', // base URL for all id guides
  description: 'An interactive tree ID guide from the Natural History Museum'
}
