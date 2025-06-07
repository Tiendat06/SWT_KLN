import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import {highlightPlugin} from '@react-pdf-viewer/highlight'

function KLNPDFViewer({url, ...props}) {
    // https://static3.luatvietnam.vn/uploaded/LawJudgs/2021/12/21/ban-an-123-2021-ds-pt-103010.pdf
    const pdfUrl = url;
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const highlightPluginInstance = highlightPlugin();

    return (
        <>
            <div style={{height: '600px', width: '100%'}}>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer
                        {...props}
                        fileUrl={pdfUrl}
                        plugins={[
                            defaultLayoutPluginInstance,
                            highlightPluginInstance
                        ]}
                        style={{
                            transformOrigin: 'top left',
                            height: '100%',
                            width: '100%',
                        }}
                    />
                </Worker>
            </div>
        </>
    );
}

export default KLNPDFViewer;