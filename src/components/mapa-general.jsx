/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export default function MapaGeneral() {
  const viewRef = useRef(null);
  const layerRef = useRef(null);
  let webmap;
  let foundLayer;
  let view;

  useEffect(() => {
    const loadMap = async () => {
      loadModules(["esri/WebMap", "esri/views/MapView", "esri/widgets/Home"], {
        css: true,
      })
        .then(async ([WebMap, MapView, Home]) => {
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
              minZoom: 5, // Nivel de zoom mínimo
              maxZoom: 5, // Nivel de zoom máximo
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
            const homeButton = new Home({
              view: view,
            });

            view.ui.add(homeButton, "top-left");

            viewRef.current = view;
          });
        })
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
