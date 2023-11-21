/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export default function MapaGeneral() {
  const viewRef = useRef(null);

  let webmap;

  let view;

  useEffect(() => {
    const loadMap = async () => {
      loadModules(
        [
          "esri/WebMap",
          "esri/views/MapView",
          "esri/widgets/Home",
          "esri/widgets/Legend",
          "esri/widgets/ScaleBar",
          "esri/widgets/Compass",
          "esri/widgets/Slider",
          "esri/widgets/Search",
          "esri/widgets/Locate",
        ],
        {
          css: true,
        }
      )
        .then(
          async ([
            WebMap,
            MapView,
            Home,
            Legend,
            ScaleBar,
            Compass,
            Slider,
            Search,
            Locate,
          ]) => {
            webmap = new WebMap({
              portalItem: {
                id: "a303da876dd846129817e510222725fe",
              },
            });

            view = new MapView({
              container: "mapDiv",
              map: webmap,
              zoom: 5,
              center: [-67.2973, 4.5709],
              constraints: {
                rotationEnabled: false, // Impedir la rotación del mapa
                minZoom: 1, // Nivel de zoom mínimo
                maxZoom: 10, // Nivel de zoom máximo
                snapToZoom: false, // Deshabilitar la rotación
                minPitch: 0,
                maxPitch: 60,
                minLatitude: 0,
                maxLatitude: 12,
                minLongitude: 66,
                maxLongitude: 80,
                maxExtent: null,
                minScale: 0,
                maxScale: 0,
                scale: 0,
              }, // Deshabilitar la navegación interactiva para evitar cambios en latitud y longitud
              navigation: {
                mouseWheelZoomEnabled: false, // Deshabilitar el zoom con la rueda del ratón
                browserTouchPanEnabled: false, // Deshabilitar el pan táctil en el navegador
                doubleClickZoomEnabled: false, // Deshabilitar el zoom con doble clic
                keyboardPanEnabled: false, // Deshabilitar el movimiento del teclado para la navegación
                keyboardZoomEnabled: false, // Deshabilitar el zoom con el teclado
                enableRotation: false, // Deshabilitar la rotación
                enableDoubleClickZoom: false, // Deshabilitar el zoom con doble clic
                enableMouseWheelZoom: false, // Deshabilitar el zoom con la rueda del ratón
                enableKeyboardPan: false, // Deshabilitar el movimiento del teclado para la navegación
                enableKeyboardZoom: false, // Deshabilitar el zoom con el teclado
                enableMapNavigation: false, // Deshabilitar la navegación interactiva
                enableCompass: false,
                enableContinuousZoom: false,
                enablePanning: false,
                enableZoom: false,
                enableFullExtent: false,
                enableResetView: true,
                enableKeyboardNavigation: false,
                enableKeyboardRotation: false,
              },
            });

            webmap.load().then(() => {
              const homeButton = new Home({ view: view });
              const legend = new Legend({ view: view });
              const scale = new ScaleBar({ view: view });
              const compass = new Compass({ view: view });
              const search = new Search({ view: view });
              const locate = new Locate({ view: view });

              const slider = new Slider({
                view: view,
                min: 0,
                max: 100,
                values: [10],
              });

              view.ui.add(homeButton, "top-left");
              view.ui.add(legend, "bottom-left");
              view.ui.add(scale, "bottom-left");
              view.ui.add(compass, "top-left");
              view.ui.add(search, "top-left");
              view.ui.add(locate, "top-left");
              view.ui.add(slider, "bottom-left");

              viewRef.current = view;
            });
          }
        )
        .catch((err) => {
          console.error("Error loading modules: ", err);
        });
    };
    loadMap();
  }, []);

  return (
    <div className="contenedor-mapa">
      <div
        id="mapDiv"
        className="recuadro-mapa"
        style={{ height: "800px", width: "100%" }}
      ></div>
    </div>
  );
}
