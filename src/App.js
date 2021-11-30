import React, { useRef, useEffect } from "react";
import SceneView from "@arcgis/core/views/SceneView";
import WebMap from "@arcgis/core/WebMap";

import * as symbolUtils from "@arcgis/core/symbols/support/symbolUtils";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

import "./App.css"; 

function App() {

  const mapDiv = useRef(null);
  const previewDivRef = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const webmap = new WebMap({
        portalItem: {
          id: "aa1d3f80270146208328cf66d022e09c"
        }
      });

      const view = new SceneView({
        container: mapDiv.current,
        map: webmap
      });

      view.when(async () => {
        const layers = webmap.layers;
        console.log(layers)

        const symbol = new SimpleMarkerSymbol( {color: "#1a72d8", style: "square", size: "7px"});
        console.log(symbol)
        const preview = await symbolUtils.renderPreviewHTML(symbol,  {
          node: previewDivRef.current,
          size: 8,
        });
        console.log(preview)
      });
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}>
    <div ref={previewDivRef}></div>
  </div>;
}

export default App;
