try {
    var base_url = _baseURL
    var palapa_api_url = _api
    var _proxy = _proxy
    var local_gs = _wmsURL
    var map_extent = [94.9723, -11.0097, 141.012, 6.07724]
} catch (error) {
    var base_url = ''
    var palapa_api_url = 'http://palapa.agrisoft-cb.com/api/'
    var _proxy = 'http://palapa.agrisoft-cb.com/api/proxy?url='
    var local_gs = 'http://palapa.agrisoft-cb.com:8080/geoserver/wms'
    var map_extent = [94.9723, -11.0097, 141.012, 6.07724]
}
var embedded = true;
